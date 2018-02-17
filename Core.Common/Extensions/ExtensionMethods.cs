using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Common.Extensions
{
    public static class ExtensionMethods
    {
        public static bool IsNullOrEmpty<T>(this ICollection<T> collection)
        {
            return !IsNotNullOrEmpty(collection);
        }
        public static bool IsNotNullOrEmpty<T>(this ICollection<T> collection)
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
            return string.IsNullOrEmpty(str);
        }
        public static bool IsNotNullOrEmpty(this string str)
        {
            return !IsNullOrEmpty(str);
        }
    }
}
