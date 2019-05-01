using System;
using System.Collections.Generic;
using System.Text;

namespace QueryProvider.Contracts.Common
{
    public interface IDynamicGridQueryProvider
    {
        string GridConfiguration { get; }
        string[] GridConfigurationColumns { get; }
        string SqlSourceConfiguration { get; }
        string[] SqlSourceConfigurationColumns { get; }
        string GridColumnConfiguration { get; }
        string[] GridColumnConfigurationColumns { get; }
    }
}
