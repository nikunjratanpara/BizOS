import * as React from 'react';
import Row from 'reactstrap/lib/Row';
import FormCheckbox from 'src/controls/components/form.checkbox.component';
import { IToDo } from './todo';

export default class ToDoItem extends React.Component {
    constructor(public props: { item: IToDo, toggleCompleted: (todo: IToDo) => void }) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    public onChange(event: React.ChangeEvent) {
        this.props.toggleCompleted(this.props.item);
    }
    public render() {
        return (
            <Row>
                <FormCheckbox
                    label={this.props.item.title}
                    name="completed"
                    value={this.props.item.completed}
                    checked={this.props.item.completed}
                    onChange={this.onChange}
                />
            </Row>
        );
    }
}