using BizOS.Common.Contracts.Catalog;
using BizOS.Common.Contracts.Catalog.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BizOS.Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CatalogController :ControllerBase
    {
        private ICatalogServiceFacade CatalogService;
        public CatalogController(ICatalogServiceFacade catalogService)
        {
            this.CatalogService = catalogService;
        }
        [HttpPost()]
        public async Task<IEnumerable<CatalogData>> GetCatalogDataAsync(CatalogRequest catalogRequest)
        {
            return await CatalogService.GetCatalogDataAsync(catalogRequest);
        }
        [HttpGet()]
        public CatalogMetaData GetCatalogDefination([FromQuery]string CatalogName)
        {
            return CatalogService.GetCatalogMetaData(CatalogName);
        }
    }
}
