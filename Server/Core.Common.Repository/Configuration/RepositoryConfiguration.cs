using Core.Common.Contracts.Catalog;
using Core.Common.Contracts.DynamicForm;
using Core.Common.Contracts.DynamicGrid;
using Core.Common.Contracts.Module;
using Core.Common.Repository.Catalog;
using Core.Common.Repository.DynamicForm;
using Core.Common.Repository.DynamicGrid;
using Core.Common.Repository.Module;
using Framework.Base.Contracts.Configuration;
using System.ComponentModel.Composition;
using Unity;

namespace Core.Common.Repository.Configuration
{
    [Export(typeof(IComponentConfiguration))]
    public class RepositoryConfiguration : IComponentConfiguration
    {
        public void Bind()
        {
        }

        public void RegisterServices(IUnityContainer container)
        {
            container.RegisterType<IDynamicFormRepository, DynamicFormRepository>();
            container.RegisterType<IDynamicGridRepository, DynamicGridRepository>();
            container.RegisterType<ICatalogRepository, CatalogRepository>();
            container.RegisterType<IModuleRepository,ModuleRepository>();
        }
    }
}
