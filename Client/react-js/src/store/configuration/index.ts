import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { loadFormEpic } from '../forms/forms.epics';
import formsReducer from '../forms/forms.reducer';
import { loadMenuEpic } from '../menu/menu.epics';
import menuReducer from '../menu/menu.reducer';
import { loadTodosEpic, toggleCompletedEpic } from '../todo/todo.epics';
import todoReducer from '../todo/todo.reducer';
import { customerSaveEpic } from '../customer/customer.epics';
import customerReducer from '../customer/customer.reducer';

export default function () {
    const rootReducer = combineReducers({
        formConfig: formsReducer,
        menuConfig: menuReducer,
        todos: todoReducer,
        customer: customerReducer
    });
    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const epicMiddleware = createEpicMiddleware();
    const rootEpics = combineEpics(
        loadTodosEpic,
        loadFormEpic,
        loadMenuEpic,
        toggleCompletedEpic,
        customerSaveEpic
    );
    const store = createStore(rootReducer,
        composeEnhancers(applyMiddleware(epicMiddleware))
    );
    epicMiddleware.run(rootEpics);
    return store;
}
