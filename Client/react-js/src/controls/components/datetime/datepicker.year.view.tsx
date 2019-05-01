import * as React from 'react';
import Button from 'reactstrap/lib/Button';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IProps {
    currentSelectedYear: number;
    onYearSelect?: (year: number) => void;
}
interface IState {
    year : number
}
export class CalenderYearView extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {year:0}
        this.onYearSelect = this.onYearSelect.bind(this);

        this.onPreviousClick = this.onPreviousClick.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
    }
    public componentDidMount() {
        this.setState({
            year:this.props.currentSelectedYear
        });
    }
    public onYearSelect(month:number) {
        if(this.props.onYearSelect) {
            this.props.onYearSelect(month);
        }
    }
    public onNextClick() {
        this.setState({
            year: this.state.year + 12 
        });
    }
    public onPreviousClick() {
        this.setState({
            year: this.state.year - 12 
        });
    }
    public render() {
        const years = Array.from({ length: 12 }, (v, i) => i + (this.state.year - 6));
        const yearsRendered = years.map((year, index) => <YearItem key={index} Year={year} onClick={this.onYearSelect}/>);
        return <Row className="m-0 bg-secondary">
            <Col className="m-0 p-0">
                <Button type="button" className="btn-navigation p-0" onClick={this.onPreviousClick}> 
                    <FontAwesomeIcon icon={['fas','chevron-left']} />
                </Button>
            </Col>
            <Col className="row m-0 p-0" sm={10}>
                    {yearsRendered}
            </Col>
            <Col className="m-0 p-0">
                <Button type="button" className="btn-navigation p-0" onClick={this.onNextClick}> 
                    <FontAwesomeIcon icon={['fas','chevron-right']} /> 
                </Button>
                </Col>

        </Row>
    }
}

function YearItem(props: {Year:number,  onClick:(Year:number) => void }) {
    function onClick() {
        props.onClick(props.Year);
    }
    return <Col  sm={3} className="m-0 p-0">
    <Button type="button" onClick={onClick}> {props.Year} </Button>
    </Col>;
}