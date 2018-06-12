using Framework.Base.Contracts.DataAccess;
using System.Collections.Generic;

namespace QueryProvider.SqlServer.QueryBase
{
    public class DynamicGridQueryBase : QueryBase
    {
        public DynamicGridQueryBase()
        {
            Add("GridConfiguration", "select * from GridConfiguration where GridConfigId=@GridConfigId");
            Add("SqlSourceConfiguration", "select * from SqlSourceConfiguration where GridConfigId = @GridConfigId");
            Add("GridColumnConfiguration", "select * from GridColumnConfiguration where GridConfigId=@GridConfigId");
        }  
    }
}
