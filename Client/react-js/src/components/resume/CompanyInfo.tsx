import * as React from 'react';

import { ICompany } from './resume.component';

export class CompanyInfo extends React.Component {
    constructor(public props: {
        item: ICompany;
    }) {
        super(props);
    }
    public render() {
        return (<p>
            <strong>{this.props.item.companyName}</strong>
            &nbsp; - &nbsp;
                <i>{this.props.item.role}</i>
            <br />
            {this.props.item.duration.from} - {this.props.item.duration.to}
        </p>);
    }
}
