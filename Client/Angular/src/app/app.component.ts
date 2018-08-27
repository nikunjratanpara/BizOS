import { Component, Inject, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from './biz-os-shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(private _translate: TranslateService) {}
  ngOnInit() {
    this.selectLang('en-EN');
      console.log('Application component initialized ...');
  }
  selectLang(lang: string) {
    // set default;
    this._translate.use(lang);
  }
  toggelSideNav() {
  }
}
