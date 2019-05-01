import * as React from 'react';
import { NumberKey } from '../models/enums';
import BaseControl from './base.control.component';
import FormInput from './form.input.component';
import { IBaseControlProps } from "./IBaseControlProps";
import { IBaseControlState } from './IBaseControlState';

export default BaseControl(class FormNumberBox extends React.Component<IBaseControlProps, IBaseControlState> {

    constructor(public props: IBaseControlProps) {
        super(props);
        this.onKeyPress = this.onKeyPress.bind(this);
    }
    public onKeyPress(event: KeyboardEvent) {
        if (!NumberKey[event.charCode] || (this.props.value && (this.props.value as string).includes('.') && event.charCode === NumberKey.Decimal)) {
            event.preventDefault();
        } else if (this.props.onKeyPress) {
            this.props.onKeyPress(event);
        }
    }

    public render() {
        return (
            <FormInput {...this.props} onKeyPress={this.onKeyPress} />
        );
    }
});