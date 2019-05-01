import * as React from 'react';
import Button from 'reactstrap/lib/Button';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';

interface IProps {
    currentSelectedMonth: number;
    months: string[];
    onMonthSelect?: (month: number) => void;
}
export class CalenderMonthView extends React.Component<IProps> {
    /**
     *
     */
    constructor(props: IProps) {
        super(props);
        this.onMonthSelect = this.onMonthSelect.bind(this);
    }
    public onMonthSelect(month:number) {
        if(this.props.onMonthSelect) {
            this.props.onMonthSelect(month);
        }
    }
    public render() {
        const  months = this.props.months.map((month,index) =>  
            <MonthItem key={index} month={index} monthStr={month} onClick={this.onMonthSelect} />
        );
        return <Row className="m-0 bg-secondary">
            {months}
        </Row>
    }
}
function MonthItem(props: {month:number, monthStr:string, onClick:(month:number) => void }) {
    function onClick() {
        props.onClick(props.month);
    }
    return <Col  sm={3} className="m-0 p-0">
    <Button type="button" onClick={onClick}> {props.monthStr} </Button>
    </Col>;
}