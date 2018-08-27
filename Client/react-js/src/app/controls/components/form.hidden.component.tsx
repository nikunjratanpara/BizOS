import React from 'React';
import { BaseControlComponent } from './base.control.component';
export class FormHidden extends BaseControlComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                    <input type={this.props.type}
                        value={this.state.value as string}
                        disabled = {this.isDisabled()} />
                </div>
        )
    }
}