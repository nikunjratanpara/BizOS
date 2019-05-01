import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route } from 'react-router-dom';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';
import customerContainer from 'src/store/customer/customer.container';
import FormComponent from '../../store/forms/forms.container';
import MenuComponent from '../../store/menu/menu.container';


export class Workplace extends React.Component<RouteComponentProps<{ workplaceName: string }>> {
    constructor(public props: RouteComponentProps<{ workplaceName: string }>) {
        super(props);
    }
    public render() {
        return (
            <Row>
                <Col sm={12} md={3} lg={2}>
                    <Route path={`/workplace/:workplaceName`} component={MenuComponent} />
                </Col>
                <Col sm={12} md={9} lg={10}>
                    <Route exact={true} path={`/workplace/catalogs/:configName`} component={FormComponent} />
                    <Route path={`/workplace/ledgers/customer`} component={customerContainer} />
                </Col>

            </Row>
        );
    }
}