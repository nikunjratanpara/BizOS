using Core.Common.Contracts.Module;
using Core.Common.Contracts.Module.Models;
using Framework.Base.BL;
using System.Collections.Generic;
using System.Web.Http;

namespace Core.Application.Controllers
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
