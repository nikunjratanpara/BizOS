using System.Collections.Generic;
using System.Linq;
using BizOS.Common.Contracts.Module;
using BizOS.Common.Contracts.Module.DomainObjects;
using BizOS.Common.Contracts.Module.Models;
using BizOS.Common.Extensions;
using BizOS.Base.BL;
using Unity;

namespace BizOS.Common.BL.Module
{
    public class ModuleComponent : BusinessComponent, IModuleComponent
    {
        private IModuleRepository moduleRepository;

        public ModuleComponent(IUnityContainer container) : base(container)
        {
        }

        internal IModuleRepository ModuleRepository
        {
            get
            {
                return moduleRepository = moduleRepository ?? GetBusinessComponent<IModuleRepository>();
            }
            set
            {
                moduleRepository  = value;
            }
        }
        public List<MenuConfig> GetMenu(string moduleId)
        {
            List<MenuConfig> menuConfigs = null;
            if(moduleId.IsNotNullOrEmpty())
            {
                List<Menu> menues =  ModuleRepository.GetMenu(moduleId);
                if(menues.IsNotNullOrEmpty())
                {
                    IEnumerable<Menu> parents = menues.Where(menu => !menu.ParentId.HasValue);
                    if (parents.IsNotNullOrEmpty())
                    {
                        menuConfigs = parents.Select(menu => AssembleMenuToMenuConfig(menu, menues)).ToList();
                    }
                }
            }
            return menuConfigs;
        }

        private List<MenuConfig> GetChildrenMenues(Menu parent, List<Menu> menues)
        {
            List<MenuConfig> menuConfigs = null;
            if(parent!= null && menues.IsNotNullOrEmpty())
            {
                IEnumerable<Menu> children = menues.Where(child => child.ParentId == parent.MenuId);
                if (children.IsNotNullOrEmpty())
                {
                    menuConfigs = children.Select(child => AssembleMenuToMenuConfig(child, menues)).ToList();
                }
            }
            return menuConfigs;
        }
        private MenuConfig AssembleMenuToMenuConfig(Menu menu, List<Menu> menues)
        {
            MenuConfig menuConfig = null;
            if (menu != null)
            {
                menuConfig = new MenuConfig
                {
                    Name = menu.Name,
                    Component = menu.Config.IsNotNullOrEmpty() ? menu.Config.Split(',').ToList() : null,
                    Children = GetChildrenMenues(menu, menues)
                };
            }
            return menuConfig;
        }
    }
}
