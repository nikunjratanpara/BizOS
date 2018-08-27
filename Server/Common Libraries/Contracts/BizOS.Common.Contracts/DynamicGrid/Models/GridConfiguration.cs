using BizOS.Common.Contracts.DynamicForm.Models;
using System.Collections.Generic;

namespace BizOS.Common.Contracts.DynamicGrid.Models
{
    public class GridConfiguration
    {
        public int PageSize { get; set; }
        public string SearchConfigId { get; set; }
        public SourceConfiguration Source { get; set; }
        public List<GridColumnConfiguration> Columns { get; set; }
        public FormConfiguration SearchConfig { get; set; }
    }
}
