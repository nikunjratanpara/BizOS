import { ICatalogData } from './catalog.data.interface';


export interface ITypeaheadOptions {
    catId: string;
    displayStyle: ComboDisplayStyle;
    onSelect?: (item: ICatalogData) => {};
    filters?: string[];
    includeCols?: string[];
}

export enum ComboDisplayStyle {
    codeDesciption,
    description,
    code
}
