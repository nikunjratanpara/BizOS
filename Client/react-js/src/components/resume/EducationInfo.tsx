import * as React from 'react';

import { IEducation } from './resume.component';

export class EducationInfo extends React.Component {
    constructor(public props: {
        item: IEducation;
    }) {
        super(props);
    }
    public render() {
        return (<p>
            <strong>{this.props.item.course}</strong>
            &nbsp; ({this.props.item.result}) &nbsp;
                {this.props.item.collageName}
            <br />
            {this.props.item.duration.from} – {this.props.item.duration.to}
        </p>);
    }
}
