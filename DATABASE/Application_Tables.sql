CREATE TABLE CatCountry
(
	Name varchar(100) Not Null,
	Code varchar(10) Constraint PK_CatCountry Primary Key,
	ObjectId RowVersion
)

CREATE TABLE CatState
(
	Id int identity constraint PK_CatState Primary Key,
	Name varchar(100) Not Null,
	Country Varchar(10) Constraint FK_CatState_CatCountry_Country References CatCountry(Code),
	ObjectId RowVersion
)

CREATE TABLE CatCity
(
	Id int identity constraint PK_CatCity Primary Key,
	Name varchar(100) Not Null,
	StateId int Constraint FK_CatCity_CatState_StateId References CatState(Id),
	ObjectId RowVersion
)

Create Table CatCurrency
(
    Name varchar(100) Not Null,
	Code varchar(10) Constraint PK_CatCurrency Primary Key,
    IsBaseCurrency Bit,
	ObjectId RowVersion
)