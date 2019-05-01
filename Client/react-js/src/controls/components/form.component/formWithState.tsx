import * as React from 'react';
import { IDictionary } from 'src/common/common.models';
interface IFormWithStateProps {
    object?: any;
}

export interface IFormWithState {
    value: IDictionary<any>;
    displayErrors: boolean;
}
export interface IChildFormProps {
    value: IDictionary<any>;
    displayErrors: boolean;
    onSelect(event: any): void;
    onChange(event: any): void;
}

export default function (FormComponent: typeof React.Component): typeof React.Component {
    return class extends React.Component<IFormWithStateProps, IFormWithState> {
        constructor(public props: IFormWithStateProps) {
            super(props);
            this.state = { value: {}, displayErrors: false };
            this.onSelect = this.onSelect.bind(this);
            this.onChange = this.onChange.bind(this);
        }
        public componentDidMount() {
            if (this.props.object) {
                this.setState({ value: this.props.object });
            }
        }
        public onChange(event: any) {
            const obj = {};
            obj[event.target.name] = event.target.value;
            this.setState({ value: { ...this.state.value, ...obj } });
        }

        public onSelect(event: any) {
            const obj = {};
            obj[event.target.name] = event.value;
            this.setState({ value: { ...this.state.value, ...obj } });
        }

        public render() {
            return <FormComponent onChange={this.onChange} onSelect={this.onSelect} displayErrors={this.state.displayErrors} value={this.state.value} {...this.props} />
        }
    }
}