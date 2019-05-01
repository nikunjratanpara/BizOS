using BizOS.Base.BL.DataAccess;
using BizOS.Common.Contracts.Constants;
using BizOS.Common.Contracts.Module;
using BizOS.Common.Contracts.Module.DomainObjects;
using Dapper;
using QueryProvider.Contracts.Common;
using System;
using System.Collections.Generic;


namespace BizOS.Common.Repository.Module
{
    public class ModuleRepository : BaseRepository, IModuleRepository
    {
        private IModuleQueryProvider _moduleQueryProvider;
        internal IModuleQueryProvider ModuleQueryProvider
        {
            get
            {
                return _moduleQueryProvider = _moduleQueryProvider ?? GetBusinessComponent<IModuleQueryProvider>();
            }
            set
            {
                _moduleQueryProvider = value;
            }
        }
        public ModuleRepository(IServiceProvider provider): base(provider)
        {
        }

        public List<Menu> GetMenu(string ModuleId)
        {
            List<Menu> menues = null;
            using (Connection)
            {
                menues = Connection.Query<Menu>(ModuleQueryProvider.ModuleMenu, new { ModuleId }).AsList();
            }
            return menues;
        }
    }
}
