import { ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { getUrl } from 'src/common/common.functions';
import { IAction } from 'src/common/common.models';
import { CustomerActionType, CUSTOMER_SAVE, saveCustomerSuccess, ICustomer, CUSTOMER_SAVE_SUCESS } from './customer.action';


export const customerSaveEpic = (action$: Observable<IAction<CustomerActionType, ICustomer>>) =>
    action$.pipe(
        ofType(CUSTOMER_SAVE),
        mergeMap(action =>
            ajax.post(getUrl('customer'), action.payload)
                .pipe(
                    map((response: AjaxResponse) =>
                        saveCustomerSuccess(response.response)),
                    catchError((error) => {
                        return of({
                            payload: error,
                            type: CUSTOMER_SAVE_SUCESS,
                        });
                    })
                )
        )
    );
