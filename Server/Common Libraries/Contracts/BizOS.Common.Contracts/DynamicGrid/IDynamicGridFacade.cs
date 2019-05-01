using BizOS.Common.Contracts.DynamicGrid.Models;
using System.Threading.Tasks;

namespace BizOS.Common.Contracts.DynamicGrid
{
    public interface IDynamicGridFacade
    {
        GridConfiguration GetGridConfig(string GridConfigId);
        Task<GridOutcome> GetDataAsync(string GridConfigId, GridDataRequest gridDataRequest);
    }
}
