import { createAction, createReducer } from "@reduxjs/toolkit";
import { initialTaskState as initialState } from "./state";
import { setNestedField } from "../../utils/utils";


export const setTaskAction = createAction<{
  field: FlattenKeys<TaskState>;
  value: any;
}>("SET_TASK")

export const setTask =
  <T extends FlattenKeys<TaskState>>(field: T, value: DeepType<TaskState, T>) =>
    (dispatch: any) => {
      dispatch(setTaskAction({ field, value }));
    };

export default createReducer(initialState(), (builder) => {
  builder
    .addCase(setTaskAction, (state, { payload: { field, value } }) => {
      setNestedField(state, field, value);
    })
    // .addCase(resetCartAction, (_, { payload = initialState() }) => payload);
});