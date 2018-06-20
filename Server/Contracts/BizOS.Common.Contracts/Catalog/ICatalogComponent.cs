using BizOS.Common.Contracts.Catalog.Models;
using System.Collections.Generic;

namespace BizOS.Common.Contracts.Catalog
{
    public interface ICatalogComponent
    {
        List<CatalogData> GetCatalogData(CatalogRequest catalogRequest);
        CatalogMetaData GetCatalogMetaData(string catalogName);
    }
}
