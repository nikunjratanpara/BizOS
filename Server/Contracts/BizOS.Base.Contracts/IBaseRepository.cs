using BizOS.Base.Contracts.DataAccess;
using System.Collections.Generic;

namespace BizOS.Base.Contracts
{
    public interface IBaseRepository : IDBProvider
    {
        /// <summary>
        /// This method will insert data and return new created object from database 
        /// </summary>
        /// <typeparam name="T">DTO Type</typeparam>
        /// <param name="tModel">Object to be inserted</param>
        /// <returns> newly created Object from database  </returns>
        T Insert<T>(T tModel);
        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T">DTO Type</typeparam>
        /// <param name="tModelList">Object list to be inserted</param>
        /// <returns>return true on successful insert of all object</returns>
        bool InsertAll<T>(List<T> tModelList);
        /// <summary>
        /// This method will update data and return updated object from database 
        /// </summary>
        /// <typeparam name="T">DTO Type</typeparam>
        /// <param name="tModel">Object to be updated</param>
        /// <returns> newly Updated Object from database  </returns>
        T Update<T>(T t);
        /// <summary>
        /// hard delete rows from table
        /// </summary>
        /// <typeparam name="T">DTO Type</typeparam>
        /// <param name="objPks">primary key column properties</param>
        /// <returns></returns>
        bool Delete<T>(object objPks);
        /// <summary>
        /// mark row as delete from table (update IsDeleted column to Y)
        /// </summary>
        /// <typeparam name="T">DTO Type</typeparam>
        /// <param name="objPks">primary key column properties</param>
        /// <returns></returns>
        bool MarkAsDelete<T>(dynamic objPks);
        /// <summary>
        /// retrieve data based on T-SQL Provided 
        /// </summary>
        /// <typeparam name="T">DTO Type</typeparam>
        /// <param name="sql">T-SQL to retrieve data</param>
        /// <param name="param">Parameters to be passed as Object properties </param>
        /// <returns>list of objects of type T</returns>
        List<T> Query<T>(string sql, object param = null);
        /// <summary>
        /// retrive data from table of Type DTO with condition on Primary Key.
        /// </summary>
        /// <typeparam name="T">DTO Type</typeparam>
        /// <param name="objPks">primary key column properties</param>
        /// <returns>list of object of type T </returns>
        List<T> Query<T>(object objPks);
        /// <summary>
        /// starts transaction
        /// </summary>
        /// <returns></returns>
        bool BeginTransaction();
        /// <summary>
        /// Commit transaction if any exists
        /// </summary>
        /// <returns></returns>
        bool CommitTransaction();
        /// <summary>
        /// Commit transaction if any exists
        /// </summary>
        /// <returns></returns>
        bool RollbackTransaction();
    }
}
