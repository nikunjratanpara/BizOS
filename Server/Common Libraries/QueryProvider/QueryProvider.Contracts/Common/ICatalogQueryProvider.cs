using BizOS.Common.Contracts.Catalog.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace QueryProvider.Contracts.Common
{
    public interface ICatalogQueryProvider
    {
        string CatalogDictionary { get; }
        string BuildCatalogQuery(CatalogMetaData catalogDefination, CatalogRequest catalogRequest);
    }
}
