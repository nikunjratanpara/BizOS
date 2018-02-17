using Core.Common.Contracts.Catalog;
using Core.Common.Contracts.Catalog.Models;
using Framework.Base.BL.DataAccess;
using System.Linq;
using System.Collections.Generic;
using System.Text;

namespace Core.Common.Repository.Catalog
{
    internal class CatalogRepository : BaseRepository, ICatalogRepository
    {
        public List<CatalogData> GetCatalogData(CatalogRequest catalogRequest)
        {
            CatalogMetaData catalogDefination = GetCatalogMetaData(catalogRequest.CatalogId);
            string catalogFilterQuery = BuildCatalogQuery(catalogDefination, catalogRequest);
            if (!catalogRequest.Filter.SearchExact)
                catalogRequest.Filter.Term = '%' + catalogRequest.Filter.Term + '%';
            return Query<CatalogData>(catalogFilterQuery, new { FilterValue = catalogRequest.Filter.Term , ShowAll = catalogRequest.Filter.ShowAll });
        }

        public CatalogMetaData GetCatalogMetaData(string catalogId)
        {
            return Query<CatalogMetaData>("select * from CatalogDictionary where CatalogId= @CatalogId", new { CatalogId = catalogId }).FirstOrDefault();
        }
        public override object GetPocoObject<T>(T Model)
        {
            return Model;
        }
        private string BuildCatalogQuery(CatalogMetaData catalogDefination, CatalogRequest catalogRequest)
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
