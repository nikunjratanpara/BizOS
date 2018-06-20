using Unity;

namespace BizOS.Base.Contracts.Configuration
{
    public interface IComponentConfiguration
    {
        void RegisterServices(IUnityContainer container);
        void Bind();
    }
}
