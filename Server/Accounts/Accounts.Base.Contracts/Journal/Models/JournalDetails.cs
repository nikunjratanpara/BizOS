namespace Accounts.Base.Contracts.Journal.Models
{
    public class JournalDetails
    {
        public long TransId { get; set; }
        public long FinancialYear { get; set; }
        public double Debit { get; set; }
        public double Credit { get; set; }
        public long AccountNo { get; set; }
    }
}
