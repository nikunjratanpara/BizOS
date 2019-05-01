using BizOS.Base.Contracts;
using BizOS.Base.Contracts.Component;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BizOS.Base.BL
{
    public class BusinessComponent : IBusinessComponent
    {
        private IServiceProvider _container; 
        public BusinessComponent(IServiceProvider container)
        {
            _container = container;
        }
        private IConfiguration appSettings = null;
        protected IConfiguration AppSettings
        {
            get => appSettings = appSettings ?? (IConfiguration) _container.GetService<IConfiguration>();
            set => appSettings = value;
        }
        public T GetBusinessComponent<T>() => _container.GetService<T>();
       
        public T GetRepository<T>() => _container.GetService<T>();

        public T GetBusinessComponent<T>(string aliasName) where T : INamedService
        {
            IEnumerable<T> namedServices = _container.GetServices<T>();
            return namedServices.FirstOrDefault(service => service.ServiceName == aliasName);
        }

        public T GetRepository<T>(string aliasName) where T : INamedService
        {
            return GetBusinessComponent<T>(aliasName);
        }
    }
}
