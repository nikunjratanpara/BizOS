﻿using BizOS.Base.BL.DataAccess;
using BizOS.Common.Contracts.Constants;
using BizOS.Common.Contracts.Module;
using BizOS.Common.Contracts.Module.DomainObjects;
using Dapper;
using System;
using System.Collections.Generic;
using Unity;

namespace BizOS.Common.Repository.Module
{
    public class ModuleRepository : BaseRepository, IModuleRepository
    {
        public ModuleRepository(IUnityContainer unityContainer) : base(unityContainer, QueryProviders.Module)
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