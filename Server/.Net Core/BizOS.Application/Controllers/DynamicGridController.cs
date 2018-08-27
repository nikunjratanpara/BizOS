using BizOS.Common.Contracts.DynamicGrid;
using BizOS.Common.Contracts.DynamicGrid.Models;
using Microsoft.AspNetCore.Mvc;
using Unity;

namespace BizOS.Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DynamicGridController : ControllerBase
    {
        private IDynamicGridFacade DynamicGridFacade;
        public DynamicGridController(IUnityContainer container)
        {
            this.DynamicGridFacade = container.Resolve<IDynamicGridFacade>();
        }
        [HttpGet("{id}")]
        public GridConfiguration GetGridConfig(string id)
        {
            return DynamicGridFacade.GetGridConfig(id);
        }
        [HttpPost("{id}")]
        public GridOutcome GetData(string id,[FromBody] GridDataRequest parameters)
        {
            return DynamicGridFacade.GetData(id, parameters);
        }
    }
}