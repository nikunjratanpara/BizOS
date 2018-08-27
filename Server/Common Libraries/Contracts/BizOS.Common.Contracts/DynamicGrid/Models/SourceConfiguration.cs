namespace BizOS.Common.Contracts.DynamicGrid.Models
{
    public class SourceConfiguration
    {
       public string Url { get; set; }
       public string Method { get; set; }
       public dynamic Params { get; set; } 
    }
}
