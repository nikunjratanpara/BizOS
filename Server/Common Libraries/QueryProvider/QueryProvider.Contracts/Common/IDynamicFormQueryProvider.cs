using System;
using System.Collections.Generic;
using System.Text;

namespace QueryProvider.Contracts.Common
{
    public interface IDynamicFormQueryProvider
    {
       string FormConfiguration { get; }
       string FormFieldConfiguration { get;}
    }
}
