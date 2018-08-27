using BizOS.Common.Contracts.Catalog.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BizOS.Common.Contracts.Catalog
{
    public interface ICatalogRepository
    {
        List<CatalogData> GetCatalogData(CatalogRequest catalogRequest);
        CatalogMetaData GetCatalogMetaData(string catalogId);
    }
}
