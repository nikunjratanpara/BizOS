export interface HttpRequest {
    url: string;
    method?: string;
    headers?: {
        [param: string]: string;
    };
    body?: any;
    queryParam?: any;
}