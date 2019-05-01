import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as moment from 'moment';
import * as React from 'react';
import { FormGroup, Label } from 'reactstrap';
import Col from 'reactstrap/lib/Col';
import { Key } from '../models/enums';
import BaseControl from './base.control.component';
import * as CalenderService from './datetime/calender.actions';
import { DatePicker } from './datetime/datepicker.component';
import { IBaseControlProps } from "./IBaseControlProps";
import { IBaseControlState } from "./IBaseControlState";
import { timingSafeEqual } from 'crypto';


interface IDatePickerState extends IBaseControlState {
    toggle: boolean;
    navigationDate: Date;
}
export default BaseControl(class FormDatepicker extends React.Component<IBaseControlProps, IDatePickerState> {
    public format: string;
    private control: HTMLInputElement;
    private supportedFormats = ['YYYYMMDD', 'YYYY.MM.DD','YYYY-MM-DD','YYYY/MM/DD']
    constructor(props: IBaseControlProps) {
        super(props);
        
        this.format = this.format || 'DD/MM/YYYY';
        this.supportedFormats.push(this.format);

        this.state = {
            displayValue: this.props.value ? moment(this.props.value, this.supportedFormats).format(this.format) : '',
            navigationDate: this.props.value,
            toggle: false,
            value: this.props.value || ''
        } as IDatePickerState;

        this.toggleCalender = this.toggleCalender.bind(this);
        this.OnDateSelect = this.OnDateSelect.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }
    public componentDidMount() {
        this.setState({
            displayValue: this.props.value ? moment(this.props.value, this.supportedFormats).format(this.format) : '',
            navigationDate: this.props.value,
            toggle: false,
            value: this.props.value || ''
        } as IDatePickerState);
    }
    public toggleCalender() {
        this.control.focus();
        this.setState({ toggle: !this.state.toggle })
    }
    public closeCalender() {
        this.setState({toggle:false});
    }
    public onKeyPress(event: any) {
        switch (event.charCode) {
            case Key.ArrowDown:
                this.setState({ navigationDate: CalenderService.getNext(this.state.navigationDate, 'd', CalenderService.getDaysPerWeek()) });
                break;
            case Key.ArrowUp:
                this.setState({ navigationDate: CalenderService.getNext(this.state.navigationDate, 'd', CalenderService.getDaysPerWeek() * -1) });
                break;
            case Key.ArrowRight:
                this.setState({ navigationDate: CalenderService.getNext(this.state.navigationDate, 'd', 1) });
                break;
            case Key.ArrowLeft:
                this.setState({ navigationDate: CalenderService.getNext(this.state.navigationDate, 'd', -1) });
                break;
            case Key.Escape:
                this.toggleCalender();
                event.preventDefault();
                break;
            case Key.Tab:
                this.toggleCalender();
                this.control.blur();
                break;
            case Key.Enter:
                this.OnDateSelect(this.state.navigationDate);
                if (Key.Enter === event.which) {
                    event.preventDefault();
                }
                break;
                case Key.Today:
                case Key.today: 
                event.preventDefault();
                this.OnDateSelect(moment().toDate());
                break;
        }
        if(this.props.onKeyPress) {
            this.props.onKeyPress(event);
        }
    }
    public onBlur(event: any) {
        if (this.props.onBlur) {
            this.props.onBlur(event);
        }
        if (!moment(this.state.displayValue, this.supportedFormats).isValid()) {
            this.setState({ displayValue: '', value: null });
        } else {
            this.setState({ displayValue: moment(this.state.displayValue,this.supportedFormats).format(this.format), value: moment(this.state.displayValue, this.supportedFormats).toDate() });
        }
    }
    public OnDateSelect(date: Date) {
        const e = event || { target: {} } as any;
        e.target.value = date;
        e.target.name = this.props.name;
        this.onChange(e);
        this.setState({ displayValue: moment(date).format(this.format) });
        this.closeCalender();
    }
    public onChange(event: any) {
        if (this.props.onChange) {
            this.props.onChange(event);
        }
        this.setState({ displayValue: event.target.value })
    }
    public render() {
        return (
            <Col md={this.props.width || 12}>
                <FormGroup>
                    <Label for={this.props.name}> {this.props.label} </Label>
                    <input
                        className=' form-control calender-input'
                        ref={(control: HTMLInputElement) => this.control = control}
                        disabled={this.props.disabled}
                        id={this.props.name}
                        name={this.props.name}
                        onBlur={this.onBlur}
                        onChange={this.onChange}
                        onClick={this.props.onClick}
                        onDoubleClick={this.props.onDoubleClick}
                        onFocus={this.props.onFocus}
                        onInput={this.props.onInput}
                        onKeyDown={this.props.onKeyDown}
                        onKeyPress={this.onKeyPress}
                        onKeyUp={this.props.onKeyUp}
                        onMouseDown={this.props.onMouseDown}
                        onMouseMove={this.props.onMouseMove}
                        onMouseOut={this.props.onMouseOut}
                        onMouseOver={this.props.onMouseOver}
                        onMouseUp={this.props.onMouseUp}
                        onWheel={this.props.onWheel}
                        placeholder={this.props.placeholder || this.format}
                        type='text'
                        value={this.state.displayValue as string}
                    />
                    <span className="calender-icon" onClick={this.toggleCalender}>
                        <FontAwesomeIcon icon={['fas', 'calendar-alt']} />
                    </span>
                    {this.state.toggle &&
                        <DatePicker
                            onDateSelect={this.OnDateSelect}
                            initDate={this.state.value}
                            format={this.format}
                            weekdays={['Sun', 'Mon', 'Tues', 'Wed', 'Thus', 'Fri', 'Sat']}
                            months={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']} />
                    }
                </FormGroup>
            </Col>
        )
    }
});