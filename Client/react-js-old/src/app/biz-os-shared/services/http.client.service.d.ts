import { IHttpClientService } from './http.client.interface';
import { Observable } from 'rxjs';
import { HttpRequest } from '../models/core/HttpRequest';
export declare class HttpClientService implements IHttpClientService {
    get<T>(httpRequest: HttpRequest): Observable<T>;
    request<T>(httpRequest: HttpRequest): Observable<T>;
    post<T>(httpRequest: HttpRequest): Observable<T>;
    put<T>(httpRequest: HttpRequest): Observable<T>;
    patch<T>(httpRequest: HttpRequest): Observable<T>;
    delete<T>(httpRequest: HttpRequest): Observable<T>;
    private createObservable;
}
