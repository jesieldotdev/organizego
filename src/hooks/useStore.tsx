/* eslint-disable react-hooks/rules-of-hooks */
import { useSelector, useDispatch } from "react-redux";
import { modules } from "../store";
import { createSelector } from "@reduxjs/toolkit";
import { getNestedField } from "../utils/utils";

type ImportReturnType<T extends Record<string, (...args: any) => any>> = {
  [K in keyof T]: ReturnType<T[K]>;
};

type ImportsReturnType<
  T extends Record<string, Record<string, (...args: any) => any>>
> = {
    [K in keyof T]: ImportReturnType<T[K]>;
  };

declare global {
  type GettersType = ImportsReturnType<typeof modules.getters>;
  type ActionsType = ImportsReturnType<typeof modules.actions>;
  type DispatchType<T = (...args: any) => any> = T;
}

type ModuleTypes = "task";

const moduleFields: Record<ModuleTypes, FlattenKeys<RootState>[]> = {
  task: [
    "task.items",
    "task.selectedItemIndex",
    "task.taskModalTable",
    "task.searchText"
  ],
};

const _getters = (state: RootState): GettersType =>
  Object.assign(
    {},
    (Object.entries(modules.getters) as any[]).reduce((acc, [key, value]) => {
      acc[key] = (Object.entries(value) as any[]).reduce(
        (acc, [key, value]) => {
          acc[key] = (...args: any) => value(state, _getters(state))(...args);
          return acc;
        },
        {}
      );
      return acc;
    }, {})
  );

const _actions = (dispatch: DispatchType): ActionsType =>
  Object.assign(
    {},
    (Object.entries(modules.actions) as any[]).reduce((acc, [key, value]) => {
      acc[key] = (Object.entries(value) as any[]).reduce(
        (acc, [key, value]) => {
          acc[key] = (...args: any) =>
            dispatch((dispatch: () => any, getState: () => any) =>
              value(
                getState,
                _actions(dispatch),
                () => _getters(getState()),
                dispatch
              )(...args)
            );
          return acc;
        },
        {}
      );
      return acc;
    }, {})
  );

function buildState(fields: FlattenKeys<RootState>[]): DeepPartial<RootState> {
  const state: any = {};
  fields.forEach((field) => {
    const keys = field.split(".");
    let current = state;
    keys.forEach((key, index) => {
      if (index === keys.length - 1) {
        current[key] = useSelector(
          createSelector(
            (state: RootState) => state,
            (state: RootState) => getNestedField(state, field)
          )
        );
      } else {
        current[key] = current[key] || {};
        current = current[key];
      }
    });
  });
  return state;
}

const select = <T extends FlattenKeys<RootState>>(path: T) =>
  useSelector(
    createSelector(
      (state: RootState) => state,
      (state) => getNestedField(state, path)
    )
  ) as DeepType<RootState, T>;

export default function useStore() {
  const getters = new Proxy({} as GettersType, {
    get: function (_target, module: ModuleTypes, _receiver) {
      let state: DeepPartial<RootState> = buildState(moduleFields[module]);
      return _getters(state as RootState)[module];
    },
  });

  const actions = _actions(useDispatch());

  return [getters, actions, select] as const;
}