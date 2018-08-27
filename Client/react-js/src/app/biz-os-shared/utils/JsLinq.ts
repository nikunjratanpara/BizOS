export class JsLinq<T> {
    private _sortingFun: any;
    constructor(private arr?: Array<T>) {
        this._sortingFun = {
            "string": this._CompareStrings,
            "number": this._compareNumbers,
            "amount": this._compareNumbers,
            "date": this._compareDates
        };
        this.arr = this._isArray(this.arr) ? this.arr : new Array<T>();
    }
    add(Item: T | Array<T>): JsLinq<T> {
        if (Array.isArray(Item)) {
            Item.forEach((element) => {
                this.arr.push(element);
            });
        } else {
            this.arr.push(Item);
        }
        return this;
    }
    remove(Item: T): T {
        let index = this.indexOf(Item);
        return new JsLinq(this.arr.splice(index, 1)).firstOrDefault(null);
    }
    take(elementsNumber: number): JsLinq<T> {
        return new JsLinq(this.arr.slice(0, elementsNumber));
    }
    skip(elementsNumber: number): JsLinq<T> {
        return new JsLinq(this.arr.slice(elementsNumber, this.arr.length));
    }
    shallowCopy(): JsLinq<any> {
        return new JsLinq(this.arr.slice());
    }
    indexOf(arrElement: T, fromIndex?: number): number {
        return this.arr.indexOf(arrElement, fromIndex);
    }
    merge(...params: Array<T>): JsLinq<T> {
        return new JsLinq(this.arr.concat(...params));
    }
    where(filter: IFilter<T>): JsLinq<T> {
        return new JsLinq(this.arr.filter(filter));
    }
    select<TModel>(selector: ISelector<T, TModel>): JsLinq<TModel> {
        return new JsLinq(this.arr.map<TModel>(selector));
    }
    elementAt(index: number): T {
        if (index < 0) { return null; }
        return this.arr[index] ? this.arr[index] : null;
    }
    first(): T {
        return this.elementAt(0);
    }
    last(): T {
        return this.elementAt(this.arr.length - 1);
    }
    lastOrDefault(defaultValue: T): T {
        return this.last() || defaultValue;
    }
    firstOrDefault(defaultValue: T): T {
        return this.first() || defaultValue;
    }
    elementAtOrDefault(index: number, defaultValue: T): T {
        return this.elementAt(index) || defaultValue;
    }
    concat(newArr: Array<T>): JsLinq<T> {
        return new JsLinq(this.arr.concat(newArr));
    }
    count(filter?: IFilter<T>): number {
        if (filter) {
            return this.where(filter).count();
        } else {
            return this.arr.length;
        }
    }
    toArray(): Array<T> {
        return this.arr;
    }
    orderBy(field: IComparable, ...fields: Array<IComparable>): JsLinq<T> {
        let fieldList: Array<IComparable> = new Array<IComparable>();
        fieldList.push(field);
        if (fields && fields.length) {
            fieldList = fieldList.concat(fields);
        }

        fieldList.forEach(element => {
            element.comparer = this._sortingFun[element.dataType];
        });
        return new JsLinq(this.arr.sort(this._sort(fieldList)));
    }
    /**
     *this function will return all fields total in single object
     */
    sum(field: string, ...fields: Array<string>): any {
        let ret: any = {};
        let fieldList: Array<string> = new Array<string>();
        fieldList.push(field);
        if (fields && fields.length) {
            fieldList = fieldList.concat(fields);
        }
        fieldList.forEach((element) => {
            ret[element] = 0;
        });
        this.arr.forEach((current) => {
            fieldList.forEach((element) => {
                ret[element] += current[element];
            });
        });
        return ret;
    }
    _sort(fields: Array<IComparable>): any {
        return (objA: any, objB: any): number => {
            for (let i = 0; i < fields.length; i++) {
                let val = fields[i].comparer(objA[fields[i].name], objB[fields[i].name]);
                if (val !== 0) {
                    return val;
                }
            }
            return 0;
        };
    }
    _compareNumbers(a: number, b: number): number {
        return a - b;
    }
    _CompareStrings(a: string, b: string): number {
        a = a.toUpperCase();
        b = b.toUpperCase();
        return a.localeCompare(b);
        /*if (a < b) return -1;
        if (a > b) return 1;
        // properties must be equal
        return 0;*/
    }
    _compareDates(a: Date, b: Date): number {
        return a.getTime() - b.getTime();
    }
    _isArray(arr: any): boolean {
        return arr && Array.isArray(arr);
    }

    /*
        groupby
        takewhile
        skipwhile
        thenBy
        intersect
        Except
        Distinct
        min
        max
        average
        StartsWith
        Contains
    */
}
export interface IComparable {
    name: string;
    dataType: string;
    comparer: (a: any, b: any) => number;
}
export type IFilter<T> = (obj: T) => boolean;

export type ISelector<T, TReturn> = (obj: T) => TReturn;

export type ISort<T> = (fields: Array<string>) => JsLinq<T>;
