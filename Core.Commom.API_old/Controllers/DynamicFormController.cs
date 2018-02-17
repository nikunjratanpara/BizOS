
using Core.Common.Contracts.DynamicForm;
using Core.Common.Contracts.DynamicForm.Models;
using System.Collections.Generic;
using System.Web.Http;

namespace Core.Common.API.Controllers
{
    [RoutePrefix("DynamicForm")]
    public class DynamicFormController : ApiController
    {
        public DynamicFormController(IDynamicFormFacade DynamicFormFacade)
        {
            dynamicFormFacade = DynamicFormFacade;
        }
        private IDynamicFormFacade dynamicFormFacade;
        public IDynamicFormFacade DynamicFormFacade
        {
            get
            {
                return dynamicFormFacade;
            }
        }
        [HttpGet]
        public List<CatalogFormConfiguration> GetFormConfig([FromUri]string FormName)
        {
            return DynamicFormFacade.GetFormConfig(FormName);
        }
        [HttpPost]
        public bool SaveForm([FromBody]string FormName, [FromBody]dynamic formData)
        {
            return DynamicFormFacade.SaveForm(FormName, formData);
        }
    }
}
