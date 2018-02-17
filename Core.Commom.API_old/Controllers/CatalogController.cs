using Core.Common.Contracts.Catalog;
using Core.Common.Contracts.Catalog.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Core.Commom.API.Controllers
{
    [RoutePrefix("Catalog")]
    public class CatalogController : ApiController
    {
        private ICatalogServiceFacade CatalogService;
        public CatalogController(ICatalogServiceFacade CatalogServiceFacade)
        {
            this.CatalogService = CatalogServiceFacade;
        }
        [HttpPost]
        public List<CatalogData> GetCatalogData([FromBody]CatalogRequest catalogRequest)
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