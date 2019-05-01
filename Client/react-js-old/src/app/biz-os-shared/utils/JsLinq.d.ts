export declare class JsLinq<T> {
    private arr?;
    private _sortingFun;
    constructor(arr?: Array<T>);
    add(Item: T | Array<T>): JsLinq<T>;
    remove(Item: T): T;
    take(elementsNumber: number): JsLinq<T>;
    skip(elementsNumber: number): JsLinq<T>;
    shallowCopy(): JsLinq<any>;
    indexOf(arrElement: T, fromIndex?: number): number;
    merge(...params: Array<T>): JsLinq<T>;
    where(filter: IFilter<T>): JsLinq<T>;
    select<TModel>(selector: ISelector<T, TModel>): JsLinq<TModel>;
    elementAt(index: number): T;
    first(): T;
    last(): T;
    lastOrDefault(defaultValue: T): T;
    firstOrDefault(defaultValue: T): T;
    elementAtOrDefault(index: number, defaultValue: T): T;
    concat(newArr: Array<T>): JsLinq<T>;
    count(filter?: IFilter<T>): number;
    toArray(): Array<T>;
    orderBy(field: IComparable, ...fields: Array<IComparable>): JsLinq<T>;
    /**
     *this function will return all fields total in single object
     */
    sum(field: string, ...fields: Array<string>): any;
    _sort(fields: Array<IComparable>): any;
    _compareNumbers(a: number, b: number): number;
    _CompareStrings(a: string, b: string): number;
    _compareDates(a: Date, b: Date): number;
    _isArray(arr: any): boolean;
}
export interface IComparable {
    name: string;
    dataType: string;
    comparer: (a: any, b: any) => number;
}
export declare type IFilter<T> = (obj: T) => boolean;
export declare type ISelector<T, TReturn> = (obj: T) => TReturn;
export declare type ISort<T> = (fields: Array<string>) => JsLinq<T>;
