using Microsoft.Extensions.Configuration;
using System.Configuration;

namespace BizOS.Application.App_Start
{
    public class WebConfigProvider : ConfigurationProvider, IConfigurationProvider
    {
        public override void Load()
        {
            base.Load();
            foreach(ConnectionStringSettings connectionString in ConfigurationManager.ConnectionStrings)
            {
                Data.Add($"ConnectionStrings:{connectionString.Name}", connectionString.ConnectionString);
            }
            foreach (var settingKey in ConfigurationManager.AppSettings.AllKeys)
            {
                Data.Add(settingKey, ConfigurationManager.AppSettings[settingKey]);
            }
        }
    }
}