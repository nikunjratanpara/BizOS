using Core.Common.Contracts.Module.Models;
using System.Collections.Generic;

namespace Core.Common.Contracts.Module
{
    public interface IModuleComponent
    {
        List<MenuConfig> GetMenu(string ModuleId);
    }
}
