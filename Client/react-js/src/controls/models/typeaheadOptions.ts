import { CatalogData, ComboDisplayStyle } from './';

export class TypeaheadOptions {
    public catId: string;
    public displayStyle: ComboDisplayStyle;
    public onSelect?: (item: CatalogData) => {};
    public filters?: string[];
    public includeCols?: string[];
}

