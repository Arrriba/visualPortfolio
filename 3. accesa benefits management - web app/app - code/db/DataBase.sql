DROP DATABASE AccesaBenefitsManagement;
GO

CREATE DATABASE AccesaBenefitsManagement;
GO

USE AccesaBenefitsManagement

DROP TABLE Users;
DROP TABLE Areas;
DROP TABLE Programs


delete from Users where Email='arina.cazacu@gmail.com'
select * from Programs
select * from Areas


CREATE TABLE Users(
	Id int NOT NULL identity(1,1) primary key,
	Email varchar(400) NOT NULL unique,
	Password varchar(400) NOT NULL,
	ExpirationDate datetime ,
	PasswordSalt varchar(500)
)
GO

CREATE TABLE Areas(
	Id int NOT NULL identity(1,1) primary key,
	Name varchar(400) NOT NULL unique,
	Description Varchar(max) NOT NULL,
	Logo varchar(max) NOT NULL,
	Icon varchar(max) NOT NULL
)
GO

Create Table Programs(
	Id int NOT NULL identity(1,1) primary key,
	Name varchar(400) NOT NULL,
	Description varchar(400),
	Url varchar(400),
	Active int NOT NULL,
	AreaId int Foreign Key References Areas(Id)
)
GO

INSERT INTO dbo.Users (Email,Password,ExpirationDate)
VALUES	('arina.cazacu@gmail.com','$2a$10$/fteMbvOJgxrMV2sDdxao.R.YEuoG.wamvXdxGqlUQxmbSDTpngdy', NULL),
		('me@imeil.com','$2a$10$Ef7ZjeE8lcMwClZ1ukOdZOEYC66AchVh1RHoCN/cffenZwKCjoCm2', NULL)
GO

INSERT INTO dbo.Areas (Name,Description,Logo,Icon)
VALUES	('Test Area','This area was built only for testing purposes and this description contains no usefull information so there is no point in reading those meaningless words , but if you really want to do that who am i to stop you?...but if you did so i''m glad that i made you waste like 20 seconds of your life reading this useless description of an area that is designed only for testing purposes, and now those will be only uninteligible and unrelated words because i try to make this as long as possible to test what would happen in case somoone would actually write a superlong description like this one:D. i''m john, cars, plane refrigerator hill dig more crash cut roll man alien Jupiter maiahii maiahuu ... hdhaudhfiahfaihfiahdfiahflahsfihaiwf oooooo  Macarena help no flipflops cats whale why wwth dolphins  giraffe what that''s cool  ','./storage-url/MyAwesomeLogo.png','./storage-url/Iconie.ico'),
		('Test1','Test1-Description', 'test1-logoURL','test1-IconURL'),
		('Test2','Test2-Description', 'test2-logoURL','test2-IconURL'),
		('Test''test','Test''test-Description', 'Test''test-logoURL','Test''test-IconURL'),
		('Test/test' ,'Test/test-Description', 'Test/test-logoURL','Test/test-IconURL' )
GO

INSERT INTO Programs([Name], [Description], [Active], [AreaId])
VALUES	('Test program', 'program description', 0, 1)
GO

Insert Into Programs([Name], [Description], [Url], [AreaId], [Active])
Values('Test-name', '', '', 1, 0)
