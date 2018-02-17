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

select dbo.GetObjectQuery('CatState');