import { ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, mergeMap } from 'rxjs/operators';
import { getUrl } from 'src/common/common.functions';
import { IAction } from 'src/common/common.models';

import {
    FormActionType, IFormConfig, LOAD_FORM_CONFIG, loadFormConfigSuccess
} from './forms.action';

export const loadFormEpic = (action$: Observable<IAction<FormActionType, string>>) =>
    action$.pipe(
        ofType(LOAD_FORM_CONFIG),
        mergeMap(action => ajax.getJSON(getUrl('formConfig/' + action.payload))
            .pipe(
                map((response: IFormConfig) => loadFormConfigSuccess(response))
            )
        )
    )
