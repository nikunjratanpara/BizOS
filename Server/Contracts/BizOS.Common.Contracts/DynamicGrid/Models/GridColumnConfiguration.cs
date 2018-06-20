namespace BizOS.Common.Contracts.DynamicGrid.Models
{
    public class GridColumnConfiguration
    {
        public string DataField{ get; set; }
        public string DataType{ get; set; } //can be amount,number,date,string,boolean
        public string Header{ get; set; }
        public int ColSpan { get; set; }
        public string DefaultValue { get; set; }
        public string CssClass { get; set; }
        // public string NumberFormatter?: INumberFormatOptions;
        // public string DateFormatter?: IDateFormatOptions;
        public string Formatter { get; set; }
        public bool Sortable { get; set; }
        public string SortOrder { get; set; }
        public int Width { get; set; }
        public string Align { get; set; }
    }
}
