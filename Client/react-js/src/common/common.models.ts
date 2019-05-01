import { Action } from 'redux';

export interface IAction<T, T1> extends Action<T> {
    payload: T1;
}

export interface IDictionary<T> {
    [id: string]: T
}