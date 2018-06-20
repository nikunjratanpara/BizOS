using BizOS.Common.Contracts.DynamicGrid.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BizOS.Common.Contracts.DynamicGrid
{
    public interface IDynamicGridComponent
    {
        GridConfiguration GetGridConfig(string GridConfigId);
        GridOutcome GetData(string GridConfigId, GridDataRequest gridDataRequest);
    }
}
