create Table Teacher_Table(Teacher_ID varchar(10) not null PRIMARY KEY, First_Name varchar(30) not null, Last_Name varchar(30) not null, Designation varchar(30) not null, Dept varchar(5) not null);

insert into Teacher_Table values('SMA', 'S', 'MAITY', 'Asst_Prof', 'IT');

insert into Teacher_Table values('ANS','Anshul', 'Agarwal', 'Director', 'ECE');

insert into Teacher_Table values('RIT','Ritik', 'Raj', 'Proctor', 'IT');

insert into Teacher_Table values('BIN','Binnet', 'Kumar', 'Prof', 'ECE');

insert into Teacher_Table values('AR','Arya', 'Krishnan', 'Prof', 'CSE');

insert into Teacher_Table values('akt','Anand', 'Tiwari', 'Prof', 'IT');

create table Student_Table(Enroll_ID varchar(10) not null PRIMARY KEY, First_Name varchar(30) not null, Last_Name varchar(30) not null, Degree varchar(10) not null, Joining_Year varchar(10) not null);

insert into Student_Table values('IIT2017000', 'A', 'verma', 'B.Tech.', '2017');

insert into Student_Table values('IIT2017001', 'B', 'agarwal', 'M.Tech.', '2018');

insert into Student_Table values('IIT2017002', 'C', 'singh', 'P.hd.', '2002');

insert into Student_Table values('IIT2017003', 'D', 'sharma', 'B.Tech.', '1997');

insert into Student_Table values('IIT2017004', 'E', 'gupta', 'M.Tech.', '1978');

insert into Student_Table values('IIT2017023', 'Nishant', 'Kumar', 'B.Tech.', '2017');	


create table Course_Table(Course_ID varchar(5) not null PRIMARY KEY, Course_Name varchar(30) not null, Ses varchar(20) not null, L_T_P varchar2(7) not null);

insert into Course_Table values('DBMS', 'Database_Management_Systems', 'JAN_JULY_2019', '3-0-1');

insert into Course_Table values('SMAT', 'Linear_Algebra', 'FEB_JULY_2018', '2-0-2');

insert into Course_Table values('EPOC', 'Principles_of_communcation', 'FEB_OCT_2018', '4-0-0');

insert into Course_Table values('PPL', 'Programming_language', 'APRIL	_DEC_2019', '0-1-3');

insert into Course_Table values('EDES', 'Electronic_Design', 'FEB_NOV_2022', '1-2-1');

insert into Course_Table values('spas', 'Probability', 'FEB_NOV_2018', '2-0-2');




create table Feedback_Table(Feedback_ID number PRIMARY KEY not null,Field1 Number, Field2 Number, Field3 Number, Comment1 varchar2(100) not null, Comment2 varchar2(100) not null, CONSTRAINTS check_field1 CHECK (Field1 BETWEEN 0 and 5),CONSTRAINTS check_field2 CHECK (Field2 BETWEEN 0 and 5),CONSTRAINTS check_field3 CHECK (Field3 BETWEEN 0 and 5));

insert into Feedback_Table values(1,2,3,1, 'teaching is very bad', 'assignments are very tough');

insert into Feedback_Table values(2,1,2,3, 'teaching is average', 'assignments are easy');

insert into Feedback_Table values(3,2,3,1, 'teaching is ok', 'assignments are quite lengthy');

insert into Feedback_Table values(4,0,0,5, 'teaching is very bad', 'assignments are short');

insert into Feedback_Table values(5,5,5,5, 'teaching is very good', 'assignments are very easy');

insert into Feedback_Table values(6,2,2,2, 'not', 'too good');



create table CFeedback_Table(Feedback_ID number ,Teacher_ID varchar(10) not null, Course_ID varchar(5) not null, Enroll_ID varchar(10) not null);

insert into CFeedback_Table values(1,'SMA', 'DBMS', 'IIT2017000');

insert into CFeedback_Table values(2,'ABD', 'SMAT', 'IIT2017001');

insert into CFeedback_Table values(3,'SUN', 'EPOC', 'IIT2017002');

insert into CFeedback_Table values(4,'JAG', 'PPL', 'IIT2017003');

insert into CFeedback_Table values(5,'SRI', 'EDES', 'IIT2017004');

insert into CFeedback_Table values(6,'akt', 'saps', 'IIT2017023');