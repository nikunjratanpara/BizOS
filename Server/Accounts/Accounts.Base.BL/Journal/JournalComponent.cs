using Accounts.Base.Contracts.Journal;
using Accounts.Base.Contracts.Journal.Models;
using BizOS.Base.BL;
using System;
using System.Collections.Generic;


namespace Accounts.Base.BL.Journal
{
    public class JournalComponent : BusinessComponent, IJournalComponent
    {
        public JournalComponent(IServiceProvider provider): base(provider)
        {}
        public bool Create(JournalEntry journalEntry)
        {
            return true;
        }

        public bool Delete(long TransId)
        {
            return true;
        }

        public List<JournalEntry> GetJournalEntryByParameter(JournalRequestParameter journalRequestParameter)
        {
            return null;
        }

        public bool Update(JournalEntry journalEntry)
        {
            return true;
        }
    }
}
