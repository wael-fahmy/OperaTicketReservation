DELIMITER $$

CREATE PROCEDURE NewTicket(
in Event_ID1 int,
iN UserID1 int, 
IN Seat_Row1 int,
IN Seat_Col1 int)
begin 
INSERT INTO Reservations(Event_ID,UserID,Seat_Row,Seat_Col,Paid)
values (Event_ID1,UserID1,Seat_Row1,Seat_Col1,FALSE);
end; 


CREATE PROCEDURE DeleteTicket( In Id1 int)
begin 
     Delete 
     from Reservations
    Where ID = Id1;
end; 


CREATE PROCEDURE GetTicketByUserId( In userId1 int)
begin 
     Select *
     from Reservations 
    Where  UserID =  userId1 ;
end; 
CREATE PROCEDURE GetTicketByEvent( In eventId1 int )
begin 
     select *
     from Reservations  
    Where Event_ID = eventId1;
end; 
CREATE PROCEDURE payTicket( In Id1 INT)
begin 
     Update Reservations 
     Set paid = TRUE
    Where Id = Id1 ;
end; 