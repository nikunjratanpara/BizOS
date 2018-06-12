using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Common.Contracts.Module.DomainObjects
{
    public class Menu
    {
        public int MenuId { get; set; }
        public string ModuleId { get; set; }
        public string Name { get; set; }
        public int? ParentId { get; set; }
        public string Config { get; set; }
    }
}
