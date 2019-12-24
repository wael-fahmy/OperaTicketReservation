DELIMITER $$
CREATE PROCEDURE ChangeUserTitle(
    IN id INT,
    IN title INT
)
BEGIN

UPDATE users
SET Title = title --1 for admin 2 for opera manger 3 for customer
WHERE ID = id;

END;

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
CREATE  PROCEDURE GetNonVerifiedUser()
begin 
	select *
    from users 
    Where  Verified = FALSE ;
end ;

-- GET USER APPROVED 
CREATE  PROCEDURE GetVerifiedUser()
begin 
	select *
    from users 
    Where  Verified = TRUE ;
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
CREATE PROCEDURE VerifyUser(IN userId1 int )
		BEGIN
			UPDATE users
			SET Verified = True 
            where Id =userId1;
		End	;	 
-- Create NEw User SignUp




 
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

CREATE PROCEDURE SignIn(
IN userName1 VARCHAR(50),
IN userPassword1 VARCHAR(255)
)
root:BEGIN

IF NOT EXISTS (SELECT * FROM users where users.UserName = userName1 AND users.Verified = TRUE) THEN
BEGIN
	SELECT 1 as response; --User does not exist
	LEAVE root;
END;
END if;

IF NOT EXISTS (SELECT * FROM users where users.UserName = userName1 AND users.User_Password = userPassword1) THEN
BEGIN
	SELECT 1 as response; --User does not exist
	LEAVE root;
END;
END if;

SELECT 0 as response; #Login Success
SELECT * FROM users where users.UserName = userName1 AND users.User_Password = userPassword1;
END;

-- Update User NOT DONE YET
CREATE PROCEDURE UpdateUserInfo(
IN   userId1 int,
IN    First_Name1 VARCHAR(50) ,
IN    Last_Name1 VARCHAR(50) ,
IN    Birth_Date1 DATE ,
IN    Gender1 VARCHAR(1) ,
IN    City1 VARCHAR(50) ,
IN    User_Address1 VARCHAR(100) 
)
	BEGIN
		UPDATE users    
		SET 
		 First_Name = First_Name1,
		 Last_Name = Last_Name1,
		 Birth_Date = Birth_Date1,
		 Gender = Gender1,
		 City = City1,
		 User_Address = User_Address1
		WHERE ID=userId1
	End	;	
    

 
