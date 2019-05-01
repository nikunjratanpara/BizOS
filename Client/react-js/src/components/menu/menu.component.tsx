import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Nav from 'reactstrap/lib/Nav';
import { IMenuConfig } from 'src/store/menu/menu.action';
import { MenuItem } from './menu.item.component';

interface IProps extends RouteComponentProps<{ workplaceName: string }> {
    menuConfig: IMenuConfig;
    loadMenu: (workplaceName: string) => void;
}
export class MenuComponent extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }
    public componentDidMount() {
        this.props.loadMenu(this.props.match.params.workplaceName);
    }
    public render() {

        return (
            <Nav className="sidebar bg-dark" navbar={true} nav={true}>
                {this.props.menuConfig.menu && this.props.menuConfig.menu.map(menu => <MenuItem key={menu.id} item={menu} />)}
            </Nav>
        );
    }
}
