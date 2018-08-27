import { Action } from "./Action";

import { Reducer } from './Reducer';
import { Collection } from "./Collection";
import { SubStateConfig } from "./SubStateConfig";

import { BehaviorSubject, Observable, Subject, observable, Subscription, throwError, of } from 'rxjs';
import { isFunction } from "../utils";
import { pluck, map, distinctUntilChanged } from "rxjs/operators";

export class Store extends BehaviorSubject<any> {

    protected reducers : Collection<Reducer>
    protected action$: Subject<string>;
    protected isDispatching : boolean = false;
    constructor(protected initialState:Collection<any> = {}) {
        super(initialState);
        this.reducers = {};
        this.action$ = new Subject();
    }

    public dispatch(action:Action): void {
        if(this.isDispatching) {
            throw Error('');
        }
        let newState: any = {};
        this.action$.next(action.type);
        if(isFunction(this.reducers[action.subState])){
            newState[action.subState] = this.reducers[action.subState](this.value[action.subState], action);
        }
        this.next({...this.value, ...newState});
    }
    public registerSubState(subStateConfig: SubStateConfig) {
        if(!this.reducers[subStateConfig.name]) {
            this.reducers[subStateConfig.name]  = subStateConfig.reducer;
            this.assignSubStateValue(subStateConfig.name, subStateConfig.initialState);
        }
    }
    public destorySubState(subStateName:string) {
        if(!this.reducers[subStateName]) {
            delete this.reducers[subStateName];
            this.assignSubStateValue(subStateName,null);
        }
    }
    private assignSubStateValue(subStateName:string, value:any) {
        let subState: Collection<any> = {};
        subState[subStateName] = value;
        this.next({...this.value, ...subState});
    }
   
    public isStateLoaded(subState:string) : boolean {
        return !!this.value[subState];
    }
    public select<T>( pathOrMapFn: ((state: T) => any) | string, ...paths: string[]) {
        return this.baseSelector(pathOrMapFn,...paths)(this);
    }

    private baseSelector<T,K>( pathOrMapFn: ((state: T) => any) | string, ...paths: string[]) {
        return function selectOperator(source$: Observable<T>): Observable<K> {
            let mapped$: Observable<any>;
        
            if (typeof pathOrMapFn === 'string') {
              mapped$ = source$.pipe(pluck(pathOrMapFn, ...paths)); // pluck will get value from path ex. state[product.todo.data];
            } else if (typeof pathOrMapFn === 'function') {
              mapped$ = source$.pipe(map(pathOrMapFn));
            } else {
              throw new TypeError(
                `Unexpected type '${typeof pathOrMapFn}' in select operator,` +
                  ` expected 'string' or 'function'`
              );
            }
        
            return mapped$.pipe(distinctUntilChanged());
        };
    }
    private defaultSelector(state:any) {
        return state;
    }
}
