using BizOS.Common.Contracts.DynamicForm.Models;
using System.Collections.Generic;

namespace BizOS.Common.Contracts.DynamicForm
{
    public interface IDynamicFormRepository
    {
        FormConfiguration GetFormConfig(string CatalogId);
        List<FormFieldConfiguration> GetFormControls(string CatalogId);
        bool Create(string FormConfigId, Dictionary<string, object> formData);
        bool Update(string FormConfigId, Dictionary<string, object> formData);
        bool Delete(string FormConfigId, Dictionary<string, object> formData);
    }
}
