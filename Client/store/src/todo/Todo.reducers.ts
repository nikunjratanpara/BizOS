
import { Action } from '../store/Action';
import { SubStateConfig } from '../store';

function addTodo(state:TodoState, action: Action) : TodoState {
    let newState : any = {...state, data: [ ...state.data, action.payload as Todo]}; 
    return newState;
}
export class Todo {
    name : string;
}
export class TodoState {
    data:Todo[];
}
const initialState:TodoState = {data: []};

export const todoStateConfig : SubStateConfig = { name:'todo', reducer: addTodo, initialState : initialState };