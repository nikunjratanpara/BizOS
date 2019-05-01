using BizOS.Common.Contracts.DynamicGrid;
using BizOS.Base.BL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BizOS.Common.Contracts.DynamicGrid.Models;


namespace BizOS.Common.BL.DynamicGrid
{
    public class DynamicGridFacade :BusinessComponent, IDynamicGridFacade
    {
        private IDynamicGridComponent dynamicGridComponent;

        public DynamicGridFacade(IServiceProvider provider): base(provider)
        {
        }

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
        public Task<GridOutcome> GetDataAsync(string GridConfigId, GridDataRequest gridDataRequest)
        {
            return DynamicGridComponent.GetDataAsync(GridConfigId, gridDataRequest);
        }

        public GridConfiguration GetGridConfig(string GridConfigId)
        {
            return DynamicGridComponent.GetGridConfig(GridConfigId);
        }
    }
}
