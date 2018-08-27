 import {FormatOptions} from './FormatOptions';
 import {Formatter} from './Formatter';

 export interface ColGenerator extends FormatOptions {
        colAttr: string;
        IsRender: boolean;
        header: string;
        formatter?: Formatter;
        datafield: string;
        datatype: string;
    }
