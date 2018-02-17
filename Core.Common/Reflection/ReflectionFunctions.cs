using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Core.Common.Reflection
{
    public static class ReflectionFunctions
    {
        public static string GetName<TDtoType, TProperty>(this Expression<Func<TDtoType, TProperty>> columnExpression)
        {
            var memberExpression = columnExpression.Body as MemberExpression;

            if (memberExpression == null)
            {
                var contantExpression = columnExpression.Body as ConstantExpression;

                if (contantExpression == null)
                    throw new ArgumentException("Invalid Column Expression");

                return Convert.ToString(contantExpression.Value);
            }

            return memberExpression.Member.Name;
        }

        public static object GetValue<TDtoType, TProperty>(this Expression<Func<TDtoType, TProperty>> columnExpression)
        {
            Expression memberExpression = columnExpression.Body as MemberExpression;

            if (memberExpression == null)
            {
                var contantExpression = columnExpression.Body as ConstantExpression;
                memberExpression = contantExpression ?? throw new ArgumentException("Invalid Column Expression");
            }

            var valueExpression = Expression.Convert(memberExpression, typeof(TProperty));

            var valueFunc = Expression.Lambda<Func<TProperty>>(valueExpression).Compile();

            return valueFunc();
        }
        public static List<string> GetColumnsList(this Type type)
        {
            List<string> columnNames = null;
            if (type != null)
            {
                columnNames = type.GetProperties().Select(t => t.Name).ToList();
            }
            return columnNames;
        }
        public static string GetColumns(this Type type)
        {
            StringBuilder columns = new StringBuilder();
            if (type != null)
            {
                type.GetProperties().
                    Select(t => t.Name).
                    ToList().
                    ForEach(column=> {
                        columns.Append(column);
                        columns.Append(",");
                    });
            }
            if(columns.Length>0)
            {
                columns = columns.Remove(columns.Length - 1, 1);
            }
            return columns.ToString();
        }
        public static string GetTableName(this Type type)
        {
            string tableName = null;
            if (type != null)
            {
                tableName = type.Name;
            }
            return tableName;
        }
        public static string GetTableName(this object obj)
        {
            string tableName = null;
            if (obj != null)
            {
                tableName = obj.GetType().Name;
            }
            return tableName;
        }
        public static List<string> GetColumnsList(this object obj)
        {
            List<string> columnNames = null;
            if (obj != null)
            {
                columnNames = obj.GetType().GetColumnsList();
            }
            return columnNames;
        }
        public static string GetColumns(this object obj)
        {
            string columns = null;
            if (obj != null)
            {
                columns = obj.GetType().GetColumns();   
            }
            return columns;
        }
    }
}
