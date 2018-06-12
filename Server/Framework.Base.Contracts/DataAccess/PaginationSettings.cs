using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Framework.Base.Contracts.DataAccess
{
    public class PaginationSettings
    {
        public string OrderBy { get; set; }
        public int PageNo { get; set; }
        public int PageSize { get; set; }
    }
}
