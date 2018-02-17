using System;
using QueryProvider.Contracts;
using System.Linq.Expressions;
using Core.Common;
using System.Collections.Generic;
using System.Text;
using Core.Common.Extensions;
using Core.Common.Reflection;

namespace QueryProvider.SqlServer
{
    public class SelectQueryable<TModel> : HavingClause<IQueryable<TModel>, TModel>, IQueryable<TModel>
    {
        private List<string> _selectColumns;

        public List<string> SelectColumns
        {
            get => _selectColumns = _selectColumns ?? new List<string>();
            set => _selectColumns = value;
        }
        private List<string> _groupByColumns;

        public List<string> GroupByColumns
        {
            get => _groupByColumns = _groupByColumns ?? new List<string>();
            set => _groupByColumns = value;
        }
        private List<string> _orderByColumns;

        public List<string> OrderByColumns
        {
            get => _orderByColumns = _orderByColumns ?? new List<string>();
            set => _orderByColumns = value;
        }

        private int maxRecordCount = 0;
        private string tableName;
        public IQueryable<TModel> Table(string tableName)
        {
            this.tableName = tableName;
            return this;
        }

        public IQueryable<TModel> Column<T>(params Expression<Func<T, TModel>>[] columnExpressions)
        {
            if(columnExpressions.IsNotNullOrEmpty())
            {
                Array.ForEach(columnExpressions, column => AddColumn(column));
            }
            return this;
        }

        public IQueryable<TModel> Column<T>(Expression<Func<T, TModel>> columnExpression, string aggregateFunction)
        {
            AddColumn(columnExpression, aggregateFunction);
            return this;
        }

        public IQueryable<TModel> Columns(List<string> columns,string alias = "")
        {
            if(alias.IsNotNullOrEmpty())
            {
                columns.ForEach(column => column = alias + '.' + column);
            }
            SelectColumns.AddRange(columns);
            return this;
        }

        public IQueryable<TModel> GroupBy<T>(params Expression<Func<T, TModel>>[] columnExpressions)
        {
            if (columnExpressions.IsNotNullOrEmpty())
            {
                Array.ForEach(columnExpressions, column => GroupByColumns.Add(column.GetName()));
            }
            return this;
        }

        public IQueryable<TModel> OrderBy<T>(params Expression<Func<T, TModel>>[] columnExpressions)
        {
            if (columnExpressions.IsNotNullOrEmpty())
            {
                Array.ForEach(columnExpressions, column => OrderByColumns.Add(column.GetName()));
            }
            return this;
        }

        
        public IQueryable<TModel> Top(int recordCount)
        {
            if (recordCount > 0)
                maxRecordCount = recordCount;
            return this;
        }

       private void AddColumn<T>(Expression<Func<T, TModel>> columnExpression, string aggregateFunction = "")
       {
            string _columnName = columnExpression.GetName();
            StringBuilder ColumnName = new StringBuilder();
            if (aggregateFunction.IsNotNullOrEmpty())
            {
                ColumnName.Append(aggregateFunction);
                ColumnName.Append("(");
                ColumnName.Append(_columnName);
                ColumnName.Append(") ");
                ColumnName.Append(_columnName);
            }
            else
            {
                ColumnName.Append(_columnName);
            }
            SelectColumns.Add(ColumnName.ToString());
       }
    }
}
