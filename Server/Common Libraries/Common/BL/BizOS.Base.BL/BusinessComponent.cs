using BizOS.Base.Contracts;
using Microsoft.Extensions.Configuration;
using Unity;

namespace BizOS.Base.BL
{
    public class BusinessComponent : IBusinessComponent
    {
        private IUnityContainer _container; 
        public BusinessComponent(IUnityContainer container)
        {
            _container = container;
        }
        private IConfiguration appSettings = null;
        protected IConfiguration AppSettings
        {
            get => appSettings = appSettings ?? (IConfiguration) _container.Resolve(typeof(IConfiguration));
            set => appSettings = value;
        }
        public T GetBusinessComponent<T>()
        {
            return _container.Resolve<T>();
        }
        public T GetBusinessComponent<T>(string aliasName)
        {
            return _container.Resolve<T>(aliasName);
        }
        public T GetRepository<T>()
        {
            return _container.Resolve<T>();
        }
        public T GetRepository<T>(string aliasName)
        {
            return _container.Resolve<T>(aliasName);
        }
    }
}
