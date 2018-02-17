using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QueryProvider.Contracts.Models
{
    public class SqlCondition<T>
    {
        public string Column { get; set; }
        public string Operator { get; set; }
        public T value { get; set; }
    }
}
