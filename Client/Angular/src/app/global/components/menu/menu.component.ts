import { Component, OnInit, Input, OnChanges,SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MenuConfig } from '../../models/menu.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input()
  config: MenuConfig;
  @Input()
  toggelMenu: BehaviorSubject<boolean>;
  constructor(private router: Router) { }
  showChildren: boolean;
  ngOnInit() {
  }
  navigateTo(menuConfig:  MenuConfig) {
    this.toggelMenu.next(false);
   this.router.navigate(menuConfig.component);
    event.stopPropagation();
  }


}
