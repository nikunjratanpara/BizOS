using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BizOS.Base.Contracts.Component
{
    public interface IBusinessComponent
    {
        T GetBusinessComponent<T>();
        T GetBusinessComponent<T>(string aliasName) where T : INamedService;
        T GetRepository<T>();
        T GetRepository<T>(string aliasName) where T : INamedService;
    }
}
