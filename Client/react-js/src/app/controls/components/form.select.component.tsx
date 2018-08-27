import React from 'React';
import { BaseControlComponent } from './base.control.component';

export class FormSelect extends BaseControlComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const options = this.state.options.map(option => {
            return (<option value="option.value" >
                {option.label}
            </option>);
        });
        return (
            <div className={"form-group row " + this.props.containerCss}>
                <label className={this.state.uiProps.labelWidth}>{this.props.label}</label>
                <div className={this.state.uiProps.controlWidth}>
                    <select value={this.state.value as string}
                        onChange={this.handleChange}
                        className={this.state.uiProps.cssClass}
                        disabled={this.isDisabled()}
                    >
                        <option value="">{this.props.placeholder}</option>
                        {options}
                    </select>
                </div>
            </div>
        );
    }

}