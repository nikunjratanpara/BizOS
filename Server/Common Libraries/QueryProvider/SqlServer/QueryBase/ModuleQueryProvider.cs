
using BizOS.Common.Contracts.Constants;
using QueryProvider.Contracts.Common;

namespace QueryProvider.SqlServer.QueryBase
{
    public class ModuleQueryProvider: IModuleQueryProvider
    {
        public ModuleQueryProvider()
        {}

        public string ModuleMenu => "select * from ModuleMenu where ModuleId=@ModuleId";
    }
}
