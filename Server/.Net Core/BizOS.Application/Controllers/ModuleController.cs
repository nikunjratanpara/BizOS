using BizOS.Common.Contracts.Module;
using BizOS.Common.Contracts.Module.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Unity;

namespace BizOS.Application.Controllers
{
    [Route("api/")]
    [ApiController]
    public class ModuleController : ControllerBase
    {
        IModuleFacade ModuleFacade;
        public ModuleController(IUnityContainer container)
        {
            this.ModuleFacade = container.Resolve<IModuleFacade>();
        }
        [HttpGet("{moduleId}/menu")]
        public List<MenuConfig> Menu(string moduleId)
        {
            return this.ModuleFacade.GetMenu(moduleId);
        }
    }
}
