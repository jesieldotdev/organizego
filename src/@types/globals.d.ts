type FlattenObject<T> = T extends Array<any>
  ? number | `${number}.${FlattenObject<T[number]>}`
  : T extends object
  ? {
      [K in keyof T & string]: K | `${K}.${FlattenObject<T[K]>}`;
    }[keyof T]
  : "";

type RemoveTrailingDot<T extends string> = T extends `${infer L}.${infer R}`
  ? R extends ""
    ? L
    : `${L}.${RemoveTrailingDot<R>}`
  : T;

type FlattenKeys<T> = RemoveTrailingDot<FlattenObject<T>>;

type DeepType<T, Key extends string | undefined | null | ""> = Key extends
  | undefined
  | null
  | ""
  ? T
  : Key extends `${infer First}.${infer Rest}`
  ? DeepType<T[First], Rest>
  : T[Key];

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

type PaginationMeta = {
  total: number;
};

type PaginatedResponse<D> = {
  meta: PaginationMeta;
  data: D[];
};

type SearchFilter<T> = {
  page: number;
  limit: number;
  filter: SearchCriteria<T>[];
  orderBy: OrderByCriteria<T>[];
};

type SearchCriteria<T> = {
  column: FlattenKeys<T>;
  value: string | number;
  operator: SearchOperatorSet;
  logicalOperator: SearchLogicalOperatorSet;
};

class OrderByCriteria<T extends any | object> {
  column: FlattenKeys<T>;
  direction: OrderBySet;
}

type SearchOperatorSet =
  | "cn"
  | "cp"
  | "nc"
  | "eq"
  | "ne"
  | "bw"
  | "bn"
  | "ew"
  | "en"
  | "nu"
  | "nn"
  | "gt"
  | "ge"
  | "lt"
  | "le"
  | "np";

type SearchLogicalOperatorSet = "and" | "or";
type OrderBySet = "asc" | "desc";

type DirectionArg = OrderBySet | "" | undefined | null;