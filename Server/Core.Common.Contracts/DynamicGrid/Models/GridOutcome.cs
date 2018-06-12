using System.Collections.Generic;

namespace Core.Common.Contracts.DynamicGrid.Models
{
    public class GridOutcome
    {
        public int TotalPage { get; set; }
        public int TotalRecords { get; set; }
        public int PageNo { get; set; }
        public List<dynamic> ResultSet { get; set; }
    }
}
