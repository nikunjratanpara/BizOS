export interface IHttpRequest {
    url: string;
    method?: string;
    headers?: {
        [param: string]: string;
    };
    body?: any;
    queryParam?: any;
}