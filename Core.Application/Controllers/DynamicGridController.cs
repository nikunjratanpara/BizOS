using Core.Common.Contracts.DynamicGrid;
using Core.Common.Contracts.DynamicGrid.Models;
using System.Collections.Generic;
using System.Web.Http;

namespace Core.Application.Controllers
{
    public class DynamicGridController : ApiController
    {
        private IDynamicGridFacade DynamicGridFacade;
        public DynamicGridController( IDynamicGridFacade DynamicGridFacade)
        {
            this.DynamicGridFacade = DynamicGridFacade;
        }
        [HttpGet]
        [Route("api/DynamicGrid/{id:minlength(3)}")]
        public GridConfiguration GetGridConfig(string id)
        {
            return DynamicGridFacade.GetGridConfig(id);
        }
        [HttpPost]
        [Route("api/DynamicGrid/{id:minlength(3)}")]
        public List<dynamic> GetData(string id,[FromBody] Dictionary<string, object> parameters)
        {
            return DynamicGridFacade.GetData(id, parameters).ResultSet;
        }
    }
}
