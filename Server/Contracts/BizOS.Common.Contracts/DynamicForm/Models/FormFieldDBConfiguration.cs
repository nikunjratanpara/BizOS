namespace BizOS.Common.Contracts.DynamicForm.Models
{
    public class FormFieldDBConfiguration
    {
        public string Name { get; set; }
        public Validations CustomValidation { get; set; }
        public DatabaseAttributes  DBAttributes { get; set; }
    }
}
