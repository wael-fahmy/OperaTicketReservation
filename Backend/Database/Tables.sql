CREATE DATABASE IF NOT EXISTS Opera_Reservation_System;

USE Opera_Reservation_System;


CREATE TABLE IF NOT EXISTS Users 
(
    ID INT AUTO_INCREMENT PRIMARY KEY,
    UserName VARCHAR(50) NOT NULL UNIQUE,
    User_Password VARCHAR(50) NOT NULL,
    First_Name VARCHAR(50) NOT NULL,
    Last_Name VARCHAR(50) NOT NULL,
    Birth_Date DATE  NOT NULL,
    Gender VARCHAR(1)  NOT NULL,
    City VARCHAR(50) NOT NULL,
    User_Address VARCHAR(100) DEFAULT 'None',
    Email VARCHAR(100) NOT NULL UNIQUE,
    Title ENUM('Site_Administrator', 'Opera_Management', 'Customer'),
    Verified BOOLEAN DEFAULT FALSE

);


CREATE TABLE IF NOT EXISTS Halls
(
    Hall_Number INT AUTO_INCREMENT PRIMARY KEY,
    Number_Rows INT NOT NULL,
    Number_Cols INT NOT NULL,
    IsAvailable BOOLEAN DEFAULT TRUE
   -- Hall_Status VARCHAR(25) DEFAULT 'AVAILABLE'
);

CREATE TABLE IF NOT EXISTS Events
(
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Event_Name VARCHAR(100) NOT NULL,
    Event_Description text,
    Event_Poster VARCHAR(255) DEFAULT 'None', 
    Event_DateTime DATETIME,
    Hall_Number INT,
   -- Event_Status VARCHAR(25) DEFAULT 'ACTIVE',
    FOREIGN KEY(Hall_Number) REFERENCES Halls(Hall_Number)
    ON DELETE SET NULL 
);


CREATE TABLE IF NOT EXISTS Reservations
(
    ID int AUTO_INCREMENT PRIMARY KEY,
    Event_ID int,
    UserID int, 
    Seat_Row int,
    Seat_Col int,
    Paid BOOLEAN,

    FOREIGN KEY(Event_ID) REFERENCES Events(ID)
    ON DELETE CASCADE,
    FOREIGN KEY(UserID) REFERENCES Users(ID)
    ON DELETE CASCADE

);