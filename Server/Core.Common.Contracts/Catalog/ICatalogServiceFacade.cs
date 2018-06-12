using Core.Common.Contracts.Catalog.Models;
using System.Collections.Generic;

namespace Core.Common.Contracts.Catalog
{
    public interface ICatalogServiceFacade
    {
        List<CatalogData> GetCatalogData(CatalogRequest catalogRequest);
        CatalogMetaData GetCatalogMetaData(string catalogName);
    }
}
