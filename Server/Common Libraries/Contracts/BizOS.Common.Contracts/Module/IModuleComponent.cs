using BizOS.Common.Contracts.Module.Models;
using System.Collections.Generic;

namespace BizOS.Common.Contracts.Module
{
    public interface IModuleComponent
    {
        List<MenuConfig> GetMenu(string ModuleId);
    }
}
