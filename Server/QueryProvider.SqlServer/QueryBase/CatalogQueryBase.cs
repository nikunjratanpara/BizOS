using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QueryProvider.SqlServer.QueryBase
{
    public class CatalogQueryBase : QueryBase
    {
        public CatalogQueryBase()
        {
            Add("CatalogDictionary", "select * from CatalogDictionary where CatalogId= @CatalogId");
        }
    }
}
