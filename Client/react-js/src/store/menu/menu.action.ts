import { IAction } from 'src/common/common.models';

export const LOAD_MENUS = 'LOAD_MENUS';
export const LOAD_MENUS_SUCESS = 'LOAD_MENUS_SUCESS';
export type MenuActionType = typeof LOAD_MENUS | typeof LOAD_MENUS_SUCESS;


export interface IMenuConfig {
    id: string;
    menu: IMenu[];
}
export interface IMenu {
    id: string;
    name: string;
    url: string;
}

export function loadMenu(workplaceName: string): IAction<MenuActionType, string> {
    return {
        payload: workplaceName,
        type: LOAD_MENUS
    };
}
export function loadMenuSuccess(menuConfig: IMenuConfig): IAction<MenuActionType, IMenuConfig> {
    return {
        payload: menuConfig,
        type: LOAD_MENUS_SUCESS
    }
}
