import { IAction } from 'src/common/common.models';

export const CUSTOMER_SAVE = 'CUSTOMER_SAVE';
export const CUSTOMER_SAVE_SUCESS = 'CUSTOMER_SAVE_SUCESS';
export type CustomerActionType = typeof CUSTOMER_SAVE | typeof CUSTOMER_SAVE_SUCESS;

export interface ICustomer {
    firstName: string;
    lastName: string;
    gender: string;
    id: string;
}
export function saveCustomer(customer: ICustomer): IAction<CustomerActionType, ICustomer> {
    return {
        payload: customer,
        type: CUSTOMER_SAVE
    };
}
export function saveCustomerSuccess(customer: ICustomer): IAction<CustomerActionType, ICustomer> {
    return {
        payload: customer,
        type: CUSTOMER_SAVE_SUCESS
    }
}
