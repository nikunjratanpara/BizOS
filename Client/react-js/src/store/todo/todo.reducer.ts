import { IAction } from 'src/common/common.models';
import { IToDo } from 'src/components/todos/todo';

import { LOAD_TODOS, LOAD_TODOS_SUCESS, TODOS_TOGGLE_COMPLETED } from './todo.action';

export default (state: IToDo[] = [], action: IAction<string, any>) => {
    switch (action.type) {
        case LOAD_TODOS:
            return state;
        case LOAD_TODOS_SUCESS:
            return [...action.payload];
        case TODOS_TOGGLE_COMPLETED:
            return state.map(todo => todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo);
        default:
            return state;
    }
}