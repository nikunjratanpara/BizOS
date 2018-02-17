using Core.Common.BL.Catalog;
using Core.Common.BL.DynamicForm;
using Core.Common.BL.DynamicGrid;
using Core.Common.Contracts.Catalog;
using Core.Common.Contracts.DynamicForm;
using Core.Common.Contracts.DynamicGrid;
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
            container.RegisterType(typeof(IDynamicFormComponent),typeof(DynamicFormComponent));
            container.RegisterType(typeof(IDynamicFormFacade) , typeof(DynamicFormFacade));

            container.RegisterType(typeof(ICatalogComponent), typeof(CatalogComponent));
            container.RegisterType(typeof(ICatalogServiceFacade), typeof(CatalogServiceFacade));

            container.RegisterType(typeof(IDynamicGridComponent), typeof(DynamicGridComponent));
            container.RegisterType(typeof(IDynamicGridFacade), typeof(DynamicGridFacade));
        }
    }
}
