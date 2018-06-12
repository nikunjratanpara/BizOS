using Core.Common.Contracts.DynamicGrid.Models;
using System.Collections.Generic;

namespace Core.Common.Contracts.DynamicGrid
{
    public interface IDynamicGridRepository
    {
        GridConfiguration GetGridConfig(string GridConfigId);
        GridOutcome GetData(string GridConfigId,GridDataRequest gridDataRequest);
    }
}
