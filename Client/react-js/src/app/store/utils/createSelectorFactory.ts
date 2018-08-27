import { MemoizeFn, Selector } from "./MemoizedSelector";
import { SelectorFactoryConfig } from "./SelectorFactoryConfig";
import { defaultStateFn } from './defaultStateFn';
import { defaultMemoize } from './defaultMemoize';
export function createSelectorFactory<T = any, V = any>(memoize: MemoizeFn): (...input: any[]) => Selector<T, V>;
export function createSelectorFactory<T = any, V = any>(
    memoize: MemoizeFn,
    options: SelectorFactoryConfig<T, V>
  ): (...input: any[]) => Selector<T, V>;
  export function createSelectorFactory(
    memoize: MemoizeFn,
    options: SelectorFactoryConfig<any, any> = {
      stateFn: defaultStateFn,
    }
  ) {
    return function(...input: any[]): Selector<any, any> {
      let args = input;
      if (Array.isArray(args[0])) {
        const [head, ...tail] = args;
        args = [...head, ...tail];
      }
  
      const selectors = args.slice(0, args.length - 1);
      const projector = args[args.length - 1];
      const memoizedSelectors = selectors.filter(
        (selector: any) =>
          selector.release && typeof selector.release === 'function'
      );
  
      const memoizedProjector = memoize(function(...selectors: any[]) {
        return projector.apply(null, selectors);
      });
  
      const memoizedState = defaultMemoize(function(state: any) {
        return options.stateFn.apply(null, [state, selectors, memoizedProjector]);
      });
  
      function release() {
        memoizedState.reset();
        memoizedProjector.reset();
  
        memoizedSelectors.forEach(selector => selector.release());
      }
  
      return Object.assign(memoizedState.memoized, {
        release,
        projector: memoizedProjector.memoized,
      });
    };
  }
  