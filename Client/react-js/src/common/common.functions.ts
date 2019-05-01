export const isFunction = (func: any): boolean => {
    return typeof func === 'function';
}

const baseUrl = 'http://localhost:3004/';

export function getUrl(partialUrl: string) {
    return baseUrl + partialUrl;
}