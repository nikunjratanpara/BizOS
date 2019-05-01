import { Selector, MemoizedProjection } from "./MemoizedSelector";
export type SelectorFactoryConfig<T = any, V = any> = {
  stateFn: (state: T, selectors: Selector<any, any>[], memoizedProjector: MemoizedProjection) => V;
};