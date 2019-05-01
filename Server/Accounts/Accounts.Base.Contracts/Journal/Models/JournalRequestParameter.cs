using System;
using System.Collections.Generic;
using System.Text;

namespace Accounts.Base.Contracts.Journal.Models
{
    public class JournalRequestParameter
    {
        DateTime FromDate { get; set; }
        DateTime ToDate { get; set; }
        List<long> TransactionIds { get; set; }
        long AccountNo { get; set; }
    }
}
