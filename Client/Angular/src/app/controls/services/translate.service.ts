import { Injectable, Inject, forwardRef } from '@angular/core';
import { I18N, CalenderI18n } from '../i18N/calenderi18n.model';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TranslateService {
	private _currentLang: string;
	private i18n: I18N;
	public get currentLang() {
		return this._currentLang;
	}

	// inject our translations
	constructor(private httpClient: HttpClient) {
	}

	public use(lang: string): void {
		// set current language
		this._currentLang = lang;
		this.httpClient.get<I18N>(`assets/i18n/${this._currentLang}.lang.json`).
		subscribe((langOptions) => {
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
	public format(key, ...placehoders) {
		const translate = this.translate(key);
		const regEx = new RegExp('{-?[0-9]+}', 'g');
		return translate.replace(regEx, (item): string => {
			let replace;
			const intVal = parseInt(item.substring(1, item.length - 1), 10);
			if (intVal >= 0) {
				replace = placehoders[intVal];
			} else if ( intVal === -1) {
				replace = '{';
			} else if ( intVal === -2 ) {
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
