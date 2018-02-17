using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace QueryProvider.Contracts
{
    public interface IConditionOperators<TQueryable,TModel>
    {   
        TQueryable IsNull();
        TQueryable IsNotNull();
        TQueryable StartWith<T>(T value);
        TQueryable EndWith<T>(T value);
        TQueryable Contains<T>(T value);
        TQueryable In<T>(ICollection<T> value);
        TQueryable In<T>(IQueryable<T> value);
        TQueryable Between<T>(T value1, T value2);
        TQueryable EqualTo<T>(T value);
        TQueryable LessThan<T>(T value);
        TQueryable GreaterThan<T>(T value);
        TQueryable LessThanEqualTo<T>(T value);
        TQueryable GreaterThanEqualTo<T>(T value);

        TQueryable StartWith<T>(Expression<Func<TModel,T>> valueExpression);
        TQueryable EndWith<T>(Expression<Func<TModel, T>> valueExpression);
        TQueryable Contains<T>(Expression<Func<TModel, T>> valueExpression);


        TQueryable StartWithColumn<T>(Expression<Func<TModel, T>> columnExpression);
        TQueryable EndWithColunm<T>(Expression<Func<TModel, T>> columnExpression);
        TQueryable ContainsColumn<T>(Expression<Func<TModel, T>> columnExpression);
    }
}