import { httpService } from 'src/services/base/http/http.services';

const formConfigApi = httpService('formConfig');
export function formConfig(config: string) {
    return formConfigApi.get({formConfig: config}, config);
}
export function saveForm(form:any) {
    return formConfigApi.post(form);
}