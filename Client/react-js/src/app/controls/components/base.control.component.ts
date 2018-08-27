import React from 'React';
import { Option, TypeaheadOptions, FormModel, DatetimePickerOptions, CatalogData } from '../models';
import { isArray } from 'util';
interface IProps {
    type: string;
    name: string;
    disabled?: boolean;
    label?: string;
    options?:string[]| Option[];
    placeholder?: string;
    value?: string| CatalogData;
    cssClass?: string;
    typeaheadOptions?: TypeaheadOptions;
    datetimePickerOptions?: DatetimePickerOptions;
    formModel: FormModel;
    containerCss: string;
}
interface IState {
    uiProps: {
        labelWidth: string;
        controlWidth: string;
        cssClass: string;
        containerCss?:string;
    }
    options?: Option[];
    value: string | CatalogData;
}

export class BaseControlComponent extends React.Component<IProps, IState> {
    constructor(public props: IProps) {
        super(props);
        this.defaultUIConfig();
        this.handleOptions();
    }
    public defaultUIConfig() {
        this.setState({
            uiProps: {
                labelWidth: 'col-sm-12 col-md-2 col-form-label',
                controlWidth: 'col-sm-12 col-md-10',
                cssClass: this.props.cssClass || 'form-control'
            }
        });
    }
    public handleOptions() {
        if (this.props.options && this.props.options.length > 0) {
            let options:Option[] = null;
            if (isArray(this.props.options) && typeof (this.props.options[0]) === 'string') {
                options = (this.props.options as string[]).map(this.stringToOptions) as Option[];
            } else {
                options = this.props.options as Option[];
            }
            this.setState({options,value:''});
        }
    }
    public handleChange(event) {
        this.setState({value: event.target.value});
    }
    public  isDisabled(){
        return this.props.formModel.isLocked || this.props.disabled;
    }
    private stringToOptions = str => { return {label: str, value: str } }; 
}
