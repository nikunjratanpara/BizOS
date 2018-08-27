using System.Collections.Generic;

namespace BizOS.Common.Contracts.DynamicGrid.Models
{
    public class GridDataRequest
    {
        public int PageNo { get; set; }
        public int PageSize { get; set; }
        public string OrderBy { get; set; }
        public Dictionary<string,object> Parameters { get; set; }
    }
}
