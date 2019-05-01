import * as React from 'react';
import Col from 'reactstrap/lib/Col';
import FormGroup from 'reactstrap/lib/FormGroup';
import Input from 'reactstrap/lib/Input';
import Label from 'reactstrap/lib/Label';

import BaseControl from './base.control.component';
import { IBaseControlProps } from "./IBaseControlProps";
import { IBaseControlState } from './IBaseControlState';

export default BaseControl(class FormCheckbox extends React.Component<IBaseControlProps, IBaseControlState> {
    constructor(props: IBaseControlProps) {
        super(props);
    }

    public render() {
        return (
            <Col md={this.props.width || 12}>
                <FormGroup check={true}>
                    <Label check={true}>
                        <Input type="checkbox"
                            className={"form-check-input"}
                            value={this.props.value}
                            name={this.props.name}
                            checked={this.props.checked}
                            onChange={this.props.onChange}
                            onBlur={this.props.onBlur}
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
                            disabled={this.props.disabled} />
                        {this.props.label}
                    </Label>
                </FormGroup>
            </Col>
        )
    }
});