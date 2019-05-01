import { Selector, MemoizedProjection } from "./MemoizedSelector";
export function defaultStateFn(state: any, selectors: Selector<any, any>[], memoizedProjector: MemoizedProjection): any {
  const args = selectors.map(fn => fn(state));
  return memoizedProjector.memoized.apply(null, args);
}