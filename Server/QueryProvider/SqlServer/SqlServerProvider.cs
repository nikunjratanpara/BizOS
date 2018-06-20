using Framework.Base.Contracts.DataAccess;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System;
using System.Runtime.Caching;
using Core.Common.Extensions;
using System.Text;
using Dapper;
using Framework.Base.BL;

namespace QueryProvider.SqlServer
{
    internal class SqlServerProvider :BusinessComponent, IDBProvider
    {
        private ObjectCache cache = MemoryCache.Default;
        private IDbConnection connection;
        const string Delete = "Delete";
        const string Insert = "Insert";
        const string Update = "Update";
        const string Select = "Select";
        private string queryProviderAlias;
        internal string QueryProviderAlias
        {
            get => queryProviderAlias ;
            set 
            {
                queryProviderAlias = value;
                QueryProvider = null;
            }
        }
        internal IDbConnection Connection
        {
            get
            {
                return connection = connection ?? GetConnection();
            }
        }
        private IQueryBase queryProvider = null;
        internal IQueryBase QueryProvider
        {
            get { return queryProvider = queryProvider ?? GetBusinessComponent<IQueryBase>(QueryProviderAlias);  }
            set { queryProvider = value;  }
        }
        #region "Connection"
        public IDbConnection GetConnection()
        {
            return GetConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"]?.ConnectionString);
        }
        public IDbConnection GetConnection(string connectionString)
        {
            if (connectionString.IsNullOrEmpty())
                throw new ConfigurationErrorsException("Invalid Connection String");

            return new SqlConnection(connectionString);
        }
        #endregion
        #region "Crude Query"
        public string GetDeleteQuery(string tableName)
        {
            string query = null;
            if (IsCatch)
            {
                query = cache.Get(Delete + tableName).ToString();
            }
            if (query.IsNullOrEmpty())
            {
                query = Connection.ExecuteScalar<string>($"Select dbo.GetDeleteQuery('{tableName}')");
                cache.Set(Delete + tableName, query, DateTimeOffset.MaxValue);
            }
            return query;
        }
        public string GetInsertQuery(string tableName)
        {
            string query = null;
            if (IsCatch)
            {
                query = cache.Get(Insert + tableName).ToString();
            }
            if (query.IsNullOrEmpty())
            {
                query = Connection.ExecuteScalar<string>($"Select dbo.GetInsertQuery('{tableName}')");
                cache.Set(Insert + tableName, query, DateTimeOffset.MaxValue);
            }
            return query;
        }
        public string GetInsertAndSelectQuery(string tableName)
        {
            string query = null;
            if (IsCatch)
            {
                query = cache.Get(Insert+ Select + tableName).ToString();
            }
            if (query.IsNullOrEmpty())
            {
                query = Connection.ExecuteScalar<string>($"Select dbo.GetInsertWithSelectQuery('{tableName}')");
                cache.Set(Insert + Select + tableName, query, DateTimeOffset.MaxValue);
            }
            return query;
        }
        public string GetMarkRowAsDeleteQuery(string tableName)
        {
            string query = null;
            if (IsCatch)
            {
                query = cache.Get(Delete + "Mark" + tableName).ToString();
            }
            if (query.IsNullOrEmpty())
            {
                query = Connection.ExecuteScalar<string>($"Select dbo.GetMarkRowAsDeleteQuery('{tableName}')");
                cache.Set(Delete + "Mark" + tableName, query, DateTimeOffset.MaxValue);
            }
            return query;
        }
        public string GetObjectQuery(string tableName)
        {
            string query = null;
            if (IsCatch)
            {
                query = cache.Get(Select + tableName).ToString();
            }
            if (query.IsNullOrEmpty())
            {
                query = Connection.ExecuteScalar<string>($"Select dbo.GetObjectQuery('{tableName}')");
                cache.Set(Select + tableName, query, DateTimeOffset.MaxValue);
            }
            return query;
        }
        public string GetUpdateQuery(string tableName)
        {
            string query = null;
            if (IsCatch)
            {
                query = cache.Get(tableName).ToString();
            }
            if (query.IsNullOrEmpty())
            {
                query = Connection.ExecuteScalar<string>($"Select dbo.GetUpdateQuery('{tableName}')");
                cache.Set(tableName, query, DateTimeOffset.MaxValue);
            }
            return query;
        }
        #endregion
        public void InitQueryProvider(string alias)
        {
            QueryProviderAlias = alias;
        }
        public string GetQuery(string code)
        {
            return QueryProvider.GetQuery(code);
        }
        public string Paginate(string query, PaginationSettings paginationSettings)
        {
            StringBuilder queryBuilder = new StringBuilder();
            queryBuilder.Append(query);
            queryBuilder.Append(" Order By ");
            queryBuilder.Append(paginationSettings.OrderBy);
            if (paginationSettings.PageNo > 0)
            {
                queryBuilder.Append(" OFFSET ");
                queryBuilder.Append(((paginationSettings.PageNo - 1) * paginationSettings.PageSize).ToString());
                queryBuilder.Append(" ROWS ");
                queryBuilder.Append(" FETCH FIRST ");
                queryBuilder.Append(paginationSettings.PageSize);
                queryBuilder.Append(" ROWS ONLY ");
            }
            return queryBuilder.ToString();
        }
        public string GetCountQuery(string query)
        {
            string countQuery = null;
            if (query.IsNotNullOrEmpty())
            {
                countQuery = "Select Count(1) " + query.Substring(query.ToLowerInvariant().IndexOf("from")).ReplaceMultipleSpaces();
                if (countQuery.ToLowerInvariant().IndexOf("order by") > 0)
                {
                    countQuery = countQuery.Substring(0, countQuery.ToLowerInvariant().IndexOf("order by"));
                }
            }
            return countQuery;
        }
        private bool IsCatch
        {
            get
            {
                return ConfigurationManager.AppSettings["UseCache"].IsNotNullOrEmpty() 
                    && Convert.ToBoolean(ConfigurationManager.AppSettings["UseCache"]);
            }
        }
    }
}
