DELIMITER $$

 
CREATE PROCEDURE AddEvent(
IN Event_Name1 VARCHAR(100)  ,
IN Event_Description1 text ,
IN Event_Poster1 VARCHAR(255),
IN Event_Date1 date,
IN Event_Time1 time,
IN  Hall_Number1 INT )
begin 
INSERT INTO Events(Event_Name,Event_Description,Event_Poster, Event_Date,Event_Time ,Hall_Number)
values (Event_Name1,Event_Description1,Event_Poster1, Event_Date1,Event_Time1,Hall_Number1);
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
From Event  
where Id = Id1;
end; 

CREATE PROCEDURE GetEventByDate(IN Date1 Date)
begin
Select * 
From Event  
where Event_Date =  Date1;
end;  

CREATE PROCEDURE UpdateEvent(
IN eventId1 int (6) unsigned
IN eventName1 VARCHAR(30) ,
IN eventPoster1 VARCHAR(30) ,
IN eventDescription1 VARCHAR(100),
IN eventDate1 date,
IN eventTime1 time,
IN hallId1 INT(3) UNSIGNED
)
begin
Update * 
From Event  
where eventDate =  Date1
end;  