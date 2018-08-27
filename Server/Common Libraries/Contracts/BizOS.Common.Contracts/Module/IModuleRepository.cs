using BizOS.Common.Contracts.Module.DomainObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BizOS.Common.Contracts.Module
{
    public interface IModuleRepository
    {
        List<Menu> GetMenu(string ModuleId);
    }
}
