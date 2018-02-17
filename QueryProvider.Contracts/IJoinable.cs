using System;
using System.Linq.Expressions;

namespace QueryProvider.Contracts
{
    public interface IJoinable<TQueryable,TModel>
    {
        IConditionOperators<TQueryable, TModel> On<T>(Expression<Func<TModel,T>> table1Column);
    }
}