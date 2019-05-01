using BizOS.Common.Contracts.DynamicGrid;
using BizOS.Common.Contracts.DynamicGrid.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace BizOS.Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DynamicGridController : ControllerBase
    {
        private IDynamicGridFacade DynamicGridFacade;
        public DynamicGridController(IDynamicGridFacade dynamicGridFacade)
        {
            this.DynamicGridFacade = dynamicGridFacade;
        }
        [HttpGet("{id}")]
        public GridConfiguration GetGridConfig(string id)
        {
            return DynamicGridFacade.GetGridConfig(id);
        }
        [HttpPost("{id}")]
        public async Task<GridOutcome> GetDataAsync(string id,[FromBody] GridDataRequest parameters)
        {
            return await DynamicGridFacade.GetDataAsync(id, parameters);
        }
    }
}