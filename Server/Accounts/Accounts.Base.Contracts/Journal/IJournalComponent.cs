
using Accounts.Base.Contracts.Journal.Models;
using System.Collections.Generic;

namespace Accounts.Base.Contracts.Journal
{
    public interface IJournalComponent
    {
        bool Create(JournalEntry journalEntry);
        bool Update(JournalEntry journalEntry);
        bool Delete(long TransId);
        List<JournalEntry> GetJournalEntryByParameter(JournalRequestParameter journalRequestParameter);
    }
}
