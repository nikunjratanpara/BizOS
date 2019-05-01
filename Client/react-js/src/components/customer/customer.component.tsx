import * as React from 'react';
import Button from 'reactstrap/lib/Button';
import formWithState, { IChildFormProps } from 'src/controls/components/form.component/formWithState';
import FormInput from 'src/controls/components/form.input.component';
import FormSelect from 'src/controls/components/form.select.component';
import { ICustomer } from 'src/store/customer/customer.action';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import Form from 'reactstrap/lib/Form';

interface ICustomerProps extends IChildFormProps {
    saveCustomer(customer: any): void;
    customer: ICustomer;
}
export default formWithState(class Customer extends React.Component {
    constructor(public props: ICustomerProps) {
        super(props);
        this.onSelect = this.onSelect.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onSubmit(event: React.FormEvent<HTMLFormElement>) {
        this.props.saveCustomer(this.props.value);
        event.preventDefault();
    }
    onChange(event) {
        this.props.onChange(event);
    }
    onSelect(event) {
        this.props.onSelect(event);
    }
    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <Row>
                    <FormInput width="6" name="firstName" type="text" label="First Name" onChange={this.onChange} value={this.props.value['firstName']} />
                    <FormInput width="6" name="lastName" type="text" label="Last Name" onChange={this.onChange} value={this.props.value['lastName']} />
                </Row>
                <Row>
                    <FormSelect width="6" name="gender" label="Gender"
                        options={[{ value: "F", label: "Female" }, { value: "M", label: "Male" }]}
                        onChange={this.onChange} value={this.props.value['gender']} />
                </Row>
                <Row>
                    <Col sm={3}>
                        <Button type="submit" > Save</Button>
                    </Col>
                </Row>
            </Form>
        );
    }
});
