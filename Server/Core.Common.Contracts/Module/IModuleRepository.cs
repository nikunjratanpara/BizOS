using Core.Common.Contracts.Module.DomainObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Common.Contracts.Module
{
    public interface IModuleRepository
    {
        List<Menu> GetMenu(string ModuleId);
    }
}
