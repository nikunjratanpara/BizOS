using Core.Common.Contracts.DynamicForm.Models;
using System.Collections.Generic;

namespace Core.Common.Contracts.DynamicGrid.Models
{
    public class GridConfiguration
    {
        public int PageSize { get; set; }
        public string SearchConfigId { get; set; }
        public SourceConfiguration Source { get; set; }
        public List<GridColumnConfiguration> Cols { get; set; }
        public FormConfiguration SearchConfig { get; set; }
    }
}
