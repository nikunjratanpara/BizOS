namespace QueryProvider.SqlServer.QueryBase
{
    public class CatalogQueryBase : QueryBase
    {
        public CatalogQueryBase()
        {
            Add("CatalogDictionary", "select * from CatalogDictionary where CatalogId= @CatalogId");
        }
    }
}
