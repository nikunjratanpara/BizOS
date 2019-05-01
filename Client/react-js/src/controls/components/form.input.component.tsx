import * as React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import Col from 'reactstrap/lib/Col';
import BaseControl from './base.control.component';
import { IBaseControlProps } from "./IBaseControlProps";
import { IBaseControlState } from './IBaseControlState';


export default BaseControl(class FormInput extends React.Component<IBaseControlProps, IBaseControlState> {
    constructor(props: IBaseControlProps) {
        super(props);
    }

    public render() {
        return (
            <Col md={this.props.width || 12}>
                <FormGroup>
                    <Label for={this.props.name}> {this.props.label} </Label>
                    <Input
                        disabled={this.props.disabled}
                        id={this.props.name}
                        name={this.props.name}
                        onBlur={this.props.onBlur}
                        onChange={this.props.onChange}
                        onClick={this.props.onClick}
                        onDoubleClick={this.props.onDoubleClick}
                        onFocus={this.props.onFocus}
                        onInput={this.props.onInput}
                        onKeyDown={this.props.onKeyDown}
                        onKeyPress={this.props.onKeyPress}
                        onKeyUp={this.props.onKeyUp}
                        onMouseDown={this.props.onMouseDown}
                        onMouseMove={this.props.onMouseMove}
                        onMouseOut={this.props.onMouseOut}
                        onMouseOver={this.props.onMouseOver}
                        onMouseUp={this.props.onMouseUp}
                        onWheel={this.props.onWheel}
                        placeholder={this.props.placeholder}
                        type={this.props.type === 'number' ? 'text' : this.props.type}
                        value={this.props.value as string}
                    />
                </FormGroup>
            </Col>
        )
    }
});