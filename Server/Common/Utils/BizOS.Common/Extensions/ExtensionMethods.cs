using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace BizOS.Common.Extensions
{
    public static class ExtensionMethods
    {
        public static bool IsNullOrEmpty<T>(this IEnumerable<T> collection)
        {
            return !IsNotNullOrEmpty(collection);
        }
        public static bool IsNotNullOrEmpty<T>(this IEnumerable<T> collection)
        {
            return collection != null && collection.Count() > 0;
        }
        public static dynamic ToDynamicObject(this IDictionary<string,object> collection)
        {
            ExpandoObject eo = new ExpandoObject();
            var eoColl = (ICollection<KeyValuePair<string, object>>)eo;
            foreach (var kvp in collection)
            {
                eoColl.Add(kvp);
            }
            return eo;
        }
        public static bool IsNullOrEmpty(this string str)
        {
            return string.IsNullOrEmpty(str) || string.IsNullOrWhiteSpace(str);
        }
        public static bool IsNotNullOrEmpty(this string str)
        {
            return !IsNullOrEmpty(str);
        }
        public static string ReplaceMultipleSpaces(this string str)
        {
            if (str.IsNotNullOrEmpty())
            {
                RegexOptions options = RegexOptions.None;
                Regex regex = new Regex("[ ]{2,}", options);
                str = regex.Replace(str, " ");
            }
            return str;
        }
    }
}
