export interface ICatalogRequest {
    catalogId: string;
    filter: ICatalogFilterOptions;
}

export interface ICatalogFilterOptions {
    term: string;
    showAll: boolean;
    searchExact?: boolean;
    searchCodeOnly?: boolean;
    searchDescriptionOnly?: boolean;
}
