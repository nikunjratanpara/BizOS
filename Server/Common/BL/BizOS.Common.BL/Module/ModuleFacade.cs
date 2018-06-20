using BizOS.Common.Contracts.Module;
using BizOS.Common.Contracts.Module.Models;
using BizOS.Base.BL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BizOS.Common.BL.Module
{
    public class ModuleFacade : BusinessComponent, IModuleFacade
    {
        private IModuleComponent moduleComponent;
        public IModuleComponent ModuleComponent
        {
            get { return moduleComponent = moduleComponent ?? GetBusinessComponent<IModuleComponent>(); }
            set { moduleComponent = value; }
        }
        public List<MenuConfig> GetMenu(string ModuleId)
        {
            return ModuleComponent.GetMenu(ModuleId);
        }
    }
}
