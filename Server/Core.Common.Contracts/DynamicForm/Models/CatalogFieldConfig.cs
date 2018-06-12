namespace Core.Common.Contracts.DynamicForm.Models
{
    public class CatalogFieldConfig
    {
        public string CatId { get; set; }
        public ComboDisplayStyle DisplayStyle { get; set; }
        public CatalogFieldConfig()
        {
            DisplayStyle = ComboDisplayStyle.CodeDesciption;
        }
    }
}
