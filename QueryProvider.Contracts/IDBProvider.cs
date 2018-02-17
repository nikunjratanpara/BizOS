using System.Data;


namespace QueryProvider.Contracts
{
    public interface IDBProvider
    {
        IDbConnection GetConnection();
        IDbConnection GetConnection(string connectionString);
    }
}
