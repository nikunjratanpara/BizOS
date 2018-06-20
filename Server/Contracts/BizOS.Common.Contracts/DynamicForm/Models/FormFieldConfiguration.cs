namespace BizOS.Common.Contracts.DynamicForm.Models
{
    public class FormFieldConfiguration
    {
        public string Name { get; set; }
        public string Label { get; set; }
        public string Type { get; set; }
        public string Placeholder { get; set; }
        public string SearchOperator { get; set; }
        public bool IsUpdatable { get; set; }
        // public UInt64 ObjectId { get; set; }
        public Validations CustomValidation { get; set; }
        public CatalogFieldConfig TypeaheadOptions { get; set; }
        public DatetimeFieldConfig DatetimePickerOptions { get; set; }
    }
}
