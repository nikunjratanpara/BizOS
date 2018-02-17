using Core.Common.Contracts.DynamicForm.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Common.Repository.DynamicGrid.DomainObjects
{
    internal class GridConfigurationEO
    {
        public string TableName { get; set; }
        public string SearchConfigId { get; set; }
        public List<FormFieldConfiguration> Controls { get; set; }
    }
}
