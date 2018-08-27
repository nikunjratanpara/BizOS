export interface CatalogFilterOption {
    term: string;
    showAll: boolean;
    searchExact?: boolean;
    searchCodeOnly?: boolean;
    searchDescriptionOnly?: boolean;
}