using System;
using System.Collections.Generic;
using System.Linq.Expressions;


namespace QueryProvider.Contracts
{
    public interface IQueryable<TModel> : IWhereClause<IQueryable<TModel>,TModel>, IHavingClause<TModel>
    {
        IQueryable<TModel> Table(string tableName);
        IQueryable<TModel> Column<T>(params Expression<Func<T, TModel>>[] columnExpressions);
        IQueryable<TModel> Column<T>(Expression<Func<T, TModel>> columnExpression, string aggregateFunction);
        IQueryable<TModel> Column<T>(List<string> Columns);
        IQueryable<TModel> Top(int recordCount);
        IQueryable<TModel> GroupBy<T>(params Expression<Func<T, TModel>>[] columnExpressions);
        IQueryable<TModel> OrderBy<T>(params Expression<Func<T, TModel>>[] columnExpressions);
        IQueryable<TModel> Join<TFromModel,TTOModel>(Expression<Func<TFromModel, TModel>>[] columnExpressions);
    }
}
