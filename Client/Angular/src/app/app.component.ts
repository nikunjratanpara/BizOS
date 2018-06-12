import { Component, Inject, OnInit } from '@angular/core';
import { TranslateService } from './controls/services/translate.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  toggelMenu: BehaviorSubject<boolean> = new BehaviorSubject(false);
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
    this.toggelMenu.next(!this.toggelMenu.getValue());
  }
}
