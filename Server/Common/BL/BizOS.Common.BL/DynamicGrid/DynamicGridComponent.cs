using BizOS.Common.Contracts.DynamicGrid;
using BizOS.Base.BL;
using BizOS.Common.Contracts.DynamicGrid.Models;
using System.Collections.Generic;

namespace BizOS.Common.BL.DynamicGrid
{
    public class DynamicGridComponent: BusinessComponent,IDynamicGridComponent
    {
        private IDynamicGridRepository dynamicGridRepository;
        internal IDynamicGridRepository DynamicGridRepository
        {
            get
            {
                return dynamicGridRepository = dynamicGridRepository ?? GetBusinessComponent<IDynamicGridRepository>();
            }
            set
            {
                dynamicGridRepository = value;
            }
        }
        public GridOutcome GetData(string GridConfigId, GridDataRequest gridDataRequest)
        {
            return DynamicGridRepository.GetData(GridConfigId, gridDataRequest);
        }

        public GridConfiguration GetGridConfig(string GridConfigId)
        {
            return DynamicGridRepository.GetGridConfig(GridConfigId);
        }

    }
}
