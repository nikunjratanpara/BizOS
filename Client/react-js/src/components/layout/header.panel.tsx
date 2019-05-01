import * as React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'reactstrap/lib/Nav';
import Navbar from 'reactstrap/lib/Navbar';
import NavbarBrand from 'reactstrap/lib/NavbarBrand';
import NavItem from 'reactstrap/lib/NavItem';
import NavLink from 'reactstrap/lib/NavLink';

interface IState {
    isOpen: boolean;
}
export class HeaderPanel extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    public toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    public render() {
        return <Navbar className="no-print" color="dark">
            <NavbarBrand href="/">Layouter</NavbarBrand>
            <Nav>
                <NavItem>
                    <NavLink>
                        <Link to="/">About Me</Link>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink>
                        <Link to="/example">To Dos</Link>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink>
                        <Link to="/workplace/catalogs">Catalogs</Link>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink>
                        <Link to="/workplace/ledgers">Ledgers</Link>
                    </NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    }
}