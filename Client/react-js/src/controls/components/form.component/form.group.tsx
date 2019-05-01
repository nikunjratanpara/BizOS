
import * as React from 'react';
import { isFunction } from 'util';
interface IFormGroupProp {
    onChange?: (event: any) => void;
    name: string;
    value: any;
}
export default function (FormGroup: typeof React.Component) {
    return class extends React.Component<IFormGroupProp> {
        constructor(props: IFormGroupProp) {
            super(props);
            this.onChange = this.onChange.bind(this);
        }
        onChange(event: any) {
            let obj = { ...this.props.value };
            obj[event.target.name] = event.target.value;
            if (this.props.onChange && isFunction(this.props.onChange)) {
                this.props.onChange({ target: { name, value: obj } });
            }
        }
        render() {
            return <FormGroup onChange={this.onChange} value={this.props.value} />
        }
    }
}
