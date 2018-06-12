
using Core.Common.Contracts.DynamicForm;
using Core.Common.Contracts.DynamicForm.Models;
using System.Collections.Generic;
using System.Web.Http;

namespace Core.Common.API.Controllers
{
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
        [Route("api/DynamicForm/{id:minlength(3)}")]
        public FormConfiguration Get(string id)
        {
            return DynamicFormFacade.GetFormConfig(id);
        }
        [HttpPost]
        [Route("api/DynamicForm/{id:minlength(3)}")]
        public bool Post(string id,Dictionary<string,object> formData)
        {
            return DynamicFormFacade.Create(id, formData);
        }
        [HttpPut]
        [Route("api/DynamicForm/{id:minlength(3)}")]
        public bool Put(string id, Dictionary<string, object> formData)
        {
            return DynamicFormFacade.Update(id, formData);
        }
        [HttpDelete]
        [Route("api/DynamicForm/{formName:minlength(3)}")]
        public bool Delete(string formName, [FromBody] Dictionary<string, object> formData)
        {
            return DynamicFormFacade.Delete(formName, formData);
        }
    }
}
