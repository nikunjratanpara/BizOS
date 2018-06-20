using BizOS.Common.Contracts.DynamicForm;
using BizOS.Common.Contracts.DynamicForm.Models;
using BizOS.Base.BL.DataAccess;
using System.Collections.Generic;
using System;
using Dapper;
using System.Linq;
using System.Text;
using BizOS.Common.Extensions;
using BizOS.Common.Contracts.Constants;

namespace BizOS.Common.Repository.DynamicForm
{
    internal class DynamicFormRepository : BaseRepository, IDynamicFormRepository
    {

      

        public DynamicFormRepository() : base(QueryProviders.DynamicForm)
        {
        }

        public List<FormFieldConfiguration> GetFormControls(string FormConfigId)
        {
            string query = GetQuery("FormFieldConfiguration");
            return Connection.Query<FormFieldConfiguration, CatalogFieldConfig, DatetimeFieldConfig, Validations, FormFieldConfiguration>(
                query,
                (catalogFormConfiguration, catalogFieldConfig, datetimeFieldConfig, validations) => {
                    catalogFormConfiguration.CustomValidation = validations;
                    catalogFormConfiguration.TypeaheadOptions = catalogFieldConfig;
                    catalogFormConfiguration.DatetimePickerOptions = datetimeFieldConfig;
                    return catalogFormConfiguration;
                },
                new { FormConfigId = FormConfigId },
                splitOn : "CatId,MaxDate,IsRequired").AsList();
        }

        public FormConfiguration GetFormConfig(string FormConfigId)
        {
            string sql = GetQuery("FormConfiguration");
            return Connection.Query<FormConfiguration>(sql, new { FormConfigId }).FirstOrDefault();
        }

        public override object GetPocoObject<T>(T Model)
        {
            return Model;   
        }

        public bool Create(string FormConfigId, Dictionary<string, object> formData)
        {
            bool isSaved = false;
            if (FormConfigId.IsNotNullOrEmpty() && formData.IsNotNullOrEmpty())
            {
                string tableName = GetTableName(FormConfigId);
                if (tableName.IsNotNullOrEmpty())
                {
                    List<FormFieldDBConfiguration> controlsDBConfig = GetFormControlsDBConfig(FormConfigId);
                    controlsDBConfig = controlsDBConfig.Where(control => formData.Keys.Contains(control.Name)).ToList();
                    if (controlsDBConfig.IsNotNullOrEmpty())
                    {
                        string insertQuery = BuildInsertQuery(tableName, controlsDBConfig);
                        object parameters = formData.ToDynamicObject();
                        int rowsInserted = Connection.Execute(insertQuery, parameters);
                        isSaved = rowsInserted > 0;
                    }
                }
            }
            return isSaved;
        }
        public bool Update(string FormConfigId, Dictionary<string, object> formData)
        {
            bool isSaved = false;
            if (FormConfigId.IsNotNullOrEmpty() && formData.IsNotNullOrEmpty())
            {
                string tableName = GetTableName(FormConfigId);
                if (tableName.IsNotNullOrEmpty())
                {
                    List<FormFieldDBConfiguration> controlsDBConfig = GetFormControlsDBConfig(FormConfigId);
                    controlsDBConfig = controlsDBConfig.Where(control => formData.Keys.Contains(control.Name)).ToList();
                    if (controlsDBConfig.IsNotNullOrEmpty())
                    {
                        string query = BuildUpdateQuery(tableName, controlsDBConfig);
                        object parameters = formData.ToDynamicObject();
                        int rowsInserted = Connection.Execute(query, parameters);
                        isSaved = rowsInserted > 0;
                    }
                }
            }
            return isSaved;
        }
        public bool Delete(string FormConfigId, Dictionary<string, object> formData)
        {
            bool isSaved = false;
            if (FormConfigId.IsNotNullOrEmpty() && formData.IsNotNullOrEmpty())
            {
                string tableName = GetTableName(FormConfigId);
                if (tableName.IsNotNullOrEmpty())
                {
                    List<FormFieldDBConfiguration> controlsDBConfig = GetFormControlsDBConfig(FormConfigId);
                    controlsDBConfig = controlsDBConfig.Where(control => formData.Keys.Contains(control.Name)).ToList();
                    if (controlsDBConfig.IsNotNullOrEmpty())
                    {
                        string query = BuildDeleteQuery(tableName, controlsDBConfig);
                        object parameters = formData.ToDynamicObject();
                        int rowsInserted = Connection.Execute(query, parameters);
                        isSaved = rowsInserted > 0;
                    }
                }
            }
            return isSaved;
        }
        private string BuildDeleteQuery(string tableName, List<FormFieldDBConfiguration> controlsDBConfig)
        {
            string deleteQuey = string.Empty;
            if (tableName.IsNotNullOrEmpty() && controlsDBConfig.IsNotNullOrEmpty())
            {
                string conditions = GetConditionOfPrimaryKey(controlsDBConfig);
                StringBuilder queryBuilder = new StringBuilder();
                queryBuilder.Append("Delete ");
                queryBuilder.Append(tableName);
                queryBuilder.Append(" where ");
                queryBuilder.Append(conditions);
                deleteQuey = queryBuilder.ToString();
            }
            return deleteQuey;
        }
        private string BuildUpdateQuery(string tableName, List<FormFieldDBConfiguration> controlsDBConfig)
        {
            string updateQuey = string.Empty;
            if (tableName.IsNotNullOrEmpty() && controlsDBConfig.IsNotNullOrEmpty())
            {
                List<FormFieldDBConfiguration> updateColumnDBConfig = controlsDBConfig.Where(control => !control.DBAttributes.IsAutoGenerated && !control.DBAttributes.IsPrimaryKey).ToList();
                string columns = string.Join(",", updateColumnDBConfig.Select(control => control.Name + " = @" +control.Name ).ToList());
                string conditions = GetConditionOfPrimaryKey(controlsDBConfig);
                StringBuilder queryBuilder = new StringBuilder();
                queryBuilder.Append("Update ");
                queryBuilder.Append(tableName);
                queryBuilder.Append(" set ");
                queryBuilder.Append(columns);
                queryBuilder.Append(" where ");
                queryBuilder.Append(conditions);
                updateQuey = queryBuilder.ToString();
            }
            return updateQuey;
        }
        private string GetConditionOfPrimaryKey(List<FormFieldDBConfiguration> controlsDBConfig)
        {
            List<FormFieldDBConfiguration> conditionColumnDBConfig = controlsDBConfig.Where(control => control.DBAttributes.IsPrimaryKey).ToList();
            return string.Join(" And ", conditionColumnDBConfig.Select(control => control.Name + " = @" + control.Name).ToList());
        }
        private string BuildInsertQuery(string tableName, List<FormFieldDBConfiguration> controlsDBConfig)
        {
            string insertQuery = string.Empty;
            if (tableName.IsNotNullOrEmpty() && controlsDBConfig.IsNotNullOrEmpty())
            {
                controlsDBConfig = controlsDBConfig.Where(control => !control.DBAttributes.IsAutoGenerated).ToList();
                string columns = string.Join(",", controlsDBConfig.Select(control => control.Name).ToList());
                string columnParams = string.Join(",", controlsDBConfig.Select(control => "@"+control.Name).ToList());

                StringBuilder queryBuilder = new StringBuilder();
                queryBuilder.Append("Insert into ");
                queryBuilder.Append(tableName);
                queryBuilder.Append(" (");
                queryBuilder.Append(columns);
                queryBuilder.Append(" ) Values ( ");
                queryBuilder.Append(columnParams);
                queryBuilder.Append(" )");
                insertQuery = queryBuilder.ToString();
            }
            return insertQuery;

        }
        private string GetTableName(string FormConfigId)
        {
            dynamic config = null;
            if (FormConfigId.IsNotNullOrEmpty())
            {
                string sql = GetQuery("FormConfiguration");
                config =  Connection.QuerySingle<dynamic>(sql, new { FormConfigId = FormConfigId });
            }
            return config?.TableName ?? string.Empty;
        }
        private List<FormFieldDBConfiguration> GetFormControlsDBConfig(string FormConfigId)
        {
            string query = GetQuery("FormFieldConfiguration");
            return Connection.Query<FormFieldDBConfiguration, Validations, DatabaseAttributes, FormFieldDBConfiguration>(
                query,
                (catalogFormConfiguration, validations,dbAttributes ) => {
                    catalogFormConfiguration.CustomValidation = validations;
                    catalogFormConfiguration.DBAttributes = dbAttributes;
                    return catalogFormConfiguration;
                },
                new { FormConfigId = FormConfigId },
                splitOn: "CatId,IsRequired,IsPrimaryKey").AsList();
        }
    }
}
