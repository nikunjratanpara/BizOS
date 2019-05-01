export interface DataRequestModel {
    pageNo: number;
    pageSize: number;
    search: any;
    sort?: string;
    sortOrder?: string;
}