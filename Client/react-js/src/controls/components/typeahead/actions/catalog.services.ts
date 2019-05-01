import { Observable } from 'rxjs';

import { get, getHttpRequest } from '../../../../services/base/http/http.services';
import { ISearchOptions } from './models/search.service.model';

export const catalogSearch = (catalogName:string) : (searchOptions: ISearchOptions ) => Observable<any[]>  => {
  if(!catalogName.trim()) {
    throw new Error('catalogName required');
  }
   const controller = catalogName.trim();
  return (searchOptions: ISearchOptions ) : Observable<any[]> => {
    return get(getHttpRequest(controller)(searchOptions))
  }
}
