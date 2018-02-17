namespace Core.Common.Contracts.DynamicForm.Models
{
    public class Validations
    {
        public bool IsRequired { get; set; }
        public string MaxValue { get; set; }
        public string MinValue { get; set; }
        public string Pattern { get; set; }
    }
}
