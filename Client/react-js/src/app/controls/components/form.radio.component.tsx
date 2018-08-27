import React from 'React';
import { BaseControlComponent } from './base.control.component';
export class FormRadio extends BaseControlComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let radioConrtols = this.state.options.map(option => {

            <label className="form-check-label">
                <input type="radio"
                    className={"form-check-input" + this.state.uiProps.cssClass}
                    value={option.value}
                    name="name"
                    disabled={this.isDisabled() || option.disabled} />
                {option.label}
            </label>
        });
        return (
            <div className={"form-check" + this.state.uiProps.containerCss}>
                <legend className={ "col-form-label" + this.state.uiProps.labelWidth}>{this.props.label}</legend>
                <div className={this.state.uiProps.controlWidth}>
                    <div>
                        {radioConrtols}
                    </div>
                </div>
            </div>
        )
    }
}