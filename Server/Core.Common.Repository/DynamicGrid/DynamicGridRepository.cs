using Core.Common.Contracts.DynamicGrid;
using Framework.Base.BL.DataAccess;
using Core.Common.Contracts.DynamicGrid.Models;
using Dapper;
using System.Linq;
using Core.Common.Contracts.DynamicForm;
using System.Collections.Generic;
using Core.Common.Repository.DynamicGrid.DomainObjects;
using Core.Common.Extensions;
using System.Text;
using System;
using static Dapper.SqlMapper;
using Core.Common.Contracts.Constants;
using Framework.Base.Contracts.DataAccess;

namespace Core.Common.Repository.DynamicGrid
{
    public class DynamicGridRepository : BaseRepository, IDynamicGridRepository
    {
        private IDynamicFormRepository dynamicFormRepository;

        public DynamicGridRepository() : base(QueryProviders.DynamicGrid)
        {
        }

        internal IDynamicFormRepository DynamicFormRepository
        {
            get { return dynamicFormRepository = dynamicFormRepository ?? GetRepository<IDynamicFormRepository>(); }
        }
        public GridOutcome GetData(string GridConfigId, GridDataRequest gridDataRequest)
        {
            GridOutcome outcome = null;
            if (GridConfigId.IsNotNullOrEmpty())
            {
                outcome = new GridOutcome();
                object param = new object();
                string sql = GetDataQuery(GridConfigId, gridDataRequest);
                if (gridDataRequest.Parameters.IsNotNullOrEmpty())
                {
                    param = gridDataRequest.Parameters.ToDynamicObject();
                }
                GridReader reader = Connection.QueryMultiple(sql, param);
                outcome.ResultSet = reader.Read<dynamic>().ToList();
                outcome.PageNo = gridDataRequest.PageNo;
                outcome.TotalRecords = reader.Read<int>().Single();
            }
            return outcome;
        }

        public GridConfiguration GetGridConfig(string GridConfigId)
        {
            GridConfiguration gridConfiguration = null;
            string sql = GetQuery("GridConfiguration");
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
                if (gridConfiguration != null )
                {
                    if (gridConfiguration.SearchConfigId.IsNotNullOrEmpty())
                    {
                        gridConfiguration.SearchConfig = DynamicFormRepository.GetFormConfig(gridConfiguration.SearchConfigId);
                        gridConfiguration.SearchConfig.Controls = DynamicFormRepository.GetFormControls(gridConfiguration.SearchConfigId);
                    }
                    gridConfiguration.Columns = GetGridColumns(GridConfigId);
                }
            }
            return gridConfiguration;
        }
        private string GetDataQuery(string GridConfigId, GridDataRequest gridDataRequest)
        {
            StringBuilder queryBuilder = new StringBuilder();
            string sqlSource = GetQuery("SqlSourceConfiguration");
            string sql = GetQuery("GridConfiguration");
            SqlSourceConfiguration sourceConfig = Connection.Query<SqlSourceConfiguration>(sqlSource, new { GridConfigId }).FirstOrDefault();

            GridConfigurationEO gridConfiguration = Connection.Query<GridConfigurationEO>(sql, new { GridConfigId }).FirstOrDefault();
            gridConfiguration.Controls = DynamicFormRepository.GetFormControls(gridConfiguration.SearchConfigId).AsList();

            if (sourceConfig == null)
            {
                queryBuilder.Append("Select ");
                queryBuilder.Append("* ");
                queryBuilder.Append(" from ");
                queryBuilder.Append(gridConfiguration.TableName);
            }
            else
            {
                queryBuilder.Append(sourceConfig.SqlQuery);
                if (sourceConfig.Condition.IsNotNullOrEmpty())
                {
                    queryBuilder.Append(sourceConfig.Condition);
                }
            }

            if (gridConfiguration.Controls.IsNotNullOrEmpty() && gridDataRequest.Parameters.IsNotNullOrEmpty())
            {
                if(!queryBuilder.ToString().Contains(" where "))
                    queryBuilder.Append(" where ");
                gridConfiguration.Controls.ForEach
                    (control =>
                        {
                            if (gridDataRequest.Parameters.ContainsKey(control.Name))
                            {
                                queryBuilder.Append(control.Name);
                                queryBuilder.Append(" ");
                                queryBuilder.Append(control.SearchOperator);
                                queryBuilder.Append(" @");
                                queryBuilder.Append(control.Name);
                                queryBuilder.Append(" And ");
                            }
                        }
                    );
                queryBuilder = queryBuilder.Remove(queryBuilder.Length - 4, 4);
            }
            if(gridDataRequest.OrderBy.IsNotNullOrEmpty())
            {
                PaginationSettings paginationSettings = new PaginationSettings
                {
                    OrderBy = gridDataRequest.OrderBy,
                    PageNo = gridDataRequest.PageNo,
                    PageSize = gridDataRequest.PageSize
                };
                string query = queryBuilder.ToString();
                queryBuilder.Clear();
                queryBuilder.Append(Paginate(query, paginationSettings));
                queryBuilder.Append(Environment.NewLine);
                queryBuilder.Append(GetCountQuery(queryBuilder.ToString()));
            }
            return queryBuilder.ToString();
        }
        private List<GridColumnConfiguration> GetGridColumns(string GridConfigId)
        {
            List<GridColumnConfiguration> gridColumnsConfiguration = null;
            string sql = GetQuery("GridColumnConfiguration");
            using (Connection)
            {
                gridColumnsConfiguration = Connection.Query<GridColumnConfiguration>(sql, new { GridConfigId }).AsList();
            }
            return gridColumnsConfiguration;
        }

        public override object GetPocoObject<T>(T Model)
        {
            return Model;
        }
    }
}
