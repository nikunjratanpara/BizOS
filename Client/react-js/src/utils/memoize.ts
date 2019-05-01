export default function memoizefn(fn:any) {
    const cache = {};
    return function (this: any,...args:any[]) {
        let cachedValue  = cache[args.join('')];
        if (!cachedValue) {
            cachedValue = fn.apply(this,args);
            cache[args.join('')] = cachedValue;
        }
        return cachedValue;
    }
}
