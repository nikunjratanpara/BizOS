import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { isFunction } from '../../../controls/utils/util';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  @Output()
  menuClick: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  onMenuClick() {
    this.menuClick.emit('');
  }
}
