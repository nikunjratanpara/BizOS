namespace Core.Common.Contracts.DynamicGrid.Models
{
    public class SqlSourceConfiguration
    {
        public string SqlQuery { get; set; }
        public SourceType SqlSourceType { get; set; }
        public string Condition { get; set; }
    }
}
