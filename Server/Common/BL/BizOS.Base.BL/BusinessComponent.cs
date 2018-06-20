using BizOS.Base.Contracts;
using Unity;

namespace BizOS.Base.BL
{
    public class BusinessComponent : IBusinessComponent
    {
        public T GetBusinessComponent<T>()
        {
            return UnityContainerInstance.Container.Resolve<T>();
        }

        public T GetBusinessComponent<T>(string aliasName)
        {
            return UnityContainerInstance.Container.Resolve<T>(aliasName);
        }
        public T GetRepository<T>()
        {
            return UnityContainerInstance.Container.Resolve<T>();
        }

        public T GetRepository<T>(string aliasName)
        {
            return UnityContainerInstance.Container.Resolve<T>(aliasName);
        }
    }
}
