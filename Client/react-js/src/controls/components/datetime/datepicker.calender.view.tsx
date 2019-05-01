import * as React from 'react';
import Table from 'reactstrap/lib/Table';

import { MonthViewModel } from './MonthViewModel';

interface IProps {
    weekdays: string[];
    month: MonthViewModel | null;
    onDateSelect?: (date: Date) => void;
}
export class CalenderView extends React.Component<IProps> {
    /**
     *
     */
    constructor(props: IProps) {
        super(props);
        this.onDateSelect = this.onDateSelect.bind(this);
    }
    public onDateSelect(date: Date) {
        if (this.props.onDateSelect) {
            this.props.onDateSelect(date);
        }
    }
    public render() {
        const weekdays = this.props.weekdays.map((weekday, index) => <th key={index}>
            {weekday}
        </th>
        );
        let monthDays: any[] = [];
        if (this.props.month) {
            monthDays = this.props.month.calender.map((week, rindex) => <tr key={rindex}>
                {week.map((day, index) => <DayItem key={index} day={day} onDateSelect={this.onDateSelect} />)}
            </tr>);
        }
        return <Table size="sm" className="text-center">
            <thead className="thead-dark">
                <tr>
                    {weekdays}
                </tr>
            </thead>
            <tbody>
                {monthDays}
            </tbody>
        </Table>
    }
}
function DayItem(props: { day: Date, onDateSelect: (day: Date) => void }) {
    const onDateSelect = (event: any) => props.onDateSelect(props.day);
    return <td className="selectable" onClick={onDateSelect}>
        {props.day.getDate ? props.day.getDate() : ''}
    </td>
}