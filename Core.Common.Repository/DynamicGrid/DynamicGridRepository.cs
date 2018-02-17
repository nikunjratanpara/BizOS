using Core.Common.Contracts.DynamicGrid;
using Framework.Base.BL.DataAccess;
using System;
using Core.Common.Contracts.DynamicGrid.Models;
using Dapper;
using static Dapper.SqlMapper;
using System.Linq;
using Core.Common.Contracts.DynamicForm.Models;
using Core.Common.Contracts.DynamicForm;
using System.Threading.Tasks;
using System.Collections.Generic;
using Core.Common.Repository.DynamicGrid.DomainObjects;
using Core.Common.Extensions;
using System.Text;

namespace Core.Common.Repository.DynamicGrid
{
    public class DynamicGridRepository : BaseRepository, IDynamicGridRepository
    {
        private IDynamicFormRepository dynamicFormRepository;
        internal IDynamicFormRepository DynamicFormRepository
        {
            get { return dynamicFormRepository = dynamicFormRepository ?? GetRepository<IDynamicFormRepository>(); }
        }
        public GridOutcome GetData(string GridConfigId, Dictionary<string,object> parameters)
        {
            GridOutcome outcome = null;
            if (GridConfigId.IsNotNullOrEmpty())
            {
                outcome = new GridOutcome();
                object param = new object();
                string sql = GetDataQuery(GridConfigId, parameters);
                if (parameters.IsNotNullOrEmpty())
                {
                   param = parameters.ToDynamicObject();
                }
                outcome.ResultSet = Connection.Query<dynamic>(sql, param).AsList();
            }
            return outcome;
        }

        public GridConfiguration GetGridConfig(string GridConfigId)
        {
            GridConfiguration gridConfiguration = null;
            string sql = @"select * from GridConfiguration where GridConfigId=@GridConfigId;";
            using (Connection)
            {
                gridConfiguration = Connection.Query<GridConfiguration, SourceConfiguration, GridConfiguration>(
                        sql,
                        (gridConfig, sourceConfig) =>
                        {
                            gridConfig.Source = sourceConfig;
                            return gridConfig;
                        },
                         new { GridConfigId = GridConfigId }
                        , splitOn: "Url").FirstOrDefault();
                if (gridConfiguration != null)
                {
                    gridConfiguration.SearchConfig = DynamicFormRepository.GetFormConfig(gridConfiguration.SearchConfigId);
                    gridConfiguration.SearchConfig.Controls = DynamicFormRepository.GetFormControls(gridConfiguration.SearchConfigId);
                    gridConfiguration.Cols = GetGridColumns(GridConfigId);
                }
            }
            return gridConfiguration;
        }
        private string GetDataQuery(string GridConfigId, Dictionary<string, object> parameters)
        {
            StringBuilder queryBuilder = new StringBuilder();
            string sqlSource = "SELECT * from SqlSourceConfiguration where GridConfigId=@GridConfigId;";
            string sql = @"select * from GridConfiguration where GridConfigId=@GridConfigId;";
            Query<SqlSourceConfiguration>();
            GridConfigurationEO gridConfiguration = Connection.Query<GridConfigurationEO>(sql, new { GridConfigId = GridConfigId }).FirstOrDefault();
            gridConfiguration.Controls = DynamicFormRepository.GetFormControls(gridConfiguration.SearchConfigId).AsList();
            queryBuilder.Append("Select ");
            queryBuilder.Append("* ");
            queryBuilder.Append(" from ");
            queryBuilder.Append( gridConfiguration.TableName);
            if (gridConfiguration.Controls.IsNotNullOrEmpty() && parameters.IsNotNullOrEmpty())
            {
                queryBuilder.Append(" where ");
                gridConfiguration.Controls.ForEach(control =>
                {
                    if (parameters.ContainsKey(control.Name))
                    {
                        queryBuilder.Append(control.Name);
                        queryBuilder.Append(" ");
                        queryBuilder.Append(control.SearchOperator);
                        queryBuilder.Append(" @");
                        queryBuilder.Append(control.Name);
                        queryBuilder.Append(" And ");
                    }
                });
                queryBuilder = queryBuilder.Remove(queryBuilder.Length - 4, 4);
            }
            return queryBuilder.ToString();
        }
        private List<GridColumnConfiguration> GetGridColumns(string GridConfigId)
        {
            List<GridColumnConfiguration> gridColumnsConfiguration = null;
            string sql = @"select * from GridColumnConfiguration where GridConfigId=@GridConfigId;";
            using (Connection)
            {
                gridColumnsConfiguration= Connection.Query<GridColumnConfiguration>(sql, new { GridConfigId = GridConfigId }).AsList();
            }
            return gridColumnsConfiguration;
        }

        public override object GetPocoObject<T>(T Model)
        {
            return Model;
        }
    }
}
