import * as React from 'react';
import Col from 'reactstrap/lib/Col';
import FormGroup from 'reactstrap/lib/FormGroup';
import Input from 'reactstrap/lib/Input';
import Label from 'reactstrap/lib/Label';

import BaseControl from './base.control.component';
import { IBaseControlProps } from "./IBaseControlProps";
import { IBaseControlState } from './IBaseControlState';

export default BaseControl(class FormCheckboxGroup extends React.Component<IBaseControlProps, IBaseControlState> {
    constructor(props: IBaseControlProps) {
        super(props);
        this.state = { value: [], displayValue: '', selectOptions: [], selectedIndex: 0 };
        this.onChange = this.onChange.bind(this);
    }
    public onChange(event: React.ChangeEvent<HTMLInputElement>) {
        let val: string[] = this.props.value;
        if (event.target.checked) {
            val.push(event.target.value);
        } else {
            val = this.props.value.filter((value: string) => value !== (event.target as HTMLInputElement).value);
        }
        if (this.props.onChange) {
            this.props.onChange({ target: { name: this.props.name, value: val } });
        }
    }
    public render() {
        return (
            <Col md={this.props.width || 12}>
                <FormGroup tag="fieldset">
                    <legend className="col-form-label ">{this.props.label}</legend>
                    <div>
                        {this.props.selectOptions &&
                            this.props.selectOptions.length &&
                            this.props.selectOptions.map((option, index) =>
                                (
                                    <FormGroup key={index} check={true} inline={true}>
                                        <Label check={true} inline={true}>
                                            <Input
                                                type="checkbox"
                                                value={option.value}
                                                checked={this.props.value && this.props.value.indexOf(option.value) > -1}
                                                name={this.props.name}
                                                onBlur={this.props.onBlur}
                                                onChange={this.onChange}
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
                    </div>
                </FormGroup>
            </Col>
        )
    }
});