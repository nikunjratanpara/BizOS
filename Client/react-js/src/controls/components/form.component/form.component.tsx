import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Form from 'reactstrap/lib/Form';
import Row from 'reactstrap/lib/Row';
import { IDictionary } from 'src/common/common.models';
import { IFormConfig, IRows } from 'src/store/forms/forms.action';

import FormCheckbox from '../form.checkbox.component';
import FormCheckboxGroup from '../form.checkbox.group.component';
import FormDataCombo from '../form.data.combo.component';
import FormDatepicker from '../form.datepicker.component';
import FormHidden from '../form.hidden.component';
import FormInput from '../form.input.component';
import FormNumberBox from '../form.numberbox.component';
import FormRadio from '../form.radio.component';
import FormSelect from '../form.select.component';
import FormTextarea from '../form.textarea.component';
import { saveForm } from './services/form.services';

export interface IFormProp extends RouteComponentProps<{ configName: string }> {
    formConfig: IFormConfig;
    loadFormConfig(formConfig: string): void;
}
export interface IFormState {
    value: IDictionary<any>;
}
/*
 
datetime : FormDatetime,
button : FormButton ,
submit : FormButton
 */
export const dynamicComponents: IDictionary<typeof React.Component> = {
    checkbox: FormCheckbox,
    "checkbox-group": FormCheckboxGroup,
    color: FormInput,
    datacombo: FormDataCombo,
    date: FormDatepicker,
    email: FormInput,
    file: FormInput,
    hidden: FormHidden,
    image: FormInput,
    month: FormInput,
    number: FormNumberBox,
    password: FormInput,
    radio: FormRadio,
    range: FormInput,
    reset: FormInput,
    search: FormInput,
    select: FormSelect,
    tel: FormInput,
    text: FormInput,
    textarea: FormTextarea,
    time: FormInput,
    url: FormInput,
    week: FormInput
};

export class FormComponent extends React.Component<IFormProp, IFormState> {
    private formContext: { disabled: boolean };
    constructor(public props: IFormProp) {
        super(props);
        this.state = {
            value: {
                "name": "Pune",
                "stateName": "Maharastra",
                "remarks": "Remarks",
                "favFood": "papsicum",
                "foodOption": ["veg"],
                PizzaType: "chese",
                DatePicker: "19880212",
                cityCombo: { code: 'pune' },
                "numberBox": "12.12"
            }
        };
        this.onSelect = this.onSelect.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.formContext = {
            disabled: false
        };
    }
    public componentDidMount() {
        this.props.loadFormConfig(this.props.match.params.configName);
        /* formConfig(this.props.match.params.configName).subscribe((config: { rows: IRows[] }) =>
            this.setState({ config: config.rows })
        ); */

    }
    public onChange(event: any) {
        const obj = {};
        obj[event.target.name] = event.target.value;
        this.setState({ value: { ...this.state.value, ...obj } });
    }

    public onSelect(event: any) {
        const obj = {};
        obj[event.target.name] = event.value;
        this.setState({ value: { ...this.state.value, ...obj } });
    }

    public onSubmit(event: any) {
        saveForm(this.state.value);
        event.preventDefault();
    }
    public renderRows() {
        let controls: JSX.Element[] = [];
        if (this.props.formConfig) {
            controls = this.props.formConfig.rows.map((row, index) => {
                return <Row form="true" key={index}>
                    {this.renderControls(row)}
                </Row>
            });
        }
        return controls;
    }
    public renderControls(row: IRows) {
        return row.cols.map(field => {
            const FormInputComponent: typeof React.Component = dynamicComponents[field.type];
            return <FormInputComponent key={field.name}
                onChange={this.onChange}
                onSelect={this.onSelect}
                disabled={this.formContext.disabled}
                value={this.state.value ? this.state.value[field.name] : ''}
                {...field}
            />

        });
    }
    public render() {
        return (
            <Form onSubmit={this.onSubmit} className="dynamic-form">
                {this.renderRows()}
                <button type="submit" className="btn btn-primary">Submit</button>
            </Form>
        );
    }
}
