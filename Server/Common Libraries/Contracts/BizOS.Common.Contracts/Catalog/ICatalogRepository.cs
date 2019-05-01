using BizOS.Common.Contracts.Catalog.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BizOS.Common.Contracts.Catalog
{
    public interface ICatalogRepository
    {
        IEnumerable<CatalogData> GetCatalogData(CatalogRequest catalogRequest);
        CatalogMetaData GetCatalogMetaData(string catalogId);

        Task<IEnumerable<CatalogData>> GetCatalogDataAsync(CatalogRequest catalogRequest);
        Task<CatalogMetaData> GetCatalogMetaDataAsync(string catalogId);
    }
}
