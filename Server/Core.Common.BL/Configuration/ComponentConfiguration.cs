using Core.Common.BL.Catalog;
using Core.Common.BL.DynamicForm;
using Core.Common.BL.DynamicGrid;
using Core.Common.BL.Module;
using Core.Common.Contracts.Catalog;
using Core.Common.Contracts.DynamicForm;
using Core.Common.Contracts.DynamicGrid;
using Core.Common.Contracts.Module;
using Framework.Base.Contracts.Configuration;
using System.ComponentModel.Composition;
using Unity;

namespace Core.Common.BL.Configuration
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
