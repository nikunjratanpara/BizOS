using System;

namespace BizOS.Common.Contracts.DynamicForm.Models
{
    public class DatetimeFieldConfig
    {
        public DateTime? MaxDate { get; set; }
        public DateTime? MinDate { get; set; }
        public string DisplayFormat { get; set; }
    }
}
