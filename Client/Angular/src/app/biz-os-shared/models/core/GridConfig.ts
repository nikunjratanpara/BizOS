import {ColModel} from './ColModel';
import {Pagination} from './Pagination';
import {SourceConfiguration} from './SourceConfiguration';

export interface GridConfig {
        cols: Array<ColModel>;
        responsive: boolean;
        paging: boolean;
        colGroup: Array<Array<string>>;
        paginate: Pagination;
        gridData: any;
        serverSide: boolean;
        sourceConfig: SourceConfiguration;
        multiSelect: boolean; // this will be used to provide checkbox at first column
    }
