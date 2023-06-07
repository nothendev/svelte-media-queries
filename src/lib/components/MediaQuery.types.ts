export enum Types {
    string = 'string',
    array = 'array',
    object = 'object',
    mediaQueryList = 'mediaQueryList'
}

export interface ObjectType<T> {
    [key: string]: T
}

export type QuerySingle = string
export type QueryAny = QuerySingle | QueryObject | QueryArray;
export type QueryObject = ObjectType<QueryAny>;
export type QueryArray = QueryAny[];

type ArrayOf<T> = T extends (infer V)[] ? V : never;

export type MatchesType<T extends Query> = T extends string ? MatchesSingle // if string, return boolean
  : T extends QueryObject ? MatchesObject<T> // if object, return mapped type of T, where for each key, the value is matched
  : T extends QueryArray ? MatchesType<ArrayOf<T>>[] // if array, match extracted array type
  : never;

export type MatchesObject<
  T extends QueryObject,
> = {
  [Key in keyof T]: MatchesType<T[Key]>;
};

export type MatchesSingle = boolean;
