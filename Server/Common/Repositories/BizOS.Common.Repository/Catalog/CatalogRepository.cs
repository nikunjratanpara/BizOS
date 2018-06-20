using BizOS.Common.Contracts.Catalog;
using BizOS.Common.Contracts.Catalog.Models;
using BizOS.Common.Contracts.Constants;
using BizOS.Base.BL.DataAccess;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Dapper;
namespace BizOS.Common.Repository.Catalog
{
    internal class CatalogRepository : BaseRepository, ICatalogRepository
    {
        public CatalogRepository() : base(QueryProviders.Catalog)
        {
        }

        public List<CatalogData> GetCatalogData(CatalogRequest catalogRequest)
        {
            CatalogMetaData catalogDefination = GetCatalogMetaData(catalogRequest.CatalogId);
            string catalogFilterQuery = BuildCatalogQuery(catalogDefination, catalogRequest);
            if (!catalogRequest.Filter.SearchExact)
                catalogRequest.Filter.Term = '%' + catalogRequest.Filter.Term + '%';
            return Connection.Query<CatalogData>(catalogFilterQuery, new { FilterValue = catalogRequest.Filter.Term , ShowAll = catalogRequest.Filter.ShowAll }).ToList();
        }

        public CatalogMetaData GetCatalogMetaData(string catalogId)
        {
            string sql = GetQuery("CatalogDictionary");
            return Connection.Query<CatalogMetaData>(sql, new { CatalogId = catalogId }).FirstOrDefault();
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
