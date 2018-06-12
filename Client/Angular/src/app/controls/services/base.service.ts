import { Observable } from 'rxjs/Observable';
export class BaseService {
    protected baseUrl: string;
    protected getUrl(action: string): string {
        return this.baseUrl + (this.controller ? this.controller + '/' : '') + action;
    }
    protected appendBaseUrl(action: string): string {
        return this.baseUrl+ action;
    }
    constructor(protected controller: string) {
       this.baseUrl = 'http://localhost:63693/api/';
    }
    protected handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}
