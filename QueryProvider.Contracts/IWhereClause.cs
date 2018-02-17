using System;
using System.Linq.Expressions;

namespace QueryProvider.Contracts
{
    public interface IWhereClause<TQueryable,TModel>
    {
        IConditionOperators<TQueryable,TModel> Where<T>(Expression<Func<T, TModel>> whereColumn);
        IConditionOperators<TQueryable,TModel> AndWhere<T>(Expression<Func<T, TModel>> whereColumn);
        IConditionOperators<TQueryable,TModel> OrWhere<T>(Expression<Func<T, TModel>> whereColumn);
        TQueryable WhereExists<T>(IQueryable<T> value);
    }
}