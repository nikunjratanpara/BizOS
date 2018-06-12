namespace Core.Common.Contracts.Catalog.Models
{
    public class CatalogFilterOptions
    {
       public string Term { get; set; }
       public bool ShowAll { get; set; }
       public bool SearchExact { get; set; }
       public bool SearchCodeOnly { get; set; }
       public bool SearchDescriptionOnly { get; set; }
    }
}