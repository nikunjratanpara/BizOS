import * as moment from 'moment';
import * as React from 'react';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import CardFooter from 'reactstrap/lib/CardFooter';
import * as CalenderService from './calender.actions';
import { CalenderNavigation } from './calender.navigation.component';
import { CalenderView } from './datepicker.calender.view';
import { CalenderMonthView } from './datepicker.month.view';
import { CalenderYearView } from './datepicker.year.view';
import { MonthViewModel } from './MonthViewModel';

interface IProps {
    format?: string;
    initDate: string;
    maxDate?: Date;
    minDate?: Date;
    months: string[];
    onDateSelect?: (date: Date) => void;
    weekdays: string[];
}
interface IState {
    currentMonthView: Date;
    monthViewModel: MonthViewModel | null;
    view: number;
}
export class DatePicker extends React.Component<IProps, IState> {
    constructor(public props: IProps) {
        super(props);
        const date = moment(this.props.initDate || new Date(), this.props.format).toDate();
        this.state = {
            currentMonthView: date,
            monthViewModel: CalenderService.getMonth(date.getMonth() + 1, date.getFullYear()),
            view: 1
        };
        this.onDateSelect = this.onDateSelect.bind(this);

        this.onMonthNavigate = this.onMonthNavigate.bind(this);
        this.onNextNavigate = this.onNextNavigate.bind(this);
        this.onPreviousNavigate = this.onPreviousNavigate.bind(this);
        this.onYearNavigate = this.onYearNavigate.bind(this);

        this.onMonthSelect = this.onMonthSelect.bind(this);
        this.onYearSelect = this.onYearSelect.bind(this);

        this.onTodayClick = this.onTodayClick.bind(this);
    }
    public onDateSelect(date: Date) {
        if (this.props.onDateSelect) {
            this.props.onDateSelect(date);
        }
    }
    public onMonthNavigate() {
        this.setState({ view: 2 });
    }
    public onYearNavigate() {
        this.setState({ view: 3 });
    }
    public onNextNavigate() {
        this.resetMonth(CalenderService.getNext(this.state.currentMonthView, 'M'));
    }
    public onPreviousNavigate() {
        this.resetMonth(CalenderService.getPrev(this.state.currentMonthView, 'M'));
    }

    public onMonthSelect(month: number) {
        const date = this.state.currentMonthView;
        date.setMonth(month);
        this.resetMonth(date);
    }
    public onYearSelect(year: number) {
        const date = this.state.currentMonthView;
        date.setFullYear(year);
        this.resetMonth(date);
    }

    public onTodayClick() {
        this.resetMonth(new Date());
    }
    public render() {

        return <Card className="calender">
            <CalenderNavigation
                Month={this.props.months[this.state.currentMonthView.getMonth()]}
                Year={this.state.currentMonthView.getFullYear()}
                onNextClick={this.onNextNavigate}
                onPreviousClick={this.onPreviousNavigate}
                onMonthClick={this.onMonthNavigate}
                onYearClick={this.onYearNavigate} />

            <CardBody className="p-0">
                {this.renderView()}
            </CardBody>
            <CardFooter className="text-center bg-secondary m-0 p-0 text-white">
                <span className="btn btn-secondary" onClick={this.onTodayClick}>Today</span>
            </CardFooter>
        </Card>;
    }

    private resetMonth(date: Date) {
        this.setState({
            currentMonthView: date,
            monthViewModel: CalenderService.getMonth(date.getMonth() + 1, date.getFullYear()),
            view: 1
        });
    }
    private renderView() {
        switch (this.state.view) {
            case 1:
                return <CalenderView month={this.state.monthViewModel} weekdays={this.props.weekdays} onDateSelect={this.onDateSelect} />
                break;
            case 2:
                return <CalenderMonthView months={this.props.months} currentSelectedMonth={this.state.currentMonthView.getMonth()} onMonthSelect={this.onMonthSelect} />
                break;
            case 3:
                return <CalenderYearView currentSelectedYear={this.state.currentMonthView.getFullYear()} onYearSelect={this.onYearSelect} />
                break;
            default:
                return null;
                break;
        }
    }
}

