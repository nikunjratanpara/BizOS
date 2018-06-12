import {IColModel} from './IColModel';
import {IPagination} from './IPagination';
import {ISourceConfiguration} from './ISourceConfiguration';

export interface IGridConfig {
        cols: Array<IColModel>;
        responsive: boolean;
        paging: boolean;
        colGroup: Array<Array<string>>;
        paginate: IPagination;
        gridData: any;
        serverSide: boolean;
        sourceConfig: ISourceConfiguration;
        multiSelect: boolean; // this will be used to provide checkbox at first column
    }
