import { connect } from 'react-redux';
import { Action } from 'redux';
import { IToDo } from 'src/components/todos/todo';
import ToDo from 'src/components/todos/todo.component';
import { loadTodos, toggleCompleted } from './todo.action';


const mapStateToPropParams = (state: { todos: IToDo[] }) => ({ todos: state.todos });
const mapDispatchToProps = (dispatch: (action: Action) => void) => {
  return {
    loadTodos: () => {
      dispatch(loadTodos());
    },
    toggleCompleted: (todo: IToDo) => {
      dispatch(toggleCompleted(todo));
    }
  }
}
export default connect(mapStateToPropParams, mapDispatchToProps)(ToDo);