﻿using BizOS.Base.Contracts.Component;
using SqlKata;
using SqlKata.Compilers;
using SqlKata.Execution;
using System.Data;


namespace BizOS.Base.Contracts.DataAccess
{
    public interface IDBProvider : IBusinessComponent
    {
        IDbConnection GetConnection();
        IDbConnection GetConnection(string connectionString);
        string GetInsertQuery(string tableName);
        string GetInsertAndSelectQuery(string tableName);
        string GetMarkRowAsDeleteQuery(string tableName);
        string GetUpdateQuery(string tableName);
        string GetDeleteQuery(string tableName);
        string GetObjectQuery(string tableName);
        string Paginate(string query, PaginationSettings paginationSettings);
        string GetCountQuery(string query);
        Compiler QueryCompiler { get; }

        QueryFactory db { get; }
        // string GetInsertQueryWithParameters(string tableName, List<string> columns);
        // string GetUpdateQueryWithParameters(string tableName, List<string> columns, List<string> conditionColumns);
    }
}
