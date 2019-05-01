using BizOS.Base.Contracts.Configuration;
using BizOS.Base.Contracts.DataAccess;
using Microsoft.Extensions.DependencyInjection;
using QueryProvider.Contracts.Common;
using QueryProvider.SqlServer.QueryBase;
using System.Composition;
using System.Data;
using System.Data.SqlClient;

namespace QueryProvider.SqlServer.Configuration
{
    [Export(typeof(IComponentConfiguration))]
    public class ComponentConfiguration : IComponentConfiguration
    {
        public void Bind()
        {
        }

        public void RegisterServices(IServiceCollection container)
        {
            container.AddScoped<IDBProvider, SqlServerProvider>();
            container.AddScoped<IDatabaseOperators, Operators>();
            container.AddScoped<ICatalogQueryProvider, CatalogQueryProvider>();
            container.AddScoped<IDynamicFormQueryProvider, DynamicFormQueryProvider>();
            container.AddScoped<IDynamicGridQueryProvider, DynamicGridQueryProvider>();
            container.AddScoped<IModuleQueryProvider, ModuleQueryProvider>();
        }
    }
}
