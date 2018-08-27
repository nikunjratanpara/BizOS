
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
