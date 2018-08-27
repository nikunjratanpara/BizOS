import React from 'React';
import { BaseControlComponent } from './base.control.component';
export class FormInput extends BaseControlComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="form-group row">
                <label className={this.state.uiProps.labelWidth}> {this.props.label} </label>
                <div className={this.state.uiProps.controlWidth}>
                    <input type={this.props.type}
                        className={this.state.uiProps.cssClass}
                        placeholder={this.props.placeholder}
                        value={this.state.value as string}
                        onChange={this.handleChange} 
                        disabled = {this.isDisabled()} />
                </div>
            </div>
        )
    }
}