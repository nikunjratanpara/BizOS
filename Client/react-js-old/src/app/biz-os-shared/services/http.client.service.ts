import { IHttpClientService } from './http.client.interface';
import * as request from 'superagent';
import { Observable } from 'rxjs';
import { DataSource } from '../models/core/DataSource';
import { HttpRequest } from '../models/core/HttpRequest';

export class HttpClientService implements IHttpClientService {
    public get<T>(httpRequest: HttpRequest): Observable<T> {
        let req: request.SuperAgentRequest = request.get(httpRequest.url);
        if (httpRequest.headers) {
            req =  req.set(httpRequest.headers);
        }
        if (httpRequest.queryParam) {
            req = req.query(httpRequest.queryParam);
        }
        return this.createObservable<T>(req, httpRequest);
    }
    public request<T>(httpRequest: HttpRequest): Observable<T> {
        return this[httpRequest.method.toLowerCase()](httpRequest);
    }

    public post<T>(httpRequest: HttpRequest): Observable<T> {
        let req: request.SuperAgentRequest = request.post(httpRequest.url).send(httpRequest.body);
        if (httpRequest.headers) {
            req =  req.set(httpRequest.headers);
        }
        return this.createObservable<T>(req, httpRequest);
    }
    public put<T>(httpRequest: HttpRequest) {
        let req: request.SuperAgentRequest = request.put(httpRequest.url).send(httpRequest.body);
        if (httpRequest.headers) {
            req =  req.set(httpRequest.headers);
        }
        return this.createObservable<T>(req, httpRequest);
    }

    public patch<T>(httpRequest: HttpRequest) {
        let req: request.SuperAgentRequest = request.patch(httpRequest.url).send(httpRequest.body);
        if (httpRequest.headers) {
            req =  req.set(httpRequest.headers);
        }
        return this.createObservable<T>(req, httpRequest);
    }

    public delete<T>(httpRequest: HttpRequest): Observable<T> {
        let req: request.SuperAgentRequest = request.put(httpRequest.url);
        if (httpRequest.body) {
            req = req.send(httpRequest.body);
        }
        if (httpRequest.queryParam) {
            req = req.query(httpRequest.queryParam);
        }
        if (httpRequest.headers) {
            req =  req.set(httpRequest.headers);
        }
        return this.createObservable<T>(req, httpRequest);
    }

    private createObservable<T>(req: request.SuperAgentRequest, httpRequest: HttpRequest): Observable<T> {
        return new Observable<T>(subscriber => {
            req
                .then(response => {
                    subscriber.next(response.body as T);
                    subscriber.complete();
                })
                .catch(error => {
                    subscriber.error(error);
                });
        });
    }
}
