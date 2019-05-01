import { IAction } from 'src/common/common.models';

import {
    FormActionType, IFormConfig, LOAD_FORM_CONFIG, LOAD_FORM_CONFIG_SUCESS
} from './forms.action';

export default (state: IFormConfig = { id: '', rows: [] }, action: IAction<FormActionType, IFormConfig>) => {
    switch (action.type) {
        case LOAD_FORM_CONFIG:
            return state;
        case LOAD_FORM_CONFIG_SUCESS:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}