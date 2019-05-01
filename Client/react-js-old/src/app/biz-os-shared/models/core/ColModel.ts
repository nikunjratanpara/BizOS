import {NumberFormatOptions} from './NumberFormatOptions';
import {DateFormatOptions} from './DateFormatOptions';
import {Formatter} from './Formatter';

 export interface ColModel {
        // cellAttr: any;
        dataField: string;
        dataType?: string; // can be amount,number,date,string,boolean
        header: string;
        colSpan?: number;
        defaultValue?: string;
        cssClass?: string;
        numberFormatter?: NumberFormatOptions;
        dateFormatter?: DateFormatOptions;
        formatter?: Formatter; // use this only for data display formatting
        sortable?: boolean;
        sortOrder?: 'asc'|'desc';
        width?: number;
        align?: string;
    }
