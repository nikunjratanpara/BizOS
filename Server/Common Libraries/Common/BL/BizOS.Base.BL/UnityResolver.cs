using BizOS.Base.Contracts.Configuration;
using System.Collections.Generic;
using System.Composition;
using System.Linq;
using System.Reflection;
using System.IO;
using System.Runtime.Loader;
using System.Composition.Hosting;

using Microsoft.Extensions.DependencyInjection;

namespace BizOS.Base.BL
{
    public class DependencyConfiguration
    {
        [ImportMany("IComponentConfiguration")]
        public IEnumerable<IComponentConfiguration> ComponentConfigurations { get; set; }
        protected IServiceCollection container;
        public DependencyConfiguration(IServiceCollection container)
        {
            this.container = container;
            string appPath = System.IO.Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().GetName().CodeBase).Replace("file:\\", "");
            Init(appPath);
        }
        public void Init(string AppPath)
        {
            List<Assembly> assemblies = Directory
                        .GetFiles(AppPath, "*.dll", SearchOption.AllDirectories)
                        .Select(AssemblyLoadContext.Default.LoadFromAssemblyPath)
                        .ToList();
            ContainerConfiguration configuration = new ContainerConfiguration()
                .WithAssemblies(assemblies);
            using (CompositionHost container = configuration.CreateContainer())
            {
                ComponentConfigurations = container.GetExports<IComponentConfiguration>();
            }
            ComponentConfigurations.ToList().ForEach((Configuration) =>
            {
                Configuration.RegisterServices(container);
            });
        }
    }
}
