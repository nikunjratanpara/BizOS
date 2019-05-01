using Accounts.Base.Contracts.Journal.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Accounts.Base.Contracts.Journal
{
    public interface IJournalRepository
    {
        bool Create(JournalEntry journalEntry);
        bool Delete(long TransId);
        List<JournalEntry> GetJournalEntryByParameter(JournalRequestParameter journalRequestParameter);
        bool Update(JournalEntry journalEntry);
    }
}
