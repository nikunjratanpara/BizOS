using QueryProvider.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QueryProvider.SqlServer
{
    public class HavingClause<TQueryable, TModel> : WhereClause<TQueryable, TModel>, IHavingClause<TModel>
    {
        public IConditionOperators<Contracts.IQueryable<TModel>, TModel> AndHaving<T>(System.Linq.Expressions.Expression<Func<T, TModel>> column, string aggregateFunction)
        {
            throw new NotImplementedException();
        }

        public IConditionOperators<Contracts.IQueryable<TModel>, TModel> Having<T>(System.Linq.Expressions.Expression<Func<T, TModel>> column, string aggregateFunction)
        {
            throw new NotImplementedException();
        }

        public IConditionOperators<Contracts.IQueryable<TModel>, TModel> OrHaving<T>(System.Linq.Expressions.Expression<Func<T, TModel>> column, string aggregateFunction)
        {
            throw new NotImplementedException();
        }
    }
}
