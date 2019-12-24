DELIMITER $$

 
CREATE PROCEDURE AddEvent(
IN Event_Name1 VARCHAR(100)  ,
IN Event_Description1 text ,
IN Event_Poster1 VARCHAR(255),
IN Event_DateTime1 datetime,
IN  Hall_Number1 INT )
begin 
INSERT INTO Events(Event_Name,Event_Description,Event_Poster, Event_DateTime,Hall_Number)
values (Event_Name1,Event_Description1,Event_Poster1, Event_DateTime1,Hall_Number1);
Call SetNotAvailable(Hall_Number1);
end; 

CREATE PROCEDURE DeleteEvent(IN Id1 int )
begin 
	Delete 
    from Events 
    Where Id = Id1;
end ;

CREATE PROCEDURE GetAllEvent()
begin
Select * 
From Events;  
end;

CREATE PROCEDURE GetEventByID(In Id1 int )
begin
Select * 
From Events  
where Id = Id1;
end; 

CREATE PROCEDURE GetEventByDate(IN Date1 Date)
begin
Select * 
From Events  
where Event_Date =  Date1;
end;  
DELIMITER $$

CREATE PROCEDURE UpdateEvent(
IN eventId1 int,
IN Event_Name1 VARCHAR(100)  ,
IN Event_Description1 text ,
IN Event_Poster1 VARCHAR(255),
IN Event_DateTime1 datetime,
IN  Hall_Number1 INT 
)
begin
Update Events 
Set Event_Name =Event_Name1,
 Event_Description = Event_Description1,
Event_Poster =Event_Poster1 ,
Event_DateTime =Event_DateTime1,
Hall_Number =Hall_Number1
where Id =  eventId1;
end;  
