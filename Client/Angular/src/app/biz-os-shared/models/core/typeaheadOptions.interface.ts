import { CatalogData } from './CatalogData';
import { ComboDisplayStyle } from './common.enums';


export interface TypeaheadOptions {
    catId: string;
    displayStyle: ComboDisplayStyle;
    onSelect?: (item: CatalogData) => {};
    filters?: string[];
    includeCols?: string[];
}


