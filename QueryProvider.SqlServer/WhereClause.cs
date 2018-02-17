using QueryProvider.Contracts;
using QueryProvider.Contracts.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QueryProvider.SqlServer
{
    public class WhereClause<TQueryable, TModel> : IWhereClause<TQueryable, TModel>
    {
        public IConditionOperators<TQueryable, TModel> AndWhere<T>(System.Linq.Expressions.Expression<Func<T, TModel>> whereColumn)
        {
            throw new NotImplementedException();
        }

        public IConditionOperators<TQueryable, TModel> OrWhere<T>(System.Linq.Expressions.Expression<Func<T, TModel>> whereColumn)
        {
            throw new NotImplementedException();
        }

        public IConditionOperators<TQueryable, TModel> Where<T>(System.Linq.Expressions.Expression<Func<T, TModel>> whereColumn)
        {
            throw new NotImplementedException();
        }

        public TQueryable WhereExists<T>(Contracts.IQueryable<T> value)
        {
            throw new NotImplementedException();
        }
    }
}
