using Unity;

namespace Framework.Base.Contracts.Configuration
{
    public interface IComponentConfiguration
    {
        void RegisterServices(IUnityContainer container);
        void Bind();
    }
}
