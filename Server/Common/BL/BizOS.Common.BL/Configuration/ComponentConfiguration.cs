using BizOS.Common.BL.Catalog;
using BizOS.Common.BL.DynamicForm;
using BizOS.Common.BL.DynamicGrid;
using BizOS.Common.BL.Module;
using BizOS.Common.Contracts.Catalog;
using BizOS.Common.Contracts.DynamicForm;
using BizOS.Common.Contracts.DynamicGrid;
using BizOS.Common.Contracts.Module;
using BizOS.Base.Contracts.Configuration;
using System.ComponentModel.Composition;
using Unity;

namespace BizOS.Common.BL.Configuration
{
    [Export(typeof(IComponentConfiguration))]
    public class ComponentConfiguration : IComponentConfiguration
    {
        public void Bind()
        {
        }

        public void RegisterServices(IUnityContainer container)
        {
            container.RegisterType<IDynamicFormComponent,DynamicFormComponent>();
            container.RegisterType<IDynamicFormFacade,DynamicFormFacade>();

            container.RegisterType<ICatalogComponent,CatalogComponent>();
            container.RegisterType<ICatalogServiceFacade,CatalogServiceFacade>();

            container.RegisterType<IDynamicGridComponent,DynamicGridComponent>();
            container.RegisterType<IDynamicGridFacade,DynamicGridFacade>();

            container.RegisterType<IModuleComponent,ModuleComponent>();
            container.RegisterType<IModuleFacade,ModuleFacade>();
        }
    }
}
