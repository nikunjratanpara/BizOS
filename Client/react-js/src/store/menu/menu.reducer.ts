import { IAction } from 'src/common/common.models';

import { IMenuConfig, LOAD_MENUS, LOAD_MENUS_SUCESS, MenuActionType } from './menu.action';

export default (state: IMenuConfig = { id: '', menu: [] }, action: IAction<MenuActionType, IMenuConfig>) => {
    switch (action.type) {
        case LOAD_MENUS:
            return state;
        case LOAD_MENUS_SUCESS:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}