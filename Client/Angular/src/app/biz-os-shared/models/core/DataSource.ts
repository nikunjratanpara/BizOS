import { GridDataRequest } from "./GridDataRequest";
export interface DataSource {
    url: string;
    method: string;
    requestPayload: GridDataRequest;
}

