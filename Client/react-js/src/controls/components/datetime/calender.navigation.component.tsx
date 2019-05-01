import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';


interface IProps {
    Month: string;
    onMonthClick: () => void;
    onNextClick: () => void;
    onPreviousClick: () => void;
    onYearClick: () => void;
    Year: number;
}

export class CalenderNavigation extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props)
        this.onNextClick = this.onNextClick.bind(this);
        this.onPreviousClick = this.onPreviousClick.bind(this);
        this.onMonthClick = this.onMonthClick.bind(this);
        this.onYearClick = this.onYearClick.bind(this);
    }
    public onNextClick() {
        this.props.onNextClick();
    }
    public onPreviousClick() {
        this.props.onPreviousClick();
    }
    public onMonthClick() {
        this.props.onMonthClick();
    }
    public onYearClick() {
        this.props.onYearClick();
    }

    public render() {
        // const months = [<option key="0" value="0">Jan</option>]
        return <Row className="card-title m-0 shadow-lg text-white bg-secondary">
            <Col sm={1} className="text-center m-0 p-0">
                <span className="btn btn-secondary btn-navigation p-0" onClick={this.onPreviousClick}>
                    <FontAwesomeIcon icon={['fas', 'chevron-left']} />
                </span>
            </Col>
            <Col sm={5} className="text-center m-0 p-0">
                <span className="btn btn-secondary" onClick={this.onMonthClick}>
                    {this.props.Month}
                </span>
            </Col>
            <Col sm={5} className="text-center m-0 p-0">
                <span className="btn btn-secondary" onClick={this.onYearClick}>
                    {this.props.Year}
                </span>
            </Col>
            <Col sm={1} className="text-center m-0 p-0">
                <span className="btn btn-secondary btn-navigation p-0" onClick={this.onNextClick}>
                    <FontAwesomeIcon icon={['fas', 'chevron-right']} />
                </span>
            </Col>
        </Row>
    }
}