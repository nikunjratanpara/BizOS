import { Store } from '../store/Store';
import { Action } from '../store/Action';
import { todoStateConfig, TodoState, Todo } from './Todo.reducers';
import { createFeatureSelector, createSelector, Selector, MemoizedSelector } from '../utils';


export class TodoComponent {

    store: Store = new Store();
    todoSelector: MemoizedSelector<any,TodoState> ;
    todoDataSelector:Selector<TodoState,Todo[]>  =  (todoState:TodoState) => todoState.data;
    todoList: HTMLUListElement;
    constructor() {
        this.todoList = document.createElement('ul') as HTMLUListElement;
        this.store.registerSubState(todoStateConfig);
        this.todoSelector = createFeatureSelector<TodoState>('todo');
        let selector = createSelector(this.todoSelector,this.todoDataSelector);
        this.store.select(selector).subscribe((state:Todo[]) => {
            this.renderTodos(state);
        });
        // $.subscribe(state => this.renderTodos(state[todoStateConfig.name] as TodoState ));
    }
    
    render() {
        const element = document.getElementById('output') as HTMLDivElement;
        
        const htmlStructure = ` <div class="col-md-6">
                                    <div class="todolist not-done">
                                        <h1>Todos</h1>
                                        <form>
                                            <input id="txtTodo" type="text" class="form-control add-todo" placeholder="Add todo">
                                            <button id="btnTodo" class="btn btn-success">Add</button>
                                        </form>
                                        <hr>
                                        <ul id="todoList" class="list-unstyled">
                                        </ul>
                                    </div>
                                </div>
                                `;
      
        element.innerHTML = htmlStructure;

        this.todoList = document.getElementById('todoList') as HTMLUListElement;
        const btnTodo = document.getElementById('btnTodo') as HTMLButtonElement;
        const txtTodo = document.getElementById('txtTodo') as HTMLInputElement;
        

        btnTodo.addEventListener('click', (event) => {
            event.preventDefault();
            
            this.store.dispatch({ type: 'todo.add', subState:'todo', payload: { name: txtTodo.value } });
            txtTodo.value = '';
        });
    }
    renderTodos(state: Todo[]) {
        let todoHtml: string = '';
        state.forEach(
            (todo: Todo) => {
                todoHtml += `<li class="ui-state-default">
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" value="" />` + todo.name + `</label>
                                </div>
                            </li>`;
            }
        );
        this.todoList.innerHTML = todoHtml;
    }
}