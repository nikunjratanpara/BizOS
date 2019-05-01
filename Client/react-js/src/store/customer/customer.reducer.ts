import { IAction } from 'src/common/common.models';
import { CustomerActionType, CUSTOMER_SAVE, CUSTOMER_SAVE_SUCESS, ICustomer } from './customer.action';

export default (state: ICustomer = { id: '', firstName: '', lastName: '', gender: '' }, action: IAction<CustomerActionType, any>) => {
    switch (action.type) {
        case CUSTOMER_SAVE:
            return state;
        case CUSTOMER_SAVE_SUCESS:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
