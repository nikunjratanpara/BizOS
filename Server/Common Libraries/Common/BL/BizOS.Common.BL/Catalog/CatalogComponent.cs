using BizOS.Common.Contracts.Catalog;
using BizOS.Common.Contracts.Catalog.Models;
using BizOS.Common.Extensions;
using BizOS.Base.BL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace BizOS.Common.BL.Catalog
{
    internal class CatalogComponent : BusinessComponent, ICatalogComponent
    {
        private ICatalogRepository catalogRepository;

        public CatalogComponent(IServiceProvider provider): base(provider)
        {
        }

        internal ICatalogRepository CatalogRepository
        {
            get { return catalogRepository = catalogRepository ?? GetRepository<ICatalogRepository>(); }
        }
        public List<CatalogData> GetCatalogData(CatalogRequest catalogRequest)
        {
            IEnumerable<CatalogData> CatalogData = null;
            if (catalogRequest != null && catalogRequest.Filter != null)
                CatalogData = CatalogRepository.GetCatalogData(catalogRequest);
            return CatalogData?.ToList();
        }

        public async Task<IEnumerable<CatalogData>> GetCatalogDataAsync(CatalogRequest catalogRequest)
        {
            Task<IEnumerable<CatalogData>> CatalogData = null;
            if (catalogRequest != null && catalogRequest.Filter != null)
                CatalogData = CatalogRepository.GetCatalogDataAsync(catalogRequest);
            return await CatalogData;
        }

        public CatalogMetaData GetCatalogMetaData(string catalogName)
        {
            CatalogMetaData catalogDefination = null;
            if (catalogName.IsNotNullOrEmpty())
                catalogDefination = CatalogRepository.GetCatalogMetaData(catalogName);
            return catalogDefination;
        }

        public async Task<CatalogMetaData> GetCatalogMetaDataAsync(string catalogName)
        {
            Task<CatalogMetaData> catalogDefination = null;
            if (catalogName.IsNotNullOrEmpty())
                catalogDefination = CatalogRepository.GetCatalogMetaDataAsync(catalogName);
            return await catalogDefination;
        }
    }
}
