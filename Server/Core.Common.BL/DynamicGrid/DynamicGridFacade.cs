using Core.Common.Contracts.DynamicGrid;
using Framework.Base.BL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Common.Contracts.DynamicGrid.Models;

namespace Core.Common.BL.DynamicGrid
{
    public class DynamicGridFacade :BusinessComponent, IDynamicGridFacade
    {
        private IDynamicGridComponent dynamicGridComponent;
        internal IDynamicGridComponent DynamicGridComponent
        {
            get
            {
                return dynamicGridComponent = dynamicGridComponent ?? GetBusinessComponent<IDynamicGridComponent>();
            }
            set
            {
                dynamicGridComponent = value;
            }
        }
        public GridOutcome GetData(string GridConfigId, GridDataRequest gridDataRequest)
        {
            return DynamicGridComponent.GetData(GridConfigId, gridDataRequest);
        }

        public GridConfiguration GetGridConfig(string GridConfigId)
        {
            return DynamicGridComponent.GetGridConfig(GridConfigId);
        }
    }
}
