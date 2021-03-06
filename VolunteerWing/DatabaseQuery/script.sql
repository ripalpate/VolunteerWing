USE [master]
GO
/****** Object:  Database [VolunteeerWing]    Script Date: 8/8/2019 8:22:28 PM ******/
CREATE DATABASE [VolunteeerWing]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'VolunteeerWing', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\VolunteeerWing.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'VolunteeerWing_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\VolunteeerWing_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [VolunteeerWing] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [VolunteeerWing].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [VolunteeerWing] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [VolunteeerWing] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [VolunteeerWing] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [VolunteeerWing] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [VolunteeerWing] SET ARITHABORT OFF 
GO
ALTER DATABASE [VolunteeerWing] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [VolunteeerWing] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [VolunteeerWing] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [VolunteeerWing] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [VolunteeerWing] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [VolunteeerWing] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [VolunteeerWing] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [VolunteeerWing] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [VolunteeerWing] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [VolunteeerWing] SET  DISABLE_BROKER 
GO
ALTER DATABASE [VolunteeerWing] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [VolunteeerWing] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [VolunteeerWing] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [VolunteeerWing] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [VolunteeerWing] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [VolunteeerWing] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [VolunteeerWing] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [VolunteeerWing] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [VolunteeerWing] SET  MULTI_USER 
GO
ALTER DATABASE [VolunteeerWing] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [VolunteeerWing] SET DB_CHAINING OFF 
GO
ALTER DATABASE [VolunteeerWing] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [VolunteeerWing] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [VolunteeerWing] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [VolunteeerWing] SET QUERY_STORE = OFF
GO
USE [VolunteeerWing]
GO
/****** Object:  Table [dbo].[Groups]    Script Date: 8/8/2019 8:22:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Groups](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[GroupName] [nvarchar](255) NOT NULL,
	[AdminId] [int] NOT NULL,
 CONSTRAINT [PK_Groups] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Invitation]    Script Date: 8/8/2019 8:22:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Invitation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserEmail] [nvarchar](255) NOT NULL,
	[EventId] [int] NOT NULL,
	[Link] [nvarchar](255) NOT NULL,
 CONSTRAINT [PK_Invitation] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tasks]    Script Date: 8/8/2019 8:22:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tasks](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TaskName] [nvarchar](255) NOT NULL,
	[Comment] [nvarchar](255) NULL,
	[NumberOfPeopleNeed] [int] NOT NULL,
	[NumberOfPeopleSignUp] [int] NOT NULL,
	[EventId] [int] NOT NULL,
	[StartDate] [datetime] NOT NULL,
	[StartTime] [datetime] NOT NULL,
	[EndTime] [datetime] NOT NULL,
 CONSTRAINT [PK_Tasks] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserGroups]    Script Date: 8/8/2019 8:22:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserGroups](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserEmail] [nvarchar](255) NOT NULL,
	[GroupId] [int] NOT NULL,
 CONSTRAINT [PK_UserGroups] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 8/8/2019 8:22:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Email] [nvarchar](255) NOT NULL,
	[FirebaseId] [nvarchar](255) NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
	[Street] [nvarchar](255) NOT NULL,
	[City] [nvarchar](50) NOT NULL,
	[State] [nvarchar](50) NOT NULL,
	[Zipcode] [nvarchar](50) NOT NULL,
	[PhoneNumber] [nvarchar](50) NOT NULL,
	[IsAdmin] [bit] NOT NULL,
	[IsActive] [bit] NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserTasks]    Script Date: 8/8/2019 8:22:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserTasks](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[TaskId] [int] NOT NULL,
 CONSTRAINT [PK_UserTasks] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VolunteerEvents]    Script Date: 8/8/2019 8:22:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VolunteerEvents](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[EventName] [nvarchar](255) NOT NULL,
	[StartDate] [datetime] NOT NULL,
	[StartTime] [datetime] NOT NULL,
	[EndTime] [datetime] NOT NULL,
	[AdminId] [int] NOT NULL,
	[Location] [nvarchar](255) NOT NULL,
	[Description] [nvarchar](255) NOT NULL,
 CONSTRAINT [PK_VolunteerEvents] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_Users_IsAdmin]  DEFAULT ((0)) FOR [IsAdmin]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_Users_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[Groups]  WITH CHECK ADD  CONSTRAINT [FK_Groups_Users] FOREIGN KEY([AdminId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Groups] CHECK CONSTRAINT [FK_Groups_Users]
GO
ALTER TABLE [dbo].[Invitation]  WITH CHECK ADD  CONSTRAINT [FK_Invitation_VolunteerEvents] FOREIGN KEY([EventId])
REFERENCES [dbo].[VolunteerEvents] ([Id])
GO
ALTER TABLE [dbo].[Invitation] CHECK CONSTRAINT [FK_Invitation_VolunteerEvents]
GO
ALTER TABLE [dbo].[Tasks]  WITH CHECK ADD  CONSTRAINT [FK_Tasks_VolunteerEvents] FOREIGN KEY([EventId])
REFERENCES [dbo].[VolunteerEvents] ([Id])
GO
ALTER TABLE [dbo].[Tasks] CHECK CONSTRAINT [FK_Tasks_VolunteerEvents]
GO
ALTER TABLE [dbo].[UserGroups]  WITH CHECK ADD  CONSTRAINT [FK_UserGroups_Groups1] FOREIGN KEY([GroupId])
REFERENCES [dbo].[Groups] ([Id])
GO
ALTER TABLE [dbo].[UserGroups] CHECK CONSTRAINT [FK_UserGroups_Groups1]
GO
ALTER TABLE [dbo].[UserTasks]  WITH CHECK ADD  CONSTRAINT [FK_UserTasks_Tasks] FOREIGN KEY([TaskId])
REFERENCES [dbo].[Tasks] ([Id])
GO
ALTER TABLE [dbo].[UserTasks] CHECK CONSTRAINT [FK_UserTasks_Tasks]
GO
ALTER TABLE [dbo].[UserTasks]  WITH CHECK ADD  CONSTRAINT [FK_UserTasks_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[UserTasks] CHECK CONSTRAINT [FK_UserTasks_Users]
GO
ALTER TABLE [dbo].[VolunteerEvents]  WITH CHECK ADD  CONSTRAINT [FK_VolunteerEvents_Users] FOREIGN KEY([AdminId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[VolunteerEvents] CHECK CONSTRAINT [FK_VolunteerEvents_Users]
GO
USE [master]
GO
ALTER DATABASE [VolunteeerWing] SET  READ_WRITE 
GO
