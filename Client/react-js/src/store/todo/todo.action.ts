import { Action } from 'redux';
import { IAction } from 'src/common/common.models';
import { IToDo } from 'src/components/todos/todo';


export const LOAD_TODOS = 'LOAD_TODOS';
export const LOAD_TODOS_SUCESS = 'LOAD_TODOS_SUCESS';
export const TODOS_TOGGLE_COMPLETED = 'TODOS_TOGGLE_COMPLETED';
export type TodoActionType = typeof LOAD_TODOS | typeof LOAD_TODOS_SUCESS | typeof TODOS_TOGGLE_COMPLETED;

export function loadTodos(): Action {
    return {
        type: LOAD_TODOS,
    };
}
export function loadTodoSuccess(todos: IToDo[]): IAction<TodoActionType, IToDo[]> {
    return {
        payload: todos,
        type: LOAD_TODOS_SUCESS
    }
}
export function toggleCompleted(todo: IToDo): IAction<TodoActionType, IToDo> {
    return {
        payload: todo,
        type: TODOS_TOGGLE_COMPLETED
    }
}