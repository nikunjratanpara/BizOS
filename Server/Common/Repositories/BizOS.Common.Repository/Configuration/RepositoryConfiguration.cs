using BizOS.Common.Contracts.Catalog;
using BizOS.Common.Contracts.DynamicForm;
using BizOS.Common.Contracts.DynamicGrid;
using BizOS.Common.Contracts.Module;
using BizOS.Common.Repository.Catalog;
using BizOS.Common.Repository.DynamicForm;
using BizOS.Common.Repository.DynamicGrid;
using BizOS.Common.Repository.Module;
using BizOS.Base.Contracts.Configuration;
using System.ComponentModel.Composition;
using Unity;

namespace BizOS.Common.Repository.Configuration
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
