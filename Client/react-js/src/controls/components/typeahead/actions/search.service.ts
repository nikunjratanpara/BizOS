import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import {
    IObservableSearchService, ISearchOptions, ISearchService
} from './models/search.service.model';

export const searchService = (service: ISearchService): IObservableSearchService => {
  return (search$: Observable<ISearchOptions>): Observable<any[]> => {
    return search$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((searchOptions: ISearchOptions) => searchOptions ? service(searchOptions) : of([])),
      catchError(error => of([]))
    );
  }
}

export const allOptionsService = (service: ISearchService): IObservableSearchService => {
  return (): Observable<any[]> => {
    return  service({ searchTerm: '', showAllOptions: true }).pipe(
      catchError( error=> of([]))
    );
  }
}