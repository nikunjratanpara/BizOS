using BizOS.Common.BL.Catalog;
using BizOS.Common.BL.DynamicForm;
using BizOS.Common.BL.DynamicGrid;
using BizOS.Common.BL.Module;
using BizOS.Common.Contracts.Catalog;
using BizOS.Common.Contracts.DynamicForm;
using BizOS.Common.Contracts.DynamicGrid;
using BizOS.Common.Contracts.Module;
using BizOS.Base.Contracts.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Composition;


namespace BizOS.Common.BL.Configuration
{
    [Export(typeof(IComponentConfiguration))]
    public class ComponentConfiguration : IComponentConfiguration
    {
        public void Bind()
        {
        }

        public void RegisterServices(IServiceCollection container)
        {
            container.AddScoped<IDynamicFormComponent,DynamicFormComponent>();
            container.AddScoped<IDynamicFormFacade,DynamicFormFacade>();

            container.AddScoped<ICatalogComponent,CatalogComponent>();
            container.AddScoped<ICatalogServiceFacade,CatalogServiceFacade>();

            container.AddScoped<IDynamicGridComponent,DynamicGridComponent>();
            container.AddScoped<IDynamicGridFacade,DynamicGridFacade>();

            container.AddScoped<IModuleComponent,ModuleComponent>();
            container.AddScoped<IModuleFacade,ModuleFacade>();
        }
    }
}
