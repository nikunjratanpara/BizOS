using System;
using System.Collections.Generic;

namespace Accounts.Base.Contracts.Journal.Models
{
    public class JournalEntry
    {
        public long TransId { get; set; }
        public long FinancialYear { get; set; }
        public string TransNr { get; set; }
        public DateTime Date { get; set; }
        public string Remarks { get; set; }
        public JournalType Type { get; set; }
        public bool IsAdvancePay { get; set; }
        public bool IsChecked { get; set; }
        public List<JournalDetails> JournalDetails { get; set; }
    }
}
