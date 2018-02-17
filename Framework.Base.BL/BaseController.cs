using System.Web.Http;
using Unity;
namespace Framework.Base.BL
{
    public abstract class BaseController : ApiController
    {
        public T GetBusinessService<T>()
        {
            return UnityContainerInstance.Container.Resolve<T>();
        }

        public T GetBusinessService<T>(string aliasName)
        {
            return UnityContainerInstance.Container.Resolve<T>(aliasName);
        }
    }
}
