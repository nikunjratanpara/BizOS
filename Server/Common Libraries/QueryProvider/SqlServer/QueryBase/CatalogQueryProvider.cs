using BizOS.Common.Contracts.Catalog.Models;
using QueryProvider.Contracts.Common;
using System.Text;

namespace QueryProvider.SqlServer.QueryBase
{
    public class CatalogQueryProvider : ICatalogQueryProvider
    {
        public string CatalogDictionary { get; }
        public CatalogQueryProvider()
        {
            CatalogDictionary = "select * from CatalogDictionary where CatalogId= @CatalogId";
        }
        public string BuildCatalogQuery(CatalogMetaData catalogDefination, CatalogRequest catalogRequest)
        {
            StringBuilder Query = new StringBuilder();
            Query.Append("Select ");
            Query.Append(catalogDefination.DisplayColumn);
            Query.Append(" as Description, ");
            Query.Append(catalogDefination.ValueColumn);
            Query.Append(" as Code ");
            Query.Append(" From ");
            Query.Append(catalogDefination.TableName);
            Query.Append(" Where ");
            if (!catalogRequest.Filter.SearchCodeOnly)
            {
                Query.Append(catalogDefination.DisplayColumn);
                Query.Append(" like @FilterValue");
                Query.Append(" Or ");
            }
            if (!catalogRequest.Filter.SearchDescriptionOnly)
            {
                Query.Append(catalogDefination.ValueColumn);
                Query.Append(" like @FilterValue");
                Query.Append(" Or ");
            }
            Query.Append(" @ShowAll = 1");
            return Query.ToString();
        }
    }
}
