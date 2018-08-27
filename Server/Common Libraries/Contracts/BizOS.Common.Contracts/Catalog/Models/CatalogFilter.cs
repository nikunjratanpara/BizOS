using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BizOS.Common.Contracts.Catalog.Models
{
    public class CatalogRequest
    {
       public string CatalogId { get; set; }
       public CatalogFilterOptions Filter { get; set; }
    }
}
