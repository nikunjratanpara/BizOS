import { AnyFn, MemoizedProjection} from "./MemoizedSelector";
import { isEqualCheck } from "./isEqualCheck";
export function defaultMemoize(t: AnyFn, isEqual:(a:any, b:any)=> boolean = isEqualCheck): MemoizedProjection {
  let lastArguments: null | IArguments = null;
  let lastResult: any = null;
 function reset (): void {
    lastArguments = null;
    lastResult = null;
  }
  function memoized(): any {
    if (!lastArguments) {
      lastResult = t.apply(null, arguments);
      lastArguments = arguments;
      return lastResult;
    }
    for (let i:number = 0; i < arguments.length; i++) {
      if (!isEqual(arguments[i], lastArguments[i])) {
        lastResult = t.apply(null, arguments);
        lastArguments = arguments;
        return lastResult;
      }
    }
    return lastResult;
  }
  return { memoized, reset };
}