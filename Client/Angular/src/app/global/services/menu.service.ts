import { MenuConfig } from '../models/menu.model';
import { Observable } from 'rxjs/Observable';
import { BaseService } from '../../controls/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
export interface IMenuService {
    getMenues(moduleId: string): Observable<MenuConfig[]>;
}
@Injectable()
export class MenuService extends BaseService implements IMenuService {
    constructor(private httpClient: HttpClient) {
        super('');
    }
    getMenues(moduleId: string): Observable<MenuConfig[]> {
      return this.httpClient.get<MenuConfig[]>(this.getUrl(moduleId + '/menu')).catch(this.handleError);
    }
}
