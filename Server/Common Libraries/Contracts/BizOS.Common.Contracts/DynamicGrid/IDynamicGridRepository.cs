using BizOS.Common.Contracts.DynamicGrid.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BizOS.Common.Contracts.DynamicGrid
{
    public interface IDynamicGridRepository
    {
        GridConfiguration GetGridConfig(string GridConfigId);
        Task<GridOutcome> GetDataAsync(string GridConfigId, GridDataRequest gridDataRequest);
    }
}
