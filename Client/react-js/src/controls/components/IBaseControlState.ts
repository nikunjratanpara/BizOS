import { Option } from '../models';
export interface IBaseControlState {
    uiProps?: {
        labelWidth: string;
        controlWidth: string;
        cssClass: string;
        containerCss?: string;
    };
    selectOptions: Option[];
    selectedIndex: number;
    value: string | any;
    displayValue: string;
}
