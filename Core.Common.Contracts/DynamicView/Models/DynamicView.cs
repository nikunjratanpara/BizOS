using Core.Common.Contracts.DynamicForm.Models;
using Core.Common.Contracts.DynamicGrid.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Common.Contracts.DynamicView.Models
{
    public class DynamicView
    {
        public FormConfiguration FormConfig { get; set; }
        public GridConfiguration GridConfig { get; set; }
    }
}
