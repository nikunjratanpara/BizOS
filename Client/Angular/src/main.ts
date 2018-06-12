import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { AccountSoftModule } from './app/account.soft.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AccountSoftModule);
