using System;
using System.Collections.Generic;
using BizOS.Common.Contracts.DynamicForm;
using BizOS.Common.Contracts.DynamicForm.Models;
using BizOS.Base.BL;
using Unity;

namespace BizOS.Common.BL.DynamicForm
{
    public class DynamicFormFacade :  BusinessComponent, IDynamicFormFacade
    {
        private IDynamicFormComponent dynamicFormComponent;

        public DynamicFormFacade(IUnityContainer container) : base(container)
        {
        }

        internal IDynamicFormComponent DynamicFormComponent
        {
            get
            {
                return dynamicFormComponent = dynamicFormComponent ?? GetBusinessComponent<IDynamicFormComponent>();
            }
            set
            {
                dynamicFormComponent = value;
            }
        }
        public FormConfiguration GetFormConfig(string FormName)
        {
            return DynamicFormComponent.GetFormConfig(FormName);
        }

        public bool Create(string FormName, Dictionary<string,object> formData)
        {
            return DynamicFormComponent.Create(FormName, formData);
        }

        public bool Update(string FormName, Dictionary<string, object> formData)
        {
            return DynamicFormComponent.Update(FormName, formData);
        }

        public bool Delete(string FormName, Dictionary<string, object> formData)
        {
            return DynamicFormComponent.Delete(FormName, formData);
        }
    }
}
