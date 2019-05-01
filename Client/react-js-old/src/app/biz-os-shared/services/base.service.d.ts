import { Observable } from 'rxjs';
import { IHttpClientService } from './http.client.interface';
export declare class BaseService {
    protected controller: string;
    protected baseUrl: string;
    protected httpClientService: IHttpClientService;
    protected getUrl(action: string): string;
    protected appendBaseUrl(action: string): string;
    constructor(controller: string);
    protected handleError(error: Response): Observable<never>;
}
