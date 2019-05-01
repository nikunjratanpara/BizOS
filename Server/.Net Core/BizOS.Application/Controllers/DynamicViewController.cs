using BizOS.Common.Contracts.DynamicForm;
using BizOS.Common.Contracts.DynamicGrid;
using BizOS.Common.Contracts.DynamicView.Models;
using Microsoft.AspNetCore.Mvc;
using System;

namespace BizOS.Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DynamicViewController : ControllerBase
    {
        private IDynamicFormFacade DynamicFormFacade;
        private IDynamicGridFacade DynamicGridFacade;
        public DynamicViewController(IDynamicFormFacade dynamicFormFacade, IDynamicGridFacade dynamicGridFacade)
        {
            DynamicFormFacade = dynamicFormFacade;
            DynamicGridFacade = dynamicGridFacade;

        }
        [HttpGet("{id}")]
        public DynamicView Get(string id)
        {
            DynamicView dynamicView = new DynamicView();
            dynamicView.FormConfig = DynamicFormFacade.GetFormConfig(id);
            dynamicView.GridConfig = DynamicGridFacade.GetGridConfig(dynamicView.FormConfig.GridConfigId);
            return dynamicView;
        }
    }
}
