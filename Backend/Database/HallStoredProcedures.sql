DELIMITER $$
 
-- Create NEw Hall 
CREATE PROCEDURE CreateHAll(IN numberOfRows1 Int,IN numberOfcolums1 Int)
Begin
INSERT INTO Halls(Number_Cols,Number_Rows,IsAvailable ) values (numberOfcolums1,numberOfRows1,TRUE);
End;
-- Set Not availble when we create event
CREATE PROCEDURE SetNotAvailable(IN Id Int)
Begin
Update Halls
Set IsAvailable = FALSE
Where Hall_Number= Id;
End;

CREATE PROCEDURE GetAllAvailableHall()
Begin
Select Hall_Number
From Halls
Where  IsAvailable = TRUE;
End;

CREATE PROCEDURE GetHallById(IN Id Int)
Begin
Select *
From Halls
Where Hall_Number= Id;
End;