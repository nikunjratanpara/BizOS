import { Observable } from 'rxjs';
export type ISearchService = (searchOptions: ISearchOptions ) => Observable<any[]>;
export type IObservableSearchService = (search$: Observable<{searchTerm: string, showAllOptions:boolean}>) =>  Observable<any[]>;
export interface ISearchOptions {searchTerm: string, showAllOptions:boolean};