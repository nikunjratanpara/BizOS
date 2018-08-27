import { CatalogFilterOption } from "./CatalogFilterOption";
export interface CatalogRequest {
    catalogId: string;
    filter: CatalogFilterOption;
}