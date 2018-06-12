 import {IFormatOptions} from './IFormatOptions';
 import {IFormatter} from './IFormatter';

 export interface IColGenerator extends IFormatOptions {
        colAttr: string;
        IsRender: boolean;
        header: string;
        formatter?: IFormatter;
        datafield: string;
        datatype: string;
    }
