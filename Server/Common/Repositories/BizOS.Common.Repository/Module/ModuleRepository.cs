using BizOS.Common.Contracts.Constants;
using BizOS.Common.Contracts.Module;
using BizOS.Common.Contracts.Module.DomainObjects;
using Dapper;
using BizOS.Base.BL.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BizOS.Common.Repository.Module
{
    public class ModuleRepository : BaseRepository, IModuleRepository
    {
        public ModuleRepository() : base(QueryProviders.Module)
        {
        }

        public List<Menu> GetMenu(string ModuleId)
        {
            List<Menu> menues = null;
            string sql = GetQuery("ModuleMenu");
            using (Connection)
            {
                menues = Connection.Query<Menu>(sql, new { ModuleId }).AsList();
            }
            return menues;
        }

        public override object GetPocoObject<T>(T Model)
        {
            throw new NotImplementedException();
        }
    }
}
