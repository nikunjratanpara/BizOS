import { MenuConfig } from '../models/menu.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { BaseService } from '../../biz-os-shared';
export interface IMenuService {
    getMenues(moduleId: string): Observable<MenuConfig[]>;
}
@Injectable()
export class MenuService extends BaseService implements IMenuService {
    constructor(private httpClient: HttpClient) {
        super('');
    }
    getMenues(moduleId: string): Observable<MenuConfig[]> {
      return this.httpClient.get<MenuConfig[]>(this.getUrl(moduleId + '/menu')).pipe(catchError(this.handleError));
    }
}
