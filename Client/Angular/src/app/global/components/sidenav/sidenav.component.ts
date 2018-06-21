import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Subscription } from 'rxjs';
import { MenuConfig } from '../../models/menu.model';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {

  @Input()
  toggelMenu: BehaviorSubject<boolean>;
  config: MenuConfig[];
  /* = [
    {
      name: 'Catalog',
      children : [
        {
          name : 'State',
          component: ['/catalog', 'CatState']
        },
        {
          name : 'City',
          component: ['/catalog', 'CatCity']
        },
        {
          name : 'Country',
          component: ['/catalog', 'CatCountry']
        },
        {
          name : 'Currency',
          component: ['/catalog', 'CatCurrency']
        }

      ]
    },
  ];*/
  constructor(private menuService: MenuService) { }
  private visible: boolean;
  private subscription: Subscription;
  ngOnInit() {
    this.menuService.getMenues('Core').subscribe(menues => this.config = menues);
    this.subscription = this.toggelMenu.subscribe(visible => this.visible = visible);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onMenuClick() {
    this.toggelMenu.next(false);
  }

}
