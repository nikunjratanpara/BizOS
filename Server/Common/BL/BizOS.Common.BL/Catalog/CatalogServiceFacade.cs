using BizOS.Common.Contracts.Catalog;
using BizOS.Base.BL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BizOS.Common.Contracts.Catalog.Models;

namespace BizOS.Common.BL.Catalog
{
    public class CatalogServiceFacade: BusinessComponent, ICatalogServiceFacade
    {
        ICatalogComponent catalogComponent;
        ICatalogComponent CatalogComponent
        {
            get { return catalogComponent = catalogComponent ?? GetBusinessComponent<ICatalogComponent>(); }
        }

        public List<CatalogData> GetCatalogData(CatalogRequest catalogRequest)
        {
            return CatalogComponent.GetCatalogData(catalogRequest);
        }

        public CatalogMetaData GetCatalogMetaData(string catalogName)
        {
            return CatalogComponent.GetCatalogMetaData(catalogName);
        }
    }
}
