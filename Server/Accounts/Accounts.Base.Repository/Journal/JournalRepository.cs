using Accounts.Base.Contracts.Journal;
using Accounts.Base.Contracts.Journal.Models;
using BizOS.Base.BL.DataAccess;
using System;
using System.Collections.Generic;
using System.Text;

namespace Accounts.Base.Repository.Journal
{
    public class JournalRepository :BaseRepository, IJournalRepository
    {
        public JournalRepository(IServiceProvider container) : base(container)
        {

        }

        public bool Create(JournalEntry journalEntry)
        {
            throw new NotImplementedException();
        }

        public bool Delete(long TransId)
        {
            throw new NotImplementedException();
        }

        public List<JournalEntry> GetJournalEntryByParameter(JournalRequestParameter journalRequestParameter)
        {
            throw new NotImplementedException();
        }

        public bool Update(JournalEntry journalEntry)
        {
            throw new NotImplementedException();
        }
    }
}
