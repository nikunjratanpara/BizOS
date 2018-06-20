using BizOS.Common.Contracts.DynamicForm.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BizOS.Common.Contracts.DynamicForm
{
    public interface IDynamicFormComponent
    {
        FormConfiguration GetFormConfig(string FormName);
        bool Create(string FormName, Dictionary<string, object> formData);
        bool Update(string FormName, Dictionary<string, object> formData);
        bool Delete(string FormName, Dictionary<string, object> formData);
    }
}
