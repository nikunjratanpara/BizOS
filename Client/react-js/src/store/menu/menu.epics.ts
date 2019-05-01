import { ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, mergeMap } from 'rxjs/operators';
import { getUrl } from 'src/common/common.functions';
import { IAction } from 'src/common/common.models';

import { IMenuConfig, LOAD_MENUS, loadMenuSuccess, MenuActionType } from './menu.action';

export const loadMenuEpic = (action$: Observable<IAction<MenuActionType, string>>) =>
    action$.pipe(
        ofType(LOAD_MENUS),
        mergeMap(action => ajax.getJSON(getUrl('menu/' + action.payload))
            .pipe(
                map((response: IMenuConfig) => loadMenuSuccess(response))
            )
        )
    )
