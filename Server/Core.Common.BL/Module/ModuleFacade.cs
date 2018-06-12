using Core.Common.Contracts.Module;
using Core.Common.Contracts.Module.Models;
using Framework.Base.BL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Common.BL.Module
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
