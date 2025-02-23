import * as lodash from "lodash";

export function getNestedField<
  T extends object,
  K extends string | undefined | null | ""
>(obj: T, keys: K): DeepType<T, K> {
  let result = obj as any;
  if (!keys) {
    return obj as DeepType<T, K>;
  }
  const keyList = keys.split(".");
  for (let i = 0; i < keyList.length; i++) {
    const key = keyList[i];
    result = result[key];
    if (result === undefined) {
      result = "";
      break;
    }
  }
  return result;
}

export function setNestedField<
  T extends object,
  K extends string | undefined | null | "",
  V extends DeepType<K extends undefined | null | "" ? DeepPartial<T> : T, K>
>(obj: T, keys: K, value: V): T {
  let current: any = obj;
  if (!keys) return lodash.merge(obj, value);
  const keysArray = keys.split(".");
  const lastIndex = keysArray.length - 1;
  for (let i = 0; i < lastIndex; i++) {
    const key = keysArray[i];
    if (!(key in current) || typeof current[key] !== "object")
      current[key] = /^\d/.test(keysArray[i + 1]) ? [] : {};
    current = current[key];
  }
  current[keysArray[lastIndex]] = value;
  return obj;
}

export function transformSchema<T extends object>(
  input: any
): Record<string, T> {
  const output: any = {};
  for (const key in input) {
    if (input.hasOwnProperty(key)) {
      const [outerKey, innerKey = "default"] = key.split("#");
      if (!output[outerKey]) {
        output[outerKey] = {};
      }
      output[outerKey][innerKey] = input[key];
    }
  }
  return output;
}

export const getFilterColumn = <T extends any | object>(
  column: FlattenKeys<T>,
  filter: SearchCriteria<T>[],
  operator: SearchOperatorSet = "cn"
): any =>
  filter.find(
    ({ column: col, operator: op }) =>
      col === column && (operator ? op === operator : true)
  )?.value ?? "";

export const setFilterColumn = <T extends any | object>(
  column: FlattenKeys<T>,
  value: any,
  filter: SearchCriteria<T>[],
  operator: SearchOperatorSet = "cn",
  logicalOperator: SearchLogicalOperatorSet = "and"
): SearchCriteria<T>[] => {
  return [
    ...(!["", null, undefined].includes(value)
      ? [
          {
            column,
            value,
            logicalOperator,
            operator,
          },
        ]
      : []),
    ...filter.filter(({ column: col, operator: op }) =>
      col === column ? (operator ? op !== operator : false) : true
    ),
  ];
};

export const getSortColumn = <T extends any | object>(
  column: FlattenKeys<T>,
  orderBy: OrderByCriteria<T>[]
): OrderBySet | "" =>
  orderBy.find(({ column: col }: any) => col === column)?.direction ?? "";

export const setSortColumn = <T extends any | object>(
  column: FlattenKeys<T>,
  direction: OrderBySet | "" | undefined | null,
  orderBy: OrderByCriteria<T>[]
): OrderByCriteria<T>[] => [
  ...orderBy.filter(({ column: col }) => col !== column),
  ...(!!direction && !["", null, undefined].includes(direction)
    ? [
        {
          column,
          direction,
        },
      ]
    : []),
];