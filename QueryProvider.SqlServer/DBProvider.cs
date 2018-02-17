using System;
using System.Data;
using QueryProvider.Contracts;
using System.Data.SqlClient;
using System.Configuration;

namespace QueryProvider.SqlServer
{
    public class DBProvider : IDBProvider
    {
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
    }
}
