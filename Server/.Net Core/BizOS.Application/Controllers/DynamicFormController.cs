
using BizOS.Common.Contracts.DynamicForm;
using BizOS.Common.Contracts.DynamicForm.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Unity;

namespace BizOS.Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DynamicFormController : ControllerBase
    {
        public DynamicFormController(IUnityContainer container)
        {
            DynamicFormFacade = container.Resolve<IDynamicFormFacade>();
        }
        public IDynamicFormFacade DynamicFormFacade { get; }
        [HttpGet("{id}")]
        public FormConfiguration Get(string id)
        {
            return DynamicFormFacade.GetFormConfig(id);
        }
        [HttpPost("{id}")]
        public bool Post(string id,Dictionary<string,object> formData)
        {
            return DynamicFormFacade.Create(id, formData);
        }
        [HttpPut("{id}")]
        public bool Put(string id, Dictionary<string, object> formData)
        {
            return DynamicFormFacade.Update(id, formData);
        }
        [HttpDelete("{formName}")]
        public bool Delete(string formName, [FromBody] Dictionary<string, object> formData)
        {
            return DynamicFormFacade.Delete(formName, formData);
        }
    }
}
