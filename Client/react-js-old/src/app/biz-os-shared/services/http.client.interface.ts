import { Observable } from 'rxjs';
import { HttpRequest } from '../models/core/HttpRequest';
export interface IHttpClientService {
    get<T>(request: HttpRequest): Observable<T>;
    request<T>(request: HttpRequest): Observable<T>;
    post<T>(request: HttpRequest): Observable<T>;
    put<T>(request: HttpRequest): Observable<T>;
    patch<T>(request: HttpRequest): Observable<T>;
    delete<T>(request: HttpRequest): Observable<T>;
}
