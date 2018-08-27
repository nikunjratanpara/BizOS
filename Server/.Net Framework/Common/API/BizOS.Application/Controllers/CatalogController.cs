using BizOS.Common.Contracts.Catalog;
using BizOS.Common.Contracts.Catalog.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BizOS.Application.Controllers
{
    public class CatalogController : ApiController
    {
        private ICatalogServiceFacade CatalogService;
        public CatalogController(ICatalogServiceFacade CatalogServiceFacade)
        {
            this.CatalogService = CatalogServiceFacade;
        }
        [HttpPost]
        [Route("api/Catalog")]
        public List<CatalogData> GetCatalogData(CatalogRequest catalogRequest)
        {
            return CatalogService.GetCatalogData(catalogRequest);
        }
        [HttpGet]
        public CatalogMetaData GetCatalogDefination([FromUri]string CatalogName)
        {
            return CatalogService.GetCatalogMetaData(CatalogName);
        }
    }
}