using Core.Common.Contracts.DynamicForm.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Common.Contracts.DynamicForm
{
    public interface IControlValidator
    {
        bool ValidateControls(List<FormFieldConfiguration> FormFields, Dictionary<string, object> formData);
    }
}
