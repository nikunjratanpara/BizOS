using BizOS.Common.Contracts.Catalog;
using BizOS.Common.Contracts.Catalog.Models;
using BizOS.Common.Contracts.Constants;
using BizOS.Base.BL.DataAccess;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Dapper;
using System;
using System.Threading.Tasks;
using QueryProvider.Contracts.Common;

namespace BizOS.Common.Repository.Catalog
{
    internal class CatalogRepository : BaseRepository, ICatalogRepository
    {
        public CatalogRepository(IServiceProvider provider): base(provider)
        {}
        private ICatalogQueryProvider _catalogQueryProvider;
        internal ICatalogQueryProvider CatalogQueryProvider
        {
            get
            {
                return _catalogQueryProvider = _catalogQueryProvider ?? GetBusinessComponent<ICatalogQueryProvider>();
            }
            set
            {
                _catalogQueryProvider = value;
            }
        }
        public IEnumerable<CatalogData> GetCatalogData(CatalogRequest catalogRequest)
        {
            string catalogFilterQuery = GetCatalogDataQuery(catalogRequest);
            return Connection.Query<CatalogData>(catalogFilterQuery, new { FilterValue = catalogRequest.Filter.Term , ShowAll = catalogRequest.Filter.ShowAll }).ToList();
        }
        public async Task<IEnumerable<CatalogData>> GetCatalogDataAsync(CatalogRequest catalogRequest)
        {
            string catalogFilterQuery = GetCatalogDataQuery(catalogRequest);
            return await Connection.QueryAsync<CatalogData>(catalogFilterQuery, new { FilterValue = catalogRequest.Filter.Term, ShowAll = catalogRequest.Filter.ShowAll });
        }

        private string GetCatalogDataQuery(CatalogRequest catalogRequest)
        {
            CatalogMetaData catalogDefination = GetCatalogMetaData(catalogRequest.CatalogId);
            string catalogFilterQuery = CatalogQueryProvider.BuildCatalogQuery(catalogDefination, catalogRequest);
            if (!catalogRequest.Filter.SearchExact)
                catalogRequest.Filter.Term = '%' + catalogRequest.Filter.Term + '%';
            return catalogFilterQuery;
        }

        public CatalogMetaData GetCatalogMetaData(string catalogId)
        {
            return Connection.QueryFirstOrDefault<CatalogMetaData>(CatalogQueryProvider.CatalogDictionary, new { CatalogId = catalogId });
        }
        public async Task<CatalogMetaData> GetCatalogMetaDataAsync(string catalogId)
        {
            return await Connection.QueryFirstOrDefaultAsync<CatalogMetaData>(CatalogQueryProvider.CatalogDictionary, new { CatalogId = catalogId });
        }
        
    }
}
