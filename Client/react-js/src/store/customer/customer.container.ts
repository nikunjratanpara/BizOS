import { connect } from 'react-redux';
import { Action } from 'redux';
import { saveCustomer, ICustomer } from './customer.action';
import customerComponent from 'src/components/customer/customer.component';

const mapStateToPropParams = (state: { customer: ICustomer }) => ({ object: state.customer });
const mapDispatchToProps = (dispatch: (action: Action) => void) => {
    return {
        saveCustomer: (customer: ICustomer) => {
            dispatch(saveCustomer(customer));
        }
    }
}
export default connect(mapStateToPropParams, mapDispatchToProps)(customerComponent);