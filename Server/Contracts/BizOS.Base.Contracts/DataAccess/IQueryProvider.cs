using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BizOS.Base.Contracts.DataAccess
{
    public interface IQueryBase
    {
        string GetQuery(string code);
    }
}
