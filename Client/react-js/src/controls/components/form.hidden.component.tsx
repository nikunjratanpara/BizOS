import * as React from 'react';
import Input from 'reactstrap/lib/Input';
import BaseControl from './base.control.component';
import { IBaseControlProps } from "./IBaseControlProps";
import { IBaseControlState } from './IBaseControlState';


export default BaseControl(class FormHidden extends React.Component<IBaseControlProps, IBaseControlState> {
    constructor(props: IBaseControlProps) {

        super(props);
    }

    public render() {
        return (
            <Input
                type='hidden'
                name={this.props.name}
                value={this.props.value as string}
            />
        )
    }
});