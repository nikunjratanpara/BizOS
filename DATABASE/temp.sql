-- Add New column in FormConfig for Fetch record from Database.
SELECT * FROM CatalogDictionary;
select * from GridConfiguration;
SELECT * from SqlSourceConfiguration where GridConfigId=@GridConfigId;
select * from GridColumnConfiguration;
select * from FormConfiguration;
select * from FormFieldConfiguration;

select * from CatalogDictionary;
select * from CatState;
select * from CatCountry;
select * from CatCurrency;

select C.Id, C.Name, StateId, S.Name [StateName]  from CatCity C inner join CatState S on C.StateId = S.Id 
SELECT S.Id,S.Name, S.Country,C.Name [CountryName] FROM CatState S inner join CatCountry C on S.Country = C.Code

select S.Id, S.Name, S.Country, C.Name [CountryName] From CatState S inner join CatCountry C on S.Country = C.Code  Order By countryName

select * from CatState order by Id OFFSET 30 ROWS
FETCH FIRST 10 ROWS ONLY;


------------------------------------------------MongoDB Schema ---------------------------------------

select lower(SUBSTRING(name,1,1))+SUBSTRING(name,2,len(name)-1)+': ''' + name+''',' from Sys.Tables

select lower(SUBSTRING(name,1,1))+SUBSTRING(name,2,len(name)-1)+',' from Sys.Tables

select lower(SUBSTRING(name,1,1))+SUBSTRING(name,2,len(name)-1)+': string,' from Sys.Tables

select 'var '+lower(SUBSTRING(tab.name,1,1))+SUBSTRING(tab.name,2,len(tab.name)-1)+ 'Schema = new mongoose.Schema({});'
 from sys.tables tab

 select 'var '+lower(SUBSTRING(tab.name,1,1))+SUBSTRING(tab.name,2,len(tab.name)-1)+ 
 '= mongoose.model(collectionConstants.' +
  lower(SUBSTRING(name,1,1))+SUBSTRING(name,2,len(name)-1) + ', ' +
  lower(SUBSTRING(tab.name,1,1))+SUBSTRING(tab.name,2,len(tab.name)-1)+ 'Schema);'
 from sys.tables tab

select tab.name, col.name, typ.name, lower(SUBSTRING(col.name,1,1))+SUBSTRING(col.name,2,len(col.name)-1)+': '+ typ.name + ',' from Sys.columns Col 
join sys.tables tab on col.object_id=tab.object_id
join sys.types typ on col.system_type_id = typ.system_type_id
where typ.name !='sysname'

------------------------------------------------------------------------------------------------------ 



select dbo.GetObjectQuery('CatState');