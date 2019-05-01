using BizOS.Common.Contracts.DynamicGrid;
using BizOS.Base.BL;
using BizOS.Common.Contracts.DynamicGrid.Models;
using System;
using System.Threading.Tasks;

namespace BizOS.Common.BL.DynamicGrid
{
    public class DynamicGridComponent: BusinessComponent,IDynamicGridComponent
    {
        private IDynamicGridRepository dynamicGridRepository;

        public DynamicGridComponent(IServiceProvider provider): base(provider)
        {
        }

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
        public async Task<GridOutcome> GetDataAsync(string GridConfigId, GridDataRequest gridDataRequest)
        {
            return await DynamicGridRepository.GetDataAsync(GridConfigId, gridDataRequest);
        }

        public GridConfiguration GetGridConfig(string GridConfigId)
        {
            return DynamicGridRepository.GetGridConfig(GridConfigId);
        }

    }
}
