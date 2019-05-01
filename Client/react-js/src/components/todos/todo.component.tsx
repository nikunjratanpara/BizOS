import * as React from 'react';

import { IToDo } from './todo';
import ToDoItem from './todo.item.component';

interface IProps {
    todos: IToDo[];
    loadTodos: () => void;
    toggleCompleted: (todo: IToDo) => void;
}
export default class ToDo extends React.Component<IProps> {
    constructor(public props: IProps) {
        super(props);
    }
    public componentDidMount() {
        this.props.loadTodos();
    }
    public render() {
        const todos = this.props.todos.map((item, index) => (
            <ToDoItem key={index} item={item} toggleCompleted={this.props.toggleCompleted} />
        ));
        return (
            <div className="no-print">
                {todos}
            </div>
        );
    }
}