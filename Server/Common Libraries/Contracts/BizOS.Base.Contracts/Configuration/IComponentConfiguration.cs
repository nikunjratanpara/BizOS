using Microsoft.Extensions.DependencyInjection;

namespace BizOS.Base.Contracts.Configuration
{
    public interface IComponentConfiguration
    {
        void RegisterServices(IServiceCollection container);
        void Bind();
    }
}
