using System.Collections.Generic;
using System.Data;


namespace Framework.Base.Contracts.DataAccess
{
    public interface IDBProvider
    {
        IDbConnection GetConnection();
        IDbConnection GetConnection(string connectionString);
        string GetInsertQuery(string tableName);
        string GetInsertAndSelectQuery(string tableName);
        string GetMarkRowAsDeleteQuery(string tableName);
        string GetUpdateQuery(string tableName);
        string GetDeleteQuery(string tableName);
        string GetObjectQuery(string tableName);

        // string GetInsertQueryWithParameters(string tableName, List<string> columns);
        // string GetUpdateQueryWithParameters(string tableName, List<string> columns, List<string> conditionColumns);
    }
}
