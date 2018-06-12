import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-ng-data-table-pagination',
  templateUrl: './ng-data-table-pagination.component.html',
  styleUrls: ['./ng-data-table-pagination.component.scss']
})
export class NgDataTablePaginationComponent implements OnInit, OnChanges {
  @Input()
  pageNo: string;
  @Input()
  pageSize: number;
  @Input()
  totalRecords: number;
  @Output()
  onPageChange: EventEmitter<any> = new EventEmitter();
  get PageNo() {
    return parseInt(this.pageNo, 10);
  }
  set PageNo(value) {
    this.pageNo = value.toString();
  }
  page: number;
  constructor() { }
  ngOnInit() {
    this.page = this.PageNo;
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['pageNo']) {
      this.pageNo = changes['pageNo'].currentValue;
      this.page = this.PageNo;
    }
    if (changes['pageSize']) {
      this.pageSize = changes['pageSize'].currentValue;
    }
    if (changes['totalRecords']) {
      this.totalRecords = changes['totalRecords'].currentValue;
    }
  }
  get isLastPage(): boolean {
    return this.PageNo >= this.maxPage;
  }
  get maxPage(): number {
    return Math.ceil(this.totalRecords / this.pageSize) || 0;
  }
  get getMin(): number {
    return ((this.pageSize * this.PageNo) - this.pageSize) + 1;
  }
  get getMax(): number {
    let max = this.pageSize * this.PageNo;
    if (max > this.totalRecords) {
      max = this.totalRecords;
    }
    return max;
  }
  goToPage(pageNo: number) {
    if (pageNo > 0 && pageNo <= this.maxPage) {
      this.page = pageNo;
      this.onPageChange.emit({ pageNo: pageNo });
      event.stopPropagation();
    }
  }
  onChange() {
    if ( this.page <= this.maxPage && this.page > 0  && this.page !== this.PageNo) {
      this.goToPage(this.page);
    } else {
      this.page = this.PageNo;
    }
  }
  firstPage() {
    this.goToPage(1);
    event.stopPropagation();
  }
  lastPage() {
    this.goToPage(this.maxPage);
    event.stopPropagation();
  }
  nextPage() {
    this.goToPage(parseInt(this.pageNo, 10) + 1);
    event.stopPropagation();
  }
  previousPage() {
    this.goToPage(this.PageNo - 1);
    event.stopPropagation();
  }
  getPages(): number[] {
    const pages = [];
    pages.push(this.PageNo);
    for (let i = 0; i < 4; i++) {
      if (pages.length < 5) {
        if (Math.min.apply(null, pages) > 1) {
          pages.push(Math.min.apply(null, pages) - 1);
        }
        if (Math.max.apply(null, pages) < this.maxPage) {
          pages.push(Math.max.apply(null, pages) + 1);
        }
      }
    }
    pages.sort((a, b) => a - b);
    return pages;
  }
}
