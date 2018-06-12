using System.Collections.Generic;

namespace Core.Common.Contracts.Module.Models
{
    public class MenuConfig
    {
       public string Name { get; set; }
       public List<MenuConfig> Children { get; set; }
       public List<string> Component { get; set; }
    }
    
}