using System.Collections.Generic;

namespace Core.Common.Contracts.DynamicGrid.Models
{
    public class GridRequest
    {
        public int PageNo { get; set; }
        public int PageSize { get; set; }
        public Dictionary<string,string> parameters { get; set; }
    }
}
