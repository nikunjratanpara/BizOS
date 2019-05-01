import { ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { IAction } from 'src/common/common.models';
import { IToDo } from 'src/components/todos/todo';

import { LOAD_TODOS, loadTodoSuccess, TodoActionType, TODOS_TOGGLE_COMPLETED, toggleCompleted, loadTodos } from './todo.action';

export const loadTodosEpic = (action$: Observable<IAction<TodoActionType, any>>) =>
    action$.pipe(
        ofType(LOAD_TODOS),
        mergeMap(action => ajax.getJSON('https://jsonplaceholder.typicode.com/todos')
            .pipe(
                map((response: IToDo[]) => loadTodoSuccess(response))
            )
        )
    )
export const toggleCompletedEpic = (action$: Observable<IAction<TodoActionType, any>>) =>
    action$.pipe(
        ofType(TODOS_TOGGLE_COMPLETED),
        mergeMap(action => ajax.post('https://jsonplaceholder.typicode.com/todos', action.payload)
            .pipe(
                map((response: AjaxResponse) => loadTodos()),
                catchError((error) => {
                    return of({
                        payload: error,
                        type: LOAD_TODOS,
                    });
                })
            )
        )
    )