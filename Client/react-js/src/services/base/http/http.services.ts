import { Observable, Subscriber } from 'rxjs';
import { IHttpRequest } from '../models/http.request';

const baseUrl = 'http://localhost:3004/';
const getUrl = (partialUrl: string) => {
    return baseUrl + partialUrl;
}
export function httpService (controller:string) {
    const httpRequests = {
        delete : deleteHttpRequest(controller),
        get : getHttpRequest(controller),
        patch : patchHttpRequest(controller),
        post: postHttpRequest(controller)        
    }
    const restApis = {
        delete : (params: any, action?: string) => {
            return deleteReq(httpRequests.delete(params,action))
        },
        get : (params: any, action?: string) => {
            return get(httpRequests.get(params,action))
        },
        patch :(params: any, action?: string) => {
            return patch(httpRequests.patch(params,action))
        },
        post: (params: any, action?: string) => {
            return post(httpRequests.post(params,action))
        },
        request: (method:string,params:any, actions?:string) => {
            return restApis[method](params,actions);
        }
    }
    return restApis;
}
export const getHttpRequest = (controller: string) => {
    return baseHttpRequest('get')(controller);
}
export const postHttpRequest = (controller: string) => {
    return baseHttpRequest('post')(controller);
}
export const deleteHttpRequest = (controller: string) => {
    return baseHttpRequest('delete')(controller);
}
export const patchHttpRequest = (controller: string) => {
    return baseHttpRequest('patch')(controller);
}

export function get<T>(httpRequest: IHttpRequest): Observable<T> {
    return createObservable<T>(httpRequest);
}
export function post<T>(httpRequest: IHttpRequest): Observable<T> {
    return createObservable<T>(httpRequest);
}
export function put<T>(httpRequest: IHttpRequest) {
    return createObservable<T>(httpRequest);
}

export function patch<T>(httpRequest: IHttpRequest) {
    return createObservable<T>(httpRequest);
}

export function deleteReq<T>(httpRequest: IHttpRequest): Observable<T> {
    return createObservable<T>(httpRequest);
}
const baseHttpRequest = (method: string) => {
    return (controller: string) => {
        return (params: any, action?: string) => {
            const partialUrl: string = controller + '/' + (action ? action : '');
            const bodyParam = method.toLowerCase() === 'get' ? 'body' : 'body';
            const httpRequest = {
                method,
                url: getUrl(partialUrl),
            } as IHttpRequest;
            httpRequest[bodyParam] = params;
            return httpRequest;
        }
    }
}

function createObservable<T>(httpRequest: IHttpRequest): Observable<T> {
    let bodyData: string | null = null;
    let headers: { [param: string]: string;}  = {... httpRequest.headers}; 
    if(httpRequest.body) {
        bodyData =JSON.stringify(httpRequest.body);
        headers = {...headers, ...{
            'Content-Length': bodyData.length.toString(),
            'Content-Type': 'application/json'
        }};
    }
    const requestInit = {
        body:  httpRequest.method !== 'get' ?  bodyData : null,
        headers : {...headers},
        method : httpRequest.method
    };
    const request = new Request(httpRequest.url, requestInit );
    
    const deffered = fetch(request).then(response => response.json());
    return new Observable((observer: Subscriber<T>) => {
        deffered.then(data=> observer.next(data),error=> observer.error(error)).then(() => observer.complete());
    });
}