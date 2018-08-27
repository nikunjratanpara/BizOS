using BizOS.Base.Contracts.Configuration;
using BizOS.Base.Contracts.DataAccess;
using BizOS.Common.Contracts;
using BizOS.Common.Contracts.Constants;
using QueryProvider.SqlServer.QueryBase;
using System.Composition;
using Unity;

namespace QueryProvider.SqlServer.Configuration
{
    [Export(typeof(IComponentConfiguration))]
    public class ComponentConfiguration : IComponentConfiguration
    {
        public void Bind()
        {
        }

        public void RegisterServices(IUnityContainer container)
        {
            container.RegisterType<IDBProvider, SqlServerProvider>("SqlServer");
            container.RegisterType<IQueryBase, DynamicGridQueryBase>(QueryProviders.DynamicGrid);
            container.RegisterType<IQueryBase, DynamicFormQueryBase>(QueryProviders.DynamicForm);
            container.RegisterType<IQueryBase, CatalogQueryBase>(QueryProviders.Catalog);
            container.RegisterType<IQueryBase, ModuleQueryBase>(QueryProviders.Module);
        }
    }
}
