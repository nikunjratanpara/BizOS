import {Component,Input,Output,OnInit,EventEmitter} from '@angular/core';

@Component({
    selector:'as-pagination',
    template:`
    <div class="row">
        <div class="col-md-6"></div>
        <div class="col-md-6">
            <div class="col-md-4">
                <div class="col-md-4"> Page </div>
                <div class="col-md-8"> <input class="form-control input-sm ng-pristine ng-invalid ng-touched" (change)="goToPage($event)" [value]="currentPage"  /> </div>
                
            </div>
            <div class="col-md-4">
                <span>
                       {{startIndex}} - {{endIndex}}  of {{totalItems}} Records
                </span>
            </div>
            <div class="col-md-4">
                <button class="btn btn-sm btn-info" (click)="navigateToPage(1)" [disabled]="isFirstPage()" >
                    <i class="fa fa-angle-double-left" aria-hidden="true"></i>
                </button>
                <button class="btn btn-sm btn-info" (click)="navigateToPage(currentPage-1)" [disabled]="isFirstPage()" >
                    <i class="fa fa-angle-left" aria-hidden="true"></i>
                </button>
                <button class="btn btn-sm btn-info" (click)="navigateToPage(currentPage+1)" [disabled]="isLastPage()">
                    <i class="fa fa-angle-right" aria-hidden="true"></i>
                </button>
                <button class="btn btn-sm btn-info" (click)="navigateToPage(lastPageNo())" [disabled]="isLastPage()">
                    <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    </div>
    `
})
export class PaginationComponent {
    @Input() maxSize:number; 
    @Input() boundaryLinks:boolean; 
    @Input() totalItems:number; 
    @Input() pageSize:number;

    @Output() pageChanged = new EventEmitter();

    currentPage:number;
    get startIndex():number {
        return (this.currentPage-1)*this.pageSize+1;
    }
    get endIndex():number {
        return this.currentPage*this.pageSize>this.totalItems?this.totalItems:this.currentPage*this.pageSize;
    }
    constructor() {
        this.currentPage=1;
    }
    goToPage(event:any) {
        if(event && !this.isValidPageNo(event.target.value)){
            event.target.value=this.currentPage;
            return;
        }
        this.navigateToPage(event.target.value);
    }
    navigateToPage(pageNo:string){
        this.currentPage = parseInt(pageNo,10);
        let event:any={};
        event.page=this.currentPage;
        event.itemsPerPage=this.pageSize;
        this.pageChanged.emit(event);
    }
    isValidPageNo(pageNo:number):boolean {
        return !isNaN(pageNo) && pageNo<=this.lastPageNo() && pageNo>=0;
    }
    isFirstPage():boolean{
        return this.currentPage==1;
    }
    isLastPage():boolean{
       return  this.totalItems<=this.currentPage*this.pageSize;
    }
    onPageChanged(event:any) {
        ++this.currentPage;
        event.page=this.currentPage;
        event.itemsPerPage=this.pageSize;
        this.pageChanged.emit(event);
    }
    lastPageNo():number{
        return this.totalItems/this.pageSize;
    }
}
