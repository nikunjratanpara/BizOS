using BizOS.Base.Contracts.DataAccess;

namespace QueryProvider.SqlServer
{
    public class Operators : IDatabaseOperators
    {
        public string EQUALTO
        {
            get => "=";
        }
        public string GREATERTHAN
        {
            get => ">";
        }
        public string LESSTHAN
        {
            get => "<";
        }
        public string GREATERTHANEQUALTO
        {
            get => ">=";
        }
        public string LESSTHANEQUALTO
        {
            get => "<=";
        }
        public string NOTEQUALTO { get => "<>"; }
        public string BETWEEN
        {
            get => "BETWEEN";
        }
        public string EXISTS { get => "EXISTS"; }
        public string CONTAINS { get => "CONTAINS"; }
        public string STARTWITH { get => "STARTWITH"; }
        public string ENDWITH { get => "ENDWITH"; }
        public string IN { get => "IN"; }
    }
}
