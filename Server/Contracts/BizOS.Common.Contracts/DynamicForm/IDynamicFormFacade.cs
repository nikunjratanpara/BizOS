using BizOS.Common.Contracts.DynamicForm.Models;
using System.Collections.Generic;

namespace BizOS.Common.Contracts.DynamicForm
{
    public interface IDynamicFormFacade
    {
        FormConfiguration GetFormConfig(string FormName);
        bool Create(string FormName, Dictionary<string, object> formData);
        bool Update(string FormName, Dictionary<string, object> formData);
        bool Delete(string FormName, Dictionary<string, object> formData);
        // bool Get(string FormName, Dictionary<string, object> formData);
    }
}
