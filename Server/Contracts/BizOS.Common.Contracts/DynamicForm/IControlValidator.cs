using BizOS.Common.Contracts.DynamicForm.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BizOS.Common.Contracts.DynamicForm
{
    public interface IControlValidator
    {
        bool ValidateControls(List<FormFieldConfiguration> FormFields, Dictionary<string, object> formData);
    }
}
