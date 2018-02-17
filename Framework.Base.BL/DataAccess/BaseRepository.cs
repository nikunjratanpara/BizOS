using Core.Common.Reflection;
using Dapper;
using Framework.Base.Contracts;
using Framework.Base.Contracts.DataAccess;
using System;
using System.Collections.Generic;
using System.Data;
using System.Runtime.Caching;
using Core.Common.Extensions;
using System.Linq;
namespace Framework.Base.BL.DataAccess
{
    public abstract class BaseRepository : BusinessComponent, IBaseRepository
    {
        private ObjectCache Catch = MemoryCache.Default;
        private IDBProvider dbProvider = null;
        public IDBProvider DBProvider
        {
            get => dbProvider = dbProvider ?? GetBusinessComponent<IDBProvider>("SqlServer");
            set
            {
                dbProvider = value;
            }
        }
        private string tableName { get; set; }
        public string TabelName { get => tableName; }
        private IDbConnection connection { get; set; }
        protected IDbConnection Connection
        {
            get => connection = connection ?? DBProvider.GetConnection();
        }
        private IDbTransaction Transaction { get; set; }

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

        public abstract object GetPocoObject<T>(T Model);

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
    }
}
