using BizOS.Common.Contracts.Catalog;
using BizOS.Common.Contracts.Catalog.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Unity;

namespace BizOS.Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CatalogController :ControllerBase
    {
        private ICatalogServiceFacade CatalogService;
        public CatalogController(IUnityContainer container)
        {
            this.CatalogService = container.Resolve<ICatalogServiceFacade>();
        }
        [HttpPost()]
        public List<CatalogData> GetCatalogData(CatalogRequest catalogRequest)
        {
            return CatalogService.GetCatalogData(catalogRequest);
        }
        [HttpGet()]
        public CatalogMetaData GetCatalogDefination([FromQuery]string CatalogName)
        {
            return CatalogService.GetCatalogMetaData(CatalogName);
        }
    }
}
