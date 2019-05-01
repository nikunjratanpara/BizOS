import { IAction } from 'src/common/common.models';
import { IBaseControlProps } from 'src/controls/components/IBaseControlProps';


export const LOAD_FORM_CONFIG = 'LOAD_FORM_CONFIG';
export const LOAD_FORM_CONFIG_SUCESS = 'LOAD_FORM_CONFIG_SUCESS';
export type FormActionType = typeof LOAD_FORM_CONFIG | typeof LOAD_FORM_CONFIG_SUCESS;


export interface IFormConfig {
    id: string;
    rows: IRows[];
}
export interface IRows {
    cols: IBaseControlProps[]
}

export function loadFormConfig(configName: string): IAction<FormActionType, string> {
    return {
        payload: configName,
        type: LOAD_FORM_CONFIG
    };
}
export function loadFormConfigSuccess(formState: IFormConfig): IAction<FormActionType, IFormConfig> {
    return {
        payload: formState,
        type: LOAD_FORM_CONFIG_SUCESS
    }
}
