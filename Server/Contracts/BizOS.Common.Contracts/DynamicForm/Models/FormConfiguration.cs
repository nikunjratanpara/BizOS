using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BizOS.Common.Contracts.DynamicForm.Models
{
    public class FormConfiguration
    {
        public string FormConfigId { get; set; }
        public string FormName { get; set; }
        public string GridConfigId { get; set; }
        public List<FormFieldConfiguration> Controls { get; set; }
    }
}
