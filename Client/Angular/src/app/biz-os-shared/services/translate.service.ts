import CalenderI18n from '../i18N/CalenderI18n';
import I18N from "../i18N/I18N";
import { BaseService } from './base.service';
import { HttpClientService } from './http.client.service';
import { IHttpClientService } from './http.client.interface';

export class TranslateService {
    private _currentLang: string;
    private i18n: I18N;
    private httpClientService: IHttpClientService = new HttpClientService();
    public get currentLang() {
        return this._currentLang;
    }
    // inject our translations
    constructor() {
    }

    public use(lang: string): void {
        // set current language
        this._currentLang = lang;
        this.httpClientService.get<I18N>({url: `assets/i18n/${this._currentLang}.lang.json`}).
            subscribe((langOptions: any) => {
                this.i18n = langOptions;
                console.dir(this.i18n);
            });
    }

    public instant(key: string) {
        // public perform translation
        return this.translate(key);
    }
    public getCalenderI18n(): CalenderI18n {
        return this.i18n.calender;
    }
    public format(key: string, ...placehoders: any[]) {
        const translate = this.translate(key);
        const regEx = new RegExp('{-?[0-9]+}', 'g');
        return translate.replace(regEx, (item): string => {
            let replace;
            const intVal = parseInt(item.substring(1, item.length - 1), 10);
            if (intVal >= 0) {
                replace = placehoders[intVal];
            } else if (intVal === -1) {
                replace = '{';
            } else if (intVal === -2) {
                replace = '}';
            }
            return replace;
        });
    }
    private translate(key: string): string {
        // private perform translation
        let translation = key;

        if (this.i18n && this.i18n.token && this.i18n.token[key]) {
            translation = this.i18n.token[key];
        }

        return translation;
    }
}
