import {INumberFormatOptions} from './INumberFormatOptions';
import {IDateFormatOptions} from './IDateFormatOptions';
import {IFormatter} from './IFormatter';

 export interface IColModel {
        // cellAttr: any;
        dataField: string;
        dataType?: string; //can be amount,number,date,string,boolean
        header: string;
        colSpan?: number;
        defaultValue?: string;
        cssClass?: string;
        numberFormatter?: INumberFormatOptions;
        dateFormatter?: IDateFormatOptions;
        formatter?: IFormatter; // use this only for data display formatting
        sortable?: boolean;
        sortOrder?: 'asc'|'desc';
        width?: number;
        align?: string;
    }
