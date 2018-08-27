using BizOS.Common.Contracts.Module;
using BizOS.Common.Contracts.Module.Models;
using BizOS.Base.BL;
using System.Collections.Generic;
using System.Web.Http;

namespace BizOS.Application.Controllers
{
    public class ModuleController : ApiController
    {
        /*IModuleFacade moduleFacade;
        IModuleFacade ModuleFacade
        {
            get { return moduleFacade = moduleFacade ?? GetBusinessService<IModuleFacade>(); }
            set { moduleFacade = value; }
        }*/
        IModuleFacade ModuleFacade;
        public ModuleController(IModuleFacade ModuleFacade)
        {
            this.ModuleFacade = ModuleFacade;
        }
        [HttpGet]
        [Route("api/{moduleId}/menu")]
        public List<MenuConfig> Menu(string moduleId)
        {
            return this.ModuleFacade.GetMenu(moduleId);
        }
    }
}
