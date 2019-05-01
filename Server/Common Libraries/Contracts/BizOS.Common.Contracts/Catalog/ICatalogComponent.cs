using BizOS.Common.Contracts.Catalog.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BizOS.Common.Contracts.Catalog
{
    public interface ICatalogComponent
    {
        List<CatalogData> GetCatalogData(CatalogRequest catalogRequest);
        CatalogMetaData GetCatalogMetaData(string catalogName);

        Task<IEnumerable<CatalogData>> GetCatalogDataAsync(CatalogRequest catalogRequest);

        Task<CatalogMetaData> GetCatalogMetaDataAsync(string catalogName);
    }
}
