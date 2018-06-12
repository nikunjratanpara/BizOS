export interface IDateFormatOptions {
        /*
            d-date,d-1,dd-01,
            M-month,M-1, MM-01,MMM-Jan,MMMM-January
            y-year,yy-16,yyyy-2016,
            m-minute, 
            h:hour,
            s:second,
            f-ftractions
         */
        srcfmt?:string;
        datefmt:string;
        align:string;
}
