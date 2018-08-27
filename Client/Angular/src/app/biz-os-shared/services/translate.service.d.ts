import CalenderI18n from '../i18N/CalenderI18n';
export declare class TranslateService {
    private _currentLang;
    private i18n;
    private httpClientService;
    readonly currentLang: string;
    constructor();
    use(lang: string): void;
    instant(key: string): string;
    getCalenderI18n(): CalenderI18n;
    format(key: string, ...placehoders: any[]): string;
    private translate;
}
