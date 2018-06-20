using BizOS.Common.Contracts.DynamicForm.Models;
using BizOS.Common.Contracts.DynamicGrid.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BizOS.Common.Contracts.DynamicView.Models
{
    public class DynamicView
    {
        public FormConfiguration FormConfig { get; set; }
        public GridConfiguration GridConfig { get; set; }
    }
}
