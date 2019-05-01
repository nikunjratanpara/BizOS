import * as React from 'react';

import { IProjectDetails } from './resume.component';

export class ProjectInfo extends React.Component {
    constructor(public props: {
        item: IProjectDetails;
    }) {
        super(props);
    }
    public render() {
        const details = this.props.item.details.map((detail, index) => <p key={index}> {detail}</p>);
        return (<div className="mt-4">
            <div>
                <strong>{this.props.item.name}</strong>
                &nbsp; - &nbsp;
                    <i>{this.props.item.role}</i>
            </div>
            <div>
                {this.props.item.technologies}
            </div>
            
            <div className="mt-3">
                {details}
            </div>
        </div>);
    }
}
