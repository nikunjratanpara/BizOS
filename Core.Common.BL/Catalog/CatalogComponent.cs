using Core.Common.Contracts.Catalog;
using Core.Common.Contracts.Catalog.Models;
using Core.Common.Extensions;
using Framework.Base.BL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Common.BL.Catalog
{
    internal class CatalogComponent : BusinessComponent, ICatalogComponent
    {
        private ICatalogRepository catalogRepository;
        internal ICatalogRepository CatalogRepository
        {
            get { return catalogRepository = catalogRepository ?? GetRepository<ICatalogRepository>(); }
        }
        public List<CatalogData> GetCatalogData(CatalogRequest catalogRequest)
        {
            List<CatalogData> CatalogData = null;
            if (catalogRequest != null && catalogRequest.Filter != null)
                CatalogData = CatalogRepository.GetCatalogData(catalogRequest);
            return CatalogData;
        }

        public CatalogMetaData GetCatalogMetaData(string catalogName)
        {
            CatalogMetaData catalogDefination = null;
            if (catalogName.IsNotNullOrEmpty())
                catalogDefination = CatalogRepository.GetCatalogMetaData(catalogName);
            return catalogDefination;
        }
    }
}
