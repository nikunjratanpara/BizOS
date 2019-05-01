import * as React from 'react';
import { Route } from 'react-router-dom';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';

import ErrorBagContainer from '../../store/todo/todo.container';
import { Resume } from '../resume/resume.component';
import { HeaderPanel } from './header.panel';
import { Workplace } from './workplace.component';

export class Layout extends React.Component {
    public render() {
        return <div>
            <HeaderPanel />
            <Row>
                <Col sm={12} md={12} lg={12}>
                    <Route exact={true} path="/" component={Resume} />
                    <Route path="/example" component={ErrorBagContainer} />
                    <Route path="/workplace/:workplaceName" component={Workplace} />
                </Col>
            </Row>
        </div>
    }
}