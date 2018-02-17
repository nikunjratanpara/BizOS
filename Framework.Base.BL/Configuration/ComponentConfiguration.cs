
using Framework.Base.BL.DataAccess;
using Framework.Base.Contracts.Configuration;
using Framework.Base.Contracts.DataAccess;
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
            container.RegisterType<IDBProvider, SqlServerProvider>("SqlServer");
        }
    }
}
