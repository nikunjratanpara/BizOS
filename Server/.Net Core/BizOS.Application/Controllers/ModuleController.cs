using BizOS.Common.Contracts.Module;
using BizOS.Common.Contracts.Module.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;


namespace BizOS.Application.Controllers
{
    [Route("api/")]
    [ApiController]
    public class ModuleController : ControllerBase
    {
        IModuleFacade ModuleFacade;
        public ModuleController(IModuleFacade moduleFacade)
        {
            this.ModuleFacade = moduleFacade;
        }
        [HttpGet("{moduleId}/menu")]
        public List<MenuConfig> Menu(string moduleId)
        {
            return this.ModuleFacade.GetMenu(moduleId);
        }
    }
}
