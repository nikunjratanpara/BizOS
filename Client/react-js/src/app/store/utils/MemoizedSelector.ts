export interface Selector<T, V> {
    (state: T): V;
}

export type AnyFn = (...args: any[]) => any;

export type MemoizedProjection = { memoized: AnyFn; reset: () => void };

export type MemoizeFn = (t: AnyFn) => MemoizedProjection;

export interface MemoizedSelector<State, Result>
  extends Selector<State, Result> {
  release(): void;
  projector: AnyFn;
}

