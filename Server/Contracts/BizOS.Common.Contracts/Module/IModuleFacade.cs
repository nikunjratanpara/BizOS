using BizOS.Common.Contracts.Module.Models;
using System.Collections.Generic;

namespace BizOS.Common.Contracts.Module
{
    public interface IModuleFacade
    {
        List<MenuConfig> GetMenu(string ModuleId);
    }
}
