using BizOS.Common.Reflection;
using Dapper;
using BizOS.Base.Contracts.DataAccess;
using System;
using System.Collections.Generic;
using System.Data;
using BizOS.Common.Extensions;
using System.Linq;
using BizOS.Base.Contracts.Repository;
using SqlKata.Compilers;
using SqlKata.Execution;

namespace BizOS.Base.BL.DataAccess
{
    public abstract class BaseRepository : BusinessComponent, IBaseRepository
    {
        public BaseRepository(IServiceProvider container): base(container)
        {
        }
        private const string defaultDBProvider = "";
        private IDBProvider dbProvider = null;
        public IDBProvider DBProvider
        {
            get => dbProvider = dbProvider ?? GetBusinessComponent<IDBProvider>();
            set => dbProvider = value;
        }
        internal string DBProviderSetting
        {
            get => AppSettings.GetSection("AppSettings")["DBProvider"] ?? defaultDBProvider;
        }
        private IDbConnection connection { get; set; }
        protected IDbConnection Connection
        {
            get => connection = connection ?? DBProvider.GetConnection();
        }
        private IDatabaseOperators operators { get; set; }
        public IDatabaseOperators Operators {
            get => operators = operators ?? GetBusinessComponent<IDatabaseOperators>();
        }
        private IDbTransaction Transaction { get; set; }

        public Compiler QueryCompiler => DBProvider.QueryCompiler;

        public QueryFactory db => DBProvider.db;

        public bool BeginTransaction()
        {
            if (Transaction == null)
            {
                OpenConnection();
                Transaction = Connection.BeginTransaction();
            }
            return true;
        }
        public bool CommitTransaction()
        {
            Transaction.Commit();
            Connection.Close();
            Transaction = null;
            return true;
        }
        public bool RollbackTransaction()
        {

            Transaction.Rollback();
            Connection.Close();
            Transaction = null;
            return true;
        }
        public T Insert<T>(T tModel)
        {
            T createdObj = default(T);
            if (tModel != null)
            {
                List<T> objectList = Connection.Query<T>(DBProvider.GetInsertAndSelectQuery(tModel.GetTableName()), tModel).ToList();
                if (objectList.IsNotNullOrEmpty())
                {
                    createdObj = objectList.FirstOrDefault();
                }
            }
            return createdObj;
        }
        public bool InsertAll<T>(List<T> tModelList)
        {
            if (tModelList.IsNotNullOrEmpty())
            {
                Connection.Execute(DBProvider.GetInsertQuery(GetTableName<T>()), tModelList);
                return true;
            }
            return false;
        }
        public bool Delete<T>(object objPks)
        {
            if (objPks!=null)
            {
                Connection.Execute(DBProvider.GetDeleteQuery(GetTableName<T>()), objPks);
                return true;
            }
            return false;
        }
        public bool MarkAsDelete<T>(dynamic objPks)
        {
            if (objPks != null)
            {
                objPks.IsDeleted = "Y";
                objPks.DeletedBy = "UserName";
                objPks.DeletedOn = DateTime.Now;
                Connection.Execute(DBProvider.GetDeleteQuery(GetTableName<T>()),(object) objPks);
                return true;
            }
            return false;
        }
        public List<T> Query<T>(string sql, object param = null)
        {
            List<T> objectList = null;
            if (sql.IsNotNullOrEmpty())
            {
                objectList = Connection.Query<T>(sql, param).ToList();
            }
            return objectList;
        }
        public List<T> Query<T>(object objPks)
        {
            List<T> objectList = null;
            objectList = Connection.Query<T>(DBProvider.GetObjectQuery(GetTableName<T>()), objPks).ToList();
            return objectList;
        }
        public T Update<T>(T tModel)
        {
            T updatedObj = default(T);
            if (tModel != null)
            {
                List<T> objectList = Connection.Query<T>(DBProvider.GetUpdateQuery(tModel.GetTableName()), tModel).ToList();
                if (objectList.IsNotNullOrEmpty())
                {
                    updatedObj = objectList.FirstOrDefault();
                }
            }
            return updatedObj;
        }
        
        private void OpenConnection()
        {
            if (Connection.State == ConnectionState.Open)
                Connection.Close();

            Connection.Open();
        }
        private void CloseConnection()
        {
            if (Connection.State == ConnectionState.Open)
                Connection.Close();
        }
        private string GetTableName<T>()
        {
            Type type = typeof(T);
            return type.GetTableName();
        }
        #region "DBProvider Section"
        public IDbConnection GetConnection()
        {
            return DBProvider.GetConnection();
        }
        public IDbConnection GetConnection(string connectionString)
        {
            return DBProvider.GetConnection(connectionString);
        }
        public string GetInsertQuery(string tableName)
        {
            return DBProvider.GetInsertQuery(tableName);
        }
        public string GetInsertAndSelectQuery(string tableName)
        {
            return DBProvider.GetInsertAndSelectQuery(tableName);
        }
        public string GetMarkRowAsDeleteQuery(string tableName)
        {
            return DBProvider.GetMarkRowAsDeleteQuery(tableName);
        }
        public string GetUpdateQuery(string tableName)
        {
            return DBProvider.GetUpdateQuery(tableName);
        }
        public string GetDeleteQuery(string tableName)
        {
            return DBProvider.GetDeleteQuery(tableName);
        }
        public string GetObjectQuery(string tableName)
        {
            return DBProvider.GetObjectQuery(tableName);
        }
        public string Paginate(string query, PaginationSettings paginationSettings)
        {
            return DBProvider.Paginate(query, paginationSettings);
        }
        public string GetCountQuery(string query)
        {
            return DBProvider.GetCountQuery(query);
        }
        #endregion
    }
}
