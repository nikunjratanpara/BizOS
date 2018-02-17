using Core.Common.Extensions;
using Framework.Base.Contracts.Configuration;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.ComponentModel.Composition.Hosting;
using Unity;
using Unity.Interception.Utilities;

namespace Framework.Base
{
    public class UnityResolver
    {
        [ImportMany(typeof(IComponentConfiguration))]
        public IEnumerable<Lazy<IComponentConfiguration>> ComponentConfigurations;
        protected IUnityContainer container;
        public UnityResolver(IUnityContainer container=null)
        {
            this.container = container ?? new UnityContainer();
            UnityContainerInstance.Container = this.container;
            InitApplication(System.IO.Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().GetName().CodeBase).Replace("file:\\", ""));
        }
        
        public void InitApplication(string AppPath="")
        {
            CompositionContainer _container;

            var catalog = new AggregateCatalog();
            if(AppPath.IsNotNullOrEmpty())
            {
                catalog.Catalogs.Add(new DirectoryCatalog(AppPath));
            }
            catalog.Catalogs.Add(new DirectoryCatalog(".")); // load only *.dll's
            catalog.Catalogs.Add(new DirectoryCatalog(".", "*.exe")); // load *.exe
            //Create the CompositionContainer with the parts in the catalog
            _container = new CompositionContainer(catalog);
           
            //Fill the imports of this object
            try
            {
                _container.ComposeParts(this);
            }
            catch (CompositionException compositionException)
            {
                Console.WriteLine(compositionException.ToString());
            }
            ComponentConfigurations.ForEach((Configuration) =>
            {
                Configuration.Value.RegisterServices(UnityContainerInstance.Container);
            });
        }
    }
}
