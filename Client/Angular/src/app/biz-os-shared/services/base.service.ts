import { Observable, throwError } from 'rxjs';
import { IHttpClientService } from './http.client.interface';
import { HttpClientService } from './http.client.service';

export class BaseService {
    protected baseUrl: string;
    protected httpClientService: IHttpClientService = new HttpClientService();
    protected getUrl(action: string): string {
        return this.baseUrl + (this.controller ? this.controller + '/' : '') + action;
    }
    protected appendBaseUrl(action: string): string {
        return this.baseUrl + action;
    }
    constructor(protected controller: string) {
       this.baseUrl = 'http://localhost:62336/api/';
    }
    protected handleError(error: Response) {
        console.dir(error);
        return throwError(error);
    }
}
