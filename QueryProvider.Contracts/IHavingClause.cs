using System;
using System.Linq.Expressions;

namespace QueryProvider.Contracts
{
    public interface IHavingClause<TModel>
    {
        IConditionOperators<IQueryable<TModel>,TModel> Having<T>(Expression<Func<T, TModel>> column, string aggregateFunction);
        IConditionOperators<IQueryable<TModel>,TModel> AndHaving<T>(Expression<Func<T, TModel>> column, string aggregateFunction);
        IConditionOperators<IQueryable<TModel>,TModel> OrHaving<T>(Expression<Func<T, TModel>> column, string aggregateFunction);
    }
}
