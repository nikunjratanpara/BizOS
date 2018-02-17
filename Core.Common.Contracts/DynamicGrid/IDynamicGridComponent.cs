using Core.Common.Contracts.DynamicGrid.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Common.Contracts.DynamicGrid
{
    public interface IDynamicGridComponent
    {
        GridConfiguration GetGridConfig(string GridConfigId);
        GridOutcome GetData(string GridConfigId, Dictionary<string, object> parameters);
    }
}
