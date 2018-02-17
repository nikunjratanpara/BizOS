using Framework.Base.Contracts.DataAccess;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System;
using System.Runtime.Caching;
using Core.Common.Extensions;
using Dapper;
namespace Framework.Base.BL.DataAccess
{
    internal class SqlServerProvider : IDBProvider
    {
        private ObjectCache cache = MemoryCache.Default;
        private IDbConnection connection;
        const string Delete = "Delete";
        const string Insert = "Insert";
        const string Update = "Update";
        const string Select = "Select";
        internal IDbConnection Connection
        {
            get
            {
                return connection = connection ?? GetConnection();
            }
        }
        #region "Connection"
        public IDbConnection GetConnection()
        {
            return GetConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"]?.ConnectionString);
        }

        public IDbConnection GetConnection(string connectionString)
        {
            if (string.IsNullOrEmpty(connectionString) || string.IsNullOrWhiteSpace(connectionString))
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
