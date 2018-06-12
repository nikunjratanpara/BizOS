using Core.Common.Extensions;
using Framework.Base.Contracts.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QueryProvider.SqlServer.QueryBase
{
    public abstract class QueryBase : IQueryBase
    {
        private Dictionary<string, string> queryBase = new Dictionary<string, string>();
        public string GetQuery(string code)
        {
            string query = null;
            if (queryBase.ContainsKey(code))
            {
                query = queryBase[code];
            }
            return query;
        }
        public void Add(string code, string query)
        {
            if(code.IsNotNullOrEmpty() && query.IsNotNullOrEmpty())
            {
                queryBase.Add(code, query);
            }
        }
    }
}
