import * as React from 'react';
import Col from 'reactstrap/lib/Col';
import FormGroup from 'reactstrap/lib/FormGroup';
import Input from 'reactstrap/lib/Input';
import Label from 'reactstrap/lib/Label';
import BaseControl from './base.control.component';
import { IBaseControlProps } from './IBaseControlProps';
import { IBaseControlState } from './IBaseControlState';


export default BaseControl(class FormSelect extends React.Component<IBaseControlProps, IBaseControlState> {
    constructor(props: IBaseControlProps) {
        super(props);
    }
    public render() {
        return (
            <Col md={this.props.width || 12}>
                <FormGroup>
                    <Label for={this.props.name}> {this.props.label} </Label>
                    <Input
                        type='select'
                        className='custom-select '
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
                        onSelect={this.props.onSelect}
                        onWheel={this.props.onWheel}
                        value={this.props.value as string} >
                        {this.props.placeholder && <option key='placeholder' value=''>{this.props.placeholder}</option>}
                        {this.props.selectOptions && this.props.selectOptions.length && this.props.selectOptions.map(option =>
                            (<option value={option.value} key={option.value} >
                                {option.label}
                            </option>)
                        )}
                    </Input>
                </FormGroup>
            </Col>
        );
    }
});