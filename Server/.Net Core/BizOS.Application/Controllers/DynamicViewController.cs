using BizOS.Common.Contracts.DynamicForm;
using BizOS.Common.Contracts.DynamicGrid;
using BizOS.Common.Contracts.DynamicView.Models;
using Microsoft.AspNetCore.Mvc;
using Unity;

namespace BizOS.Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DynamicViewController : ControllerBase
    {
        private IDynamicFormFacade dynamicFormFacade;
        private IDynamicGridFacade dynamicGridFacade;
        public DynamicViewController(IUnityContainer container)
        {
            dynamicFormFacade = container.Resolve<IDynamicFormFacade>(); 
            dynamicGridFacade = container.Resolve<IDynamicGridFacade>();

        }
        [HttpGet("{id}")]
        public DynamicView Get(string id)
        {
            DynamicView dynamicView = new DynamicView();
            dynamicView.FormConfig = dynamicFormFacade.GetFormConfig(id);
            dynamicView.GridConfig = dynamicGridFacade.GetGridConfig(dynamicView.FormConfig.GridConfigId);
            return dynamicView;
        }
    }
}
