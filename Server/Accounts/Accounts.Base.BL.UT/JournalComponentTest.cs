using Accounts.Base.BL.Journal;
using System;
using Moq;
using Xunit;

namespace Accounts.Base.BL.UT
{
    public class JournalComponentTest
    {
        Mock<IServiceProvider> mockServiceProvider = new Mock<IServiceProvider>();
        JournalComponent journalComponent;
        public JournalComponentTest()
        {
            journalComponent = new JournalComponent(mockServiceProvider.Object);
        }
        [Fact]
        [Trait("Should save journal with valid Data","")]
        public void Save_JournalValidData()
        {
            journalComponent.Create();
        }

    }
}
