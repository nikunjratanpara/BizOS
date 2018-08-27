import { ComboDisplayStyle, CatalogData } from '.';
export interface TypeaheadOptions {
    catId: string;
    displayStyle: ComboDisplayStyle;
    onSelect?: (item: CatalogData) => {};
    filters?: string[];
    includeCols?: string[];
}

