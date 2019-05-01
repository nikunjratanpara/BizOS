using BizOS.Base.BL.DataAccess;
using BizOS.Base.Contracts.DataAccess;
using BizOS.Common.Contracts.Constants;
using BizOS.Common.Contracts.DynamicForm;
using BizOS.Common.Contracts.DynamicGrid;
using BizOS.Common.Contracts.DynamicGrid.Models;
using BizOS.Common.Extensions;
using BizOS.Common.Repository.DynamicGrid.DomainObjects;
using Dapper;
using QueryProvider.Contracts.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SqlKata.Execution;
using static Dapper.SqlMapper;
using SqlKata;
using BizOS.Common.Contracts.DynamicForm.Models;

namespace BizOS.Common.Repository.DynamicGrid
{
    public class DynamicGridRepository : BaseRepository, IDynamicGridRepository
    {
        private IDynamicFormRepository dynamicFormRepository;
        internal IDynamicFormRepository DynamicFormRepository
        {
            get { return dynamicFormRepository = dynamicFormRepository ?? GetRepository<IDynamicFormRepository>(); }
        }

        private IDynamicGridQueryProvider _dynamicGridQueryProvider;
        internal IDynamicGridQueryProvider DynamicGridQueryProvider
        {
            get { return _dynamicGridQueryProvider = _dynamicGridQueryProvider ?? GetRepository<IDynamicGridQueryProvider>(); }
        }

        public DynamicGridRepository(IServiceProvider provider): base(provider)
        {
        }

        public async Task<GridOutcome> GetDataAsync(string GridConfigId, GridDataRequest gridDataRequest)
        {
            GridOutcome outcome = null;
            if (GridConfigId.IsNotNullOrEmpty())
            {
                outcome = await GetDataQueryAsync(GridConfigId, gridDataRequest);
            }
            return outcome;
        }

        public GridConfiguration GetGridConfig(string GridConfigId)
        {
            GridConfiguration gridConfiguration = null;
            using (Connection)
            {
                gridConfiguration = Connection.Query<GridConfiguration, SourceConfiguration, GridConfiguration>(
                        DynamicGridQueryProvider.GridConfiguration,
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
        private async Task<GridOutcome> GetDataQueryAsync(string GridConfigId, GridDataRequest gridDataRequest)
        {
            StringBuilder queryBuilder = new StringBuilder();
            Task<SqlSourceConfiguration> sourceConfigTask = GetSourceConfig(GridConfigId);
            Task<GridConfigurationEO> gridConfigurationTask = GetGridConfiguration(GridConfigId);
            await Task.WhenAll(sourceConfigTask, gridConfigurationTask);

            SqlSourceConfiguration sourceConfig = sourceConfigTask.Result;
            GridConfigurationEO gridConfiguration = gridConfigurationTask.Result;

            gridConfiguration.Controls = DynamicFormRepository.GetFormControls(gridConfiguration.SearchConfigId).AsList();

            Query query = null;
            Query countQuery = null;
            if (sourceConfig == null)
            {
                query = db.Query(gridConfiguration.TableName);
            }
            else
            {
                query = db.Query().FromRaw(sourceConfig.SqlQuery);
                if (sourceConfig.Condition.IsNotNullOrEmpty())
                {
                    query = query.Where(sourceConfig.Condition);
                }
            }
            if (gridConfiguration.Controls.IsNotNullOrEmpty() && gridDataRequest.Parameters.IsNotNullOrEmpty())
            {
                IEnumerable<FormFieldConfiguration> controls = gridConfiguration.Controls.Where(control => gridDataRequest.Parameters.ContainsKey(control.Name));
                foreach (FormFieldConfiguration control in controls)
                {
                    HandleSearchOperators(gridDataRequest, control,query);
                }
            }
            countQuery = db.FromQuery(query).AsCount();
            if (gridDataRequest.OrderBy.IsNotNullOrEmpty())
            {
                query = query.OrderBy(gridDataRequest.OrderBy);
            }
            if (gridDataRequest.PageNo > 0 && gridDataRequest.PageSize > 0)
            {
                query = query.Skip((gridDataRequest.PageNo - 1) * gridDataRequest.PageSize).Take(gridDataRequest.PageSize);
            }
            Task<IEnumerable<dynamic>> resultSet = query.GetAsync<dynamic>();
            int cnt = db.ExecuteScalar<int>(countQuery);
            Task.WaitAll(resultSet);
            Task<GridOutcome> gridOutcome = new Task<GridOutcome>(() => {
                return new GridOutcome
                {
                    ResultSet = resultSet.Result.ToList(),
                    PageNo = gridDataRequest.PageNo,
                    TotalRecords = cnt
                };
            });
            gridOutcome.RunSynchronously();
            return await gridOutcome ;
        }

        private void HandleSearchOperators(GridDataRequest gridDataRequest, FormFieldConfiguration control, Query query)
        {
            if (control.SearchOperator.ToUpper() == Operators.CONTAINS)
                query.WhereContains(control.Name, gridDataRequest.Parameters[control.Name].ToString());
            else if (control.SearchOperator.ToUpper() == Operators.STARTWITH)
                query.WhereStarts(control.Name, gridDataRequest.Parameters[control.Name].ToString());
            else if (control.SearchOperator.ToUpper() == Operators.ENDWITH)
                query.WhereEnds(control.Name, gridDataRequest.Parameters[control.Name].ToString());
            else if (control.SearchOperator.ToUpper() == Operators.BETWEEN)
                query.WhereBetween(control.Name, gridDataRequest.Parameters[control.Name].ToString(), gridDataRequest.Parameters[control.Name].ToString());
            else
                query.Where(control.Name, control.SearchOperator, gridDataRequest.Parameters[control.Name]);
        }

        private async Task<GridConfigurationEO> GetGridConfiguration(string GridConfigId)
        {
            return await db.Query(DynamicGridQueryProvider.GridConfiguration)
                            .Where(new { GridConfigId })
                            .Select(DynamicGridQueryProvider.GridConfigurationColumns)
                            .FirstOrDefaultAsync<GridConfigurationEO>();
        }

        private async Task<SqlSourceConfiguration> GetSourceConfig(string GridConfigId)
        {
            return await db.Query(DynamicGridQueryProvider.SqlSourceConfiguration)
                            .Where(new { GridConfigId })
                            .Select(DynamicGridQueryProvider.SqlSourceConfigurationColumns)
                            .FirstOrDefaultAsync<SqlSourceConfiguration>();
        }

        
        private List<GridColumnConfiguration> GetGridColumns(string GridConfigId)
        {
            List<GridColumnConfiguration> gridColumnsConfiguration = null;
            using (Connection)
            {
                gridColumnsConfiguration = db.Query(DynamicGridQueryProvider.GridColumnConfiguration)
                    .Select(DynamicGridQueryProvider.GridColumnConfigurationColumns)
                    .Where(new { GridConfigId })
                    .Get<GridColumnConfiguration>().ToList(); 
            }
            return gridColumnsConfiguration;
        }
    }
}
