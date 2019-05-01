import * as React from 'react';
import Col from 'reactstrap/lib/Col';
import FormGroup from 'reactstrap/lib/FormGroup';
import Input from 'reactstrap/lib/Input';
import Label from 'reactstrap/lib/Label';

import BaseControl from './base.control.component';
import { IBaseControlProps } from "./IBaseControlProps";
import { IBaseControlState } from './IBaseControlState';

export default BaseControl(class FormRadio extends React.Component<IBaseControlProps, IBaseControlState> {
    constructor(props: IBaseControlProps) {
        super(props);
    }

    public render() {
        return (
            <Col md={this.props.width || 12}>
                <FormGroup tag="fieldset">
                    <legend className="col-form-label ">{this.props.label}</legend>
                    {this.props.selectOptions && this.props.selectOptions.length && this.props.selectOptions.map(option =>
                        (
                            <FormGroup check={true} inline={true} key={option.value}>

                                <Label check={true}>
                                    <Input type="radio"
                                        value={option.value}
                                        checked={this.props.value === option.value}
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
                                        onSelect={this.props.onSelect}
                                        onWheel={this.props.onWheel}
                                        disabled={this.props.disabled || option.disabled} />
                                    {option.label}
                                </Label>
                            </FormGroup>
                        )
                    )}
                </FormGroup>
            </Col>
        )
    }
});