import * as React from 'react';
import { Link } from 'react-router-dom';
import NavItem from 'reactstrap/lib/NavItem';
import { IMenu } from 'src/store/menu/menu.action';

export class MenuItem extends React.Component<{ item: IMenu }> {
    constructor(public props: { item: IMenu }) {
        super(props);
    }
    public render() {
        return (<NavItem className="p-2">
            <Link to={this.props.item.url}> {this.props.item.name}</Link>
        </NavItem>);
    }
}