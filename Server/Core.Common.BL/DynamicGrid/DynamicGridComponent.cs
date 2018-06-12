using Core.Common.Contracts.DynamicGrid;
using Framework.Base.BL;
using Core.Common.Contracts.DynamicGrid.Models;
using System.Collections.Generic;

namespace Core.Common.BL.DynamicGrid
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
