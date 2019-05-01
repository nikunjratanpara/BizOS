import * as React from 'react';
import { isArray, isFunction } from 'util';
import { Option } from '../models';
import { IBaseControlProps } from './IBaseControlProps';
import { IBaseControlState } from './IBaseControlState';



export default function (ControlComponent: typeof React.Component): typeof React.Component {
    return class extends React.Component<IBaseControlProps, IBaseControlState> {
        constructor(public props: IBaseControlProps) {
            super(props);
            this.onChange = this.onChange.bind(this);
            this.onBlur = this.onBlur.bind(this);
            this.onClick = this.onClick.bind(this);
            this.onDoubleClick = this.onDoubleClick.bind(this);
            this.onFocus = this.onFocus.bind(this);
            this.onInput = this.onInput.bind(this);
            this.onKeyDown = this.onKeyDown.bind(this);
            this.onKeyPress = this.onKeyPress.bind(this);
            this.onKeyUp = this.onKeyUp.bind(this);
            this.onMouseDown = this.onMouseDown.bind(this);
            this.onMouseMove = this.onMouseMove.bind(this);
            this.onMouseOut = this.onMouseOut.bind(this);
            this.onMouseOver = this.onMouseOver.bind(this);
            this.onMouseUp = this.onMouseUp.bind(this);
            this.onSelect = this.onSelect.bind(this);
            this.onWheel = this.onWheel.bind(this);
        }
        public componentWillMount() {
            this.setState({
                displayValue: '',
                selectOptions: this.getOptions(),
                selectedIndex: 0,
                uiProps: {
                    controlWidth: 'col-sm-12 col-md-10',
                    cssClass: this.props.cssClass || 'form-control',
                    labelWidth: 'col-sm-12 col-md-2 col-form-label'
                },
                value: this.props.value || ''
            });
        }

        public getOptions(): Option[] {
            let selectOptions: Option[] = [];
            if (this.props.options && this.props.options.length > 0) {
                if (isArray(this.props.options) && typeof (this.props.options[0]) === 'string') {
                    selectOptions = (this.props.options as string[]).map(this.stringToOptions) as Option[];
                } else {
                    selectOptions = this.props.options as Option[];
                }
            }
            return selectOptions;
        }
        public onChange(event: any) {
            this.setState({ value: event.target.value });
            if (this.props.onChange && isFunction(this.props.onChange)) {
                this.props.onChange(event);
            }
        }
        public isDisabled() {
            return (this.props.formModel && this.props.formModel.isLocked) || this.props.disabled;
        }
        public onSelect(event: any) {
            if (this.props.onSelect && isFunction(this.props.onSelect)) {
                this.props.onSelect(event);
            }
        }
        public onBlur(event: any) {
            if (this.props.onBlur && isFunction(this.props.onBlur)) {
                this.props.onBlur(event);
            }
        }
        public onClick(event: any) {
            if (this.props.onClick && isFunction(this.props.onClick)) {
                this.props.onClick(event);
            }
        }

        public onDoubleClick(event: any) {
            if (this.props.onDoubleClick && isFunction(this.props.onDoubleClick)) {
                this.props.onDoubleClick(event);
            }
        }
        public onFocus(event: any) {
            if (this.props.onFocus && isFunction(this.props.onFocus)) {
                this.props.onFocus(event);
            }
        }
        public onInput(event: any) {
            if (this.props.onInput && isFunction(this.props.onInput)) {
                this.props.onInput(event);
            }
        }
        public onKeyDown(event: any) {
            if (this.props.onKeyDown && isFunction(this.props.onKeyDown)) {
                this.props.onKeyDown(event);
            }
        }
        public onKeyPress(event: any) {
            if (this.props.onKeyPress && isFunction(this.props.onKeyPress)) {
                this.props.onKeyPress(event);
            }
        }
        public onKeyUp(event: any) {
            if (this.props.onKeyUp && isFunction(this.props.onKeyUp)) {
                this.props.onKeyUp(event);
            }
        }
        public onMouseDown(event: any) {
            if (this.props.onMouseDown && isFunction(this.props.onMouseDown)) {
                this.props.onMouseDown(event);
            }
        }
        public onMouseMove(event: any) {
            if (this.props.onMouseMove && isFunction(this.props.onMouseMove)) {
                this.props.onMouseMove(event);
            }
        }
        public onMouseOut(event: any) {
            if (this.props.onMouseOut && isFunction(this.props.onMouseOut)) {
                this.props.onMouseOut(event);
            }
        }
        public onMouseOver(event: any) {
            if (this.props.onMouseOver && isFunction(this.props.onMouseOver)) {
                this.props.onMouseOver(event);
            }
        }
        public onMouseUp(event: any) {
            if (this.props.onMouseUp && isFunction(this.props.onMouseUp)) {
                this.props.onMouseUp(event);
            }
        }
        public onWheel(event: any) {
            if (this.props.onWheel && isFunction(this.props.onWheel)) {
                this.props.onWheel(event);
            }
        }
        public render() {
            return (
                <ControlComponent {...this.props}
                    selectOptions={this.state.selectOptions}
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                    onClick={this.onClick}
                    onDoubleClick={this.onDoubleClick}
                    onFocus={this.onFocus}
                    onInput={this.onInput}
                    onKeyDown={this.onKeyDown}
                    onKeyPress={this.onKeyPress}
                    onKeyUp={this.onKeyUp}
                    onMouseDown={this.onMouseDown}
                    onMouseMove={this.onMouseMove}
                    onMouseOut={this.onMouseOut}
                    onMouseOver={this.onMouseOver}
                    onMouseUp={this.onMouseUp}
                    onSelect={this.onSelect}
                    onWheel={this.onWheel}
                />
            );
        }

        private stringToOptions = (str: string): Option => ({ label: str, value: str });
    }
}