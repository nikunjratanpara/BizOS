
using BizOS.Common.Contracts.Constants;
using QueryProvider.Contracts.Common;
using System.Collections.Generic;

namespace QueryProvider.SqlServer.QueryBase
{
    public class DynamicGridQueryProvider : IDynamicGridQueryProvider
    {
        public DynamicGridQueryProvider()
        { }

        public string GridConfiguration => "GridConfiguration";

        public string[] GridConfigurationColumns { get; } = new string[]
        {
            "GridConfigId",
            "PageSize",
            "SearchConfigId",
            "Url",
            "Method",
            "Params",
            "TableName",
            "ColumnList"
        };
        public string SqlSourceConfiguration => "SqlSourceConfiguration";

        public string[] SqlSourceConfigurationColumns { get; } = new string[]
        {
            "GridConfigId",
            "SqlQuery",
            "SqlSourceType",
            "Condition"
        };
        public string[] GridColumnConfigurationColumns { get; } = new string[]
         {
                "GridConfigId",
                "DataField",
                "DataType",
                "Header",
                "Formatter",
                "ColSpan",
                "DefaultValue",
                "CssClass",
                "Sortable",
                "SortOrder",
                "Width",
                "Align"
         };
        public string GridColumnConfiguration => "GridColumnConfiguration";

       
    }
}
