import { Action } from "./Action";
export interface Reducer {
    (state: any, action: Action) : any ;
}
