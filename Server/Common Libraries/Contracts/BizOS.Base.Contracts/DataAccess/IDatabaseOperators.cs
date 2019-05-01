using System;
using System.Collections.Generic;
using System.Text;

namespace BizOS.Base.Contracts.DataAccess
{
    public interface IDatabaseOperators
    {
        string EQUALTO { get; }
        string GREATERTHAN { get; }
        string LESSTHAN { get; }
        string GREATERTHANEQUALTO { get; }
        string LESSTHANEQUALTO { get; }
        string NOTEQUALTO { get; }
        string BETWEEN { get; }
        string EXISTS { get; }
        string CONTAINS { get; }
        string STARTWITH { get; }
        string ENDWITH { get; }
    }
}
