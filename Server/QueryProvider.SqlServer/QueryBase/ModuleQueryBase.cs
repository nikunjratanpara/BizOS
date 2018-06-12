using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QueryProvider.SqlServer.QueryBase
{
    public class ModuleQueryBase: QueryBase
    {
        public ModuleQueryBase()
        {
            Add("ModuleMenu", "select * from ModuleMenu where ModuleId=@ModuleId");
        }
    }
}
