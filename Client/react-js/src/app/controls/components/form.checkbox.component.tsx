import React from 'React';
import { BaseControlComponent } from './base.control.component';
export class FormCheckbox extends BaseControlComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"form-check" + this.state.uiProps.containerCss}>
                <div className={"offset-m3" + this.state.uiProps.controlWidth}>
                    <div>
                    <input type="checkbox"
                    className={"form-check-input" + this.state.uiProps.cssClass}
                    value={this.state.value as string}
                    name="name"
                    disabled={this.isDisabled() } />
                
                    <label className="form-check-label">
                    {this.props.label}
            </label>
                    </div>
                </div>
            </div>
        )
    }
}