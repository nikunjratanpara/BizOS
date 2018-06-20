using System.Collections.Generic;
using BizOS.Common.Contracts.DynamicForm;
using BizOS.Common.Contracts.DynamicForm.Models;
using BizOS.Base.BL;
using BizOS.Common.Extensions;
using System.Linq;
using Newtonsoft.Json.Linq;
using BizOS.Common.Contracts.Catalog.Models;
using Newtonsoft.Json;
using System;

namespace BizOS.Common.BL.DynamicForm
{
    internal class DynamicFormComponent : BusinessComponent, IDynamicFormComponent
    {
        private IDynamicFormRepository dynamicFormRepository;
        public IDynamicFormRepository DynamicFormRepository
        {
            get
            {
                return dynamicFormRepository = dynamicFormRepository ?? GetRepository<IDynamicFormRepository>();
            }
        }
        public FormConfiguration GetFormConfig(string FormName)
        {
            FormConfiguration formConfig = null;
            if (FormName.IsNotNullOrEmpty())
            {
                formConfig = DynamicFormRepository.GetFormConfig(FormName);
                formConfig.Controls = DynamicFormRepository.GetFormControls(FormName);
            }
            return formConfig;
        }

        public bool Create(string FormName, Dictionary<string, object> formData)
        {
            bool isSaved = false;
            if (FormName.IsNotNullOrEmpty() && formData.IsNotNullOrEmpty())
            {
                HandleFormData(FormName, formData);
                isSaved = DynamicFormRepository.Create(FormName, formData);
            }
            return isSaved;
        }
        public bool Update(string FormName, Dictionary<string, object> formData)
        {
            bool isSaved = false;
            if (FormName.IsNotNullOrEmpty() && formData.IsNotNullOrEmpty())
            {
                //List<KeyValuePair<string, JObject>> CatalogData = formData.Where(formField => formField.Value != null && formField.Value is JObject).Select(formField => new KeyValuePair<string, JObject>(formField.Key, ((JObject)formField.Value))).ToList();
                //CatalogData.ForEach(catalogData => formData[catalogData.Key] = catalogData.Value["code"].ToString());
                HandleFormData(FormName, formData);
                isSaved = DynamicFormRepository.Update(FormName, formData);
            }
            return isSaved;
        }
        public bool Delete(string FormName, Dictionary<string, object> formData)
        {
            bool isSaved = false;
            if (FormName.IsNotNullOrEmpty() && formData.IsNotNullOrEmpty())
            {
                HandleFormData(FormName, formData);
                isSaved = DynamicFormRepository.Delete(FormName, formData);
            }
            return isSaved;
        }
        private void HandleFormData(string formName, Dictionary<string, object> formData)
        {
            List<FormFieldConfiguration> controlsConfig = DynamicFormRepository.GetFormControls(formName);
            List<FormFieldConfiguration> dataComboControls = controlsConfig.Where(c => c.Type == "datacombo" && formData.Keys.Contains(c.Name)).ToList();
            List<FormFieldConfiguration> dateControls = controlsConfig.Where(c => c.Type == "datetime" && formData.Keys.Contains(c.Name)).ToList();
            HandleCatalogControls(dataComboControls, formData);
            HandleDateControls(dateControls, formData);
        }
        private void HandleCatalogControls(List<FormFieldConfiguration> controlsConfig, Dictionary<string, object> formData)
        {
            controlsConfig.ForEach(control =>
            {
                if (formData[control.Name] is JObject)
                {
                    CatalogData catalogData = JsonConvert.DeserializeObject<CatalogData>(formData[control.Name].ToString());
                    formData[control.Name] = catalogData.Code;
                }
            });
        }
        private void HandleDateControls(List<FormFieldConfiguration> controlsConfig, Dictionary<string, object> formData)
        {
            controlsConfig.ForEach(control =>
            {
                if (formData[control.Name] != null && formData[control.Name].ToString() != string.Empty)
                {
                    JsonSerializerSettings settings = new JsonSerializerSettings();
                    settings.DateFormatHandling = Newtonsoft.Json.DateFormatHandling.IsoDateFormat;
                    formData[control.Name] = JsonConvert.DeserializeObject<DateTime>(formData[control.Name].ToString(),settings);
                    Convert.ToDateTime(formData[control.Name]);
                }
            });
        }
    }
}
