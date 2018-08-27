Drop Table [ExtraAttribute]
Drop Table [Address]
Drop Table [Supplier]
Drop Table [Customer]
Drop Table [Ledger]
Drop Table [LedgerGroup]
Drop Table [LedgerType]
Drop Table [Product]
Drop Table [ProductCategory]
Drop Table [CatCurrency]
Drop Table [CatCity]
Drop Table [CatState]
Drop Table [CatCountry]
DROP Table [CatCatalogs]

-- generic catalogs
Create Table CatCatalogs(
    CatalogId VARCHAR(20),
	DisplayColumn VARCHAR(50),
	ValueColumn VARCHAR(50),
    CONSTRAINT PK_CatCatalogs PRIMARY Key (CatalogId,DisplayColumn)
) Create Table CatCountry (
    Name nVarchar(200) Not Null,
    Code varchar(10) Constraint PK_CatCountry Primary Key,
    ObjectId RowVersion
) Create Table CatState (
    Id int identity constraint PK_CatState Primary Key,
    Name nVarchar(200) Not Null,
    Country varchar(10) Constraint FK_CatState_CatCountry_Country References CatCountry(Code),
    ObjectId RowVersion
) Create Table CatCity (
    Id int identity constraint PK_CatCity Primary Key,
    Name nVarchar(200) Not Null,
    StateId int Constraint FK_CatCity_CatState_StateId References CatState(Id),
    ObjectId RowVersion
) Create Table CatCurrency (
    Name nVarchar(200) Not Null,
    Code varchar(10) Constraint PK_CatCurrency Primary Key,
    IsBaseCurrency Bit,
    ObjectId RowVersion
) Create Table ProductCategory (
    Id int identity constraint PK_ProductCategory Primary Key,
    [Name] nVarchar(100),
    IsInventory bit
) Create Table Product (
    ProductId int identity constraint PK_Products Primary Key,
    [Name] nVarchar(100) Not Null,
    Catagory int not null Constraint FK_Products_ProductCategory_Catagory References ProductCategory(Id),
    UnitPrice numeric(38, 2) Not Null,
    CommisionRate numeric(38, 2) not null,
    Taxable bit,
    UsageUnit int Not Null,
    InDemand int,
    Ordered int,
    Stock int,
    ReorderLevel int,
    Active Bit CONSTRAINT Products_Active_Default DEFAULT 1,
) Create Table LedgerType (
    Code varchar(25) Constraint PK_LedgerType Primary Key,
    TypeName nvarchar(100),
    [AccountType] varchar(1) constraint CK_LedgerType_AccountType Check(AccountType IN ('A', 'L', 'I', 'E')),
    [Sequence] int 
) Create Table LedgerGroup (
    Id int identity Constraint PK_LedgerGroup Primary Key,
    [Name] nVarchar(100),
    ParentId int Constraint FK_LedgerGroup_LedgerGroup Foreign Key References LedgerGroup(Id),
    LedgerType varchar(25) Constraint FK_LedgerGroup_LedgerType Foreign Key References LedgerType(Code),
    [Level] int Constraint DF_LedgerGroup_Deleted Default 0
) Create Table Ledger (
    Id int identity Constraint PK_Ledger Primary Key,
    [Name] NVarchar(500),
	CurrencyId Varchar(10),
    LedgerGroup int Constraint FK_Ledger_LedgerGroup Foreign Key References LedgerGroup(Id),
    Deleted BIT Constraint DF_Ledger_Deleted Default 0
) Create Table Customer (
    LedgerId int Constraint PK_Customer Primary Key Constraint FK_Customer_Ledger References Ledger(Id),
    BirthDate DATETIME,
    [Name] NVARCHAR(250),
    Email NVARCHAR(250),
    Mobile varchar(10),
    Office varchar(10),
    Home VARCHAR(10),
    Fax Varchar(20)
)
Create Table Supplier (
    LedgerId int Constraint PK_Supplier Primary Key Constraint FK_Supplier_Ledger References Ledger(Id),
    BirthDate DATETIME,
    [Name] NVARCHAR(250),    
    Email NVARCHAR(250),
    Mobile varchar(10),
    Office varchar(10),
    Home VARCHAR(10),
    Fax Varchar(20)
)
Create Table [Address] (
    AddressId int identity Constraint PK_Address Primary Key,
    ObjectId varchar(100),
    ObjectType Varchar(20),
    AddressType varchar(100),
    AddressLine1 NVarchar(100),
    AddressLine2 Nvarchar(100),
    City NVARCHAR(100),
    [State] NVARCHAR(100),
    PinCode varchar(10),
    Country varchar(10) CONSTRAINT FK_Address_Country Foreign Key REFERENCES CatCountry(Code)
)
Create Table ExtraAttribute (
    ObjectId VARCHAR(100),
    ObjectType Varchar(100),
    AttrName nVarchar(100),
    AttrVal NVarchar(100)
)
Insert into CatCatalogs (CatalogId,DisplayColumn,ValueColumn) VALUES
('AccountHead','Assets','A'),
('AccountHead','Liabilities','L'),
('AccountHead','Income','I'),
('AccountHead','Expenses','E')