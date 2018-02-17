using Core.Common.Contracts.DynamicForm;
using Core.Common.Contracts.DynamicGrid;
using Core.Common.Contracts.DynamicView.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Core.Application.Controllers
{
    public class DynamicViewController : ApiController
    {
        private IDynamicFormFacade dynamicFormFacade;
        private IDynamicGridFacade dynamicGridFacade;
        public DynamicViewController(IDynamicFormFacade DynamicFormFacade, IDynamicGridFacade DynamicGridFacade)
        {
            dynamicFormFacade = DynamicFormFacade;
            dynamicGridFacade = DynamicGridFacade;

        }
        [HttpGet]
        [Route("api/DynamicView/{id}")]
        public DynamicView Get(string id)
        {
            DynamicView dynamicView = new DynamicView();
            dynamicView.FormConfig = dynamicFormFacade.GetFormConfig(id);
            dynamicView.GridConfig = dynamicGridFacade.GetGridConfig(dynamicView.FormConfig.GridConfigId);
            return dynamicView;
        }
    }
}
