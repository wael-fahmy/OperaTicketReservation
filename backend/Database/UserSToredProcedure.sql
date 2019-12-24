DELIMITER $$

-- GET ALL USERS
CREATE PROCEDURE GetAllUser()
begin 
	select * from  Users; 
end ;

-- DELETE SPECIFIC USER
CREATE PROCEDURE DeleteUser(IN Id int  )
begin 
	Delete 
    from users 
    Where ID  = Id;
end ;

-- GET USER TO BE APPROVED 
CREATE  PROCEDURE GetNonApprovalUser()
begin 
	select *
    from users 
    Where  Verified = FALSE ;
end ;


-- Get User By Email for signing in
CREATE PROCEDURE GetUserByEmail(IN Email1 VARCHAR(100) )
begin 
	select *
    from users 
    Where email = email1 ;
end;
 
-- Get User By ID 
CREATE PROCEDURE GetUserById(IN ID1 VARCHAR(50) )
begin 
	select *
    from users 
    Where ID= ID1 ;
end;

  -- Approve USER  
CREATE PROCEDURE ApproveUser(IN userId1 int )
		BEGIN
			UPDATE users
			SET Verified = True 
            where Id =userId1;
		End	;	 
-- Create NEw User SignUp
DELIMITER $$
 
CREATE PROCEDURE AddUser(
IN   UserName1 VARCHAR(50) ,
IN  User_Password1 VARCHAR(50) ,
IN    First_Name1 VARCHAR(50) ,
IN    Last_Name1 VARCHAR(50) ,
IN    Birth_Date1 DATE ,
IN    Gender1 VARCHAR(1) ,
IN    City1 VARCHAR(50) ,
IN    User_Address1 VARCHAR(100) ,
IN   Email1 VARCHAR(100) ,
IN    Title1 int)
begin 
INSERT INTO users(UserName,User_Password,First_Name,Last_Name,Birth_Date,Gender,City ,User_Address,Email ,Title ,Verified) 
values (UserName1,User_Password1,First_Name1,Last_Name1,Birth_Date1,Gender1,City1,User_Address1,Email1 ,Title1 ,FALSE) ;
end 

    
-- Update User NOT DONE YET
CREATE PROCEDURE UpdateUser(
IN   UserName1 VARCHAR(50) ,
IN  User_Password1 VARCHAR(50) ,
IN    First_Name1 VARCHAR(50) ,
IN    Last_Name1 VARCHAR(50) ,
IN    Birth_Date1 DATE ,
IN    Gender1 VARCHAR(1) ,
IN    City1 VARCHAR(50) ,
IN    User_Address1 VARCHAR(100) ,
IN   Email1 VARCHAR(100) ,
IN    Title1 int
)
		BEGIN
			UPDATE user
            IF (userName1 IS NOT NULL) 
			SET userName = userName1,
            
	End		
    
DELIMITER 
 
