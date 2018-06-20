
using Core.Common.Contracts.Constants;
using Framework.Base.Contracts.Configuration;
using Framework.Base.Contracts.DataAccess;
using QueryProvider.SqlServer.QueryBase;
using System.ComponentModel.Composition;
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
            container.RegisterType<IDBProvider, SqlServerProvider>(DBProviders.SqlServer);
            container.RegisterType<IQueryBase, DynamicGridQueryBase>(QueryProviders.DynamicGrid);
            container.RegisterType<IQueryBase, DynamicFormQueryBase>(QueryProviders.DynamicForm);
            container.RegisterType<IQueryBase, CatalogQueryBase>(QueryProviders.Catalog);
            container.RegisterType<IQueryBase, ModuleQueryBase>(QueryProviders.Module);
        }
    }
}
