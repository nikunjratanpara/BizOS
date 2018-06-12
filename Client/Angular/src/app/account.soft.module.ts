import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CatalogFormComponent } from './global/components/catalog-form/catalog-form.component';
import { DynamicFormModule } from './controls/dynamic-form.module';
import { SidenavComponent } from './global/components/sidenav/sidenav.component';
import { DataTableModule } from './datatable/data-table.module';
import { TopNavComponent } from './global/components/top-nav/top-nav.component';
import { MainContentComponent } from './global/components/main-content/main-content.component';
import { MenuComponent } from './global/components/menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuService } from './global/services/menu.service';

const routes = [
  { path: 'catalog/:id', component: CatalogFormComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    DynamicFormModule,
    DataTableModule
  ],
  declarations: [
   AppComponent,
   SidenavComponent,
   CatalogFormComponent,
   TopNavComponent,
   MainContentComponent,
   MenuComponent
  ],
  providers: [
    {useClass: MenuService, provide: MenuService}
  ],
  exports : [
  ],
  bootstrap : [AppComponent]
})
export class AccountSoftModule { }
