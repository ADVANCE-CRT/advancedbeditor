-- -----------------------------------------------------
-- Drop the 'researchstudents' database/schema
-- -----------------------------------------------------

DROP SCHEMA IF EXISTS researchstudents;

-- -----------------------------------------------------
-- Create 'library' database/schema and use this database
-- -----------------------------------------------------

CREATE SCHEMA IF NOT EXISTS researchstudents;

USE researchstudents;

-- -----------------------------------------------------
-- Create table Staff
-- -----------------------------------------------------

create table Staff (
staffNumber int not null,
surname varchar(20) not null,
firstName varchar(20) not null,
email varchar(50),
primary key (staffNumber)
);

-- -----------------------------------------------------
-- Create table AdministrativeStaff (subclass of Staff)
-- -----------------------------------------------------

create table AdministrativeStaff (
staffNumber int,
foreign key (staffNumber) references Staff(staffNumber)
on delete cascade
);

-- -----------------------------------------------------
-- Create table Advisor (subclass of Staff)
-- -----------------------------------------------------

create table Advisor (
advisorNumber int,
primary key (advisorNumber),
foreign key (advisorNumber) references Staff(staffNumber)
on delete cascade
);

-- -----------------------------------------------------
-- Create table Supervisor (subclass of Staff)
-- -----------------------------------------------------

create table Supervisor (
supervisorNumber int,
primary key (supervisorNumber),
foreign key (supervisorNumber) references Staff(staffNumber)
on delete cascade
);

-- -----------------------------------------------------
-- Create table InternalExaminer (subclass of Staff)
-- -----------------------------------------------------

create table InternalExaminer (
iExaminerNumber int,
primary key (iExaminerNumber),
foreign key (iExaminerNumber) references Staff(staffNumber)
on delete cascade
);

-- -----------------------------------------------------
-- Create table Location
-- -----------------------------------------------------

create table Location (
roomNumber varchar(10),
building varchar(30),
capacity tinyint,
occupiedDesks tinyint,
remainingDesks tinyint,
administrator int,
primary key (roomNumber),
foreign key (administrator) references AdministrativeStaff(staffNumber)
on delete set null
);

-- -----------------------------------------------------
-- Create table ExternalExaminer
-- -----------------------------------------------------

create table ExternalExaminer (
examinerNumber int not null auto_increment,
surname varchar(20),
firstName varchar(20),
university varchar(30),
primary key (examinerNumber)
);

-- -----------------------------------------------------
-- Create table ResearchCentre
-- -----------------------------------------------------

create table ResearchCentre (
centreName varchar(20),
primary key (centreName)
);

-- -----------------------------------------------------
-- Create table Student
-- -----------------------------------------------------

create table Student (
studentID int not null,
surname varchar(20) not null,
firstName varchar(20) not null,
email varchar(50),
degreeType enum('PhD', 'MSc'),
degreeDuration tinyint,
fullTimePartTime enum('Full Time', 'Part Time'),
region enum('EU', 'non-EU'),
registrationMonth enum('January', 'April', 'July', 'October'),
startDate date,
endDate date,
thesisTitle varchar(100),
vivaDate date,
regStatus enum('unregistered', 'registered', 'graduated', 'cancelled', 'LoA'),
advisorNumber int,
examinerNumber int,
iExaminerNumber int,
centreName varchar(20),
roomNumber varchar(10),
foreign key (advisorNumber) references Advisor(advisorNumber)
on delete set null,
foreign key (examinerNumber) references ExternalExaminer(examinerNumber)
on delete set null,
foreign key (iExaminerNumber) references InternalExaminer(iExaminerNumber)
on delete set null,
foreign key (roomNumber) references Location(roomNumber)
on delete set null,
foreign key (centreName) references ResearchCentre(centreName)
on delete set null,
primary key (studentID)
);

-- -----------------------------------------------------
-- Create joining table Supervisor_Student
-- -----------------------------------------------------

create table Supervisor_Student (
supervisorNumber int,
studentID int,
primary key (studentID, supervisorNumber),
foreign key (supervisorNumber) references Supervisor(supervisorNumber)
on delete cascade,
foreign key (studentID) references Student(studentID)
on delete cascade
);

-- -----------------------------------------------------
-- Create table ResearchAccount
-- -----------------------------------------------------

create table ResearchAccount (
rNumber varchar(10),
staffNumber int,
primary key (rNumber),
constraint foreign key (staffNumber) references AdministrativeStaff(staffNumber)
on delete set null
);

-- -----------------------------------------------------
-- Create joining table Payment
-- -----------------------------------------------------

create table Payment (
studentID int,
rNumber varchar(10),
primary key (studentID, rNumber),
foreign key (studentID) references Student(studentID)
on delete cascade,
foreign key (rNumber) references ResearchAccount(rNumber)
on delete cascade
);

-- -----------------------------------------------------
-- Create table FormSubmission
-- -----------------------------------------------------

create table FormSubmission (
formID int not null auto_increment,
submissionDate date,
studentID int,
primary key (formID),
foreign key (studentID) references Student(studentID)
on delete cascade
);

-- -----------------------------------------------------
-- Create table ChangeRequestForm (subclass of FormSubmission)
-- -----------------------------------------------------

create table ChangeRequestForm (
formID int,
requestType varchar(20),
primary key (formID),
foreign key (formID) references FormSubmission (formID)
on delete cascade
);

-- -----------------------------------------------------
-- Create table StandardForm (subclass of FormSubmission)
-- -----------------------------------------------------

create table StandardForm (
formID int,
formType varchar(20),
primary key (formID),
foreign key (formID) references FormSubmission (formID)
on delete cascade
);

-- -----------------------------------------------------
-- Populate table Staff
-- -----------------------------------------------------

insert into Staff (staffNumber, surname, firstName, email) values
('54612', 'Duggan', 'James', 'jd@ucc.ie'),
('54613', 'Skrule', 'Dr Gita', 'gs@ucc.ie'),
('54614', 'Moran', 'Dr Dylan', 'dm@ucc.ie'),
('54615', 'O Briain', 'Dr Dara', 'dobr@ucc.ie'),
('54616', 'Pascoe', 'Sara', 'sp@ucc.ie'),
('54617', 'Wolf', 'Dr Michelle', 'mw@ucc.ie'),
('54618', 'Mulaney', 'Prof John', 'jm@ucc.ie');

-- -----------------------------------------------------
-- Populate table AdministrativeStaff
-- -----------------------------------------------------

insert into AdministrativeStaff (staffNumber) values
('54612'),
('54616');

-- -----------------------------------------------------
-- Populate table Supervisor
-- -----------------------------------------------------

insert into Supervisor (supervisorNumber) values
('54613'),
('54614'),
('54615'),
('54617'),
('54618');

-- -----------------------------------------------------
-- Populate table Advisor
-- -----------------------------------------------------

insert into Advisor (advisorNumber) values
('54613'),
('54614'),
('54615'),
('54617'),
('54618');

-- -----------------------------------------------------
-- Populate table InternalExaminer
-- -----------------------------------------------------

insert into InternalExaminer (iExaminerNumber) values
('54613'),
('54614'),
('54615'),
('54617'),
('54618');

-- -----------------------------------------------------
-- Populate table Location
-- -----------------------------------------------------

insert into Location (roomNumber, building, capacity, occupiedDesks, remainingDesks, administrator) values
('WGB 1.22', 'Western Gateway', '60', '0', '60', '54612'),
('WGB 2.21', 'Western Gateway', '70', '0', '70', '54612'),
('ORB G.24', 'O Rahilly', '20', '0', '20', '54616'),
('ORB G.25', 'O Rahilly', '30', '0', '30', '54616');

-- -----------------------------------------------------
-- Populate table ExternalExaminer
-- -----------------------------------------------------

insert into ExternalExaminer (surname, firstName, university) values 
('Sherwin', 'Prof Jonathan', 'Imperial College London'),
('Breathnach', 'Prof Catherine', 'Univeristy of Limerick'),
('Boylan', 'Dr Lucy', 'Dublin City University');

-- -----------------------------------------------------
-- Populate table researchCentre
-- -----------------------------------------------------

insert into researchCentre (centreName) values
('Foresight'),
('Attach'),
('School');

-- -----------------------------------------------------
-- Populate table Student
-- -----------------------------------------------------

insert into Student (studentID, surname, firstName, email, degreeType, 
degreeDuration, fullTimePartTime, region, registrationMonth, startDate, 
endDate, thesisTitle, vivaDate, regStatus, advisorNumber, examinerNumber, 
iExaminerNumber, centreName, roomNumber) values
('10000001', 'Greyjoy', 'Theon', 'tg@ucc.ie', 'PhD', 4, 'Full Time', 'EU',
'October', '2020/10/01', '2024/09/30', 'Writing Theses titles for Dummies',
null, 'registered', null, null, null, 'School', 'WGB 1.22'),
('10000002', 'Stark', 'Ned', 'ns@ucc.ie', 'PhD', 4, 'Full Time', 'EU',
'July', '2019/07/01', '2023/06/30', 'Headless RPIs',
null, 'LoA', '54615', '1', 54618, 'School', 'WGB 1.22'),
('10000003', 'Snow', 'John', 'js@ucc.ie', 'PhD', 6, 'Part Time', 'EU',
'October', '2016/10/01', '2020/09/30', 'Familial tracing software',
'2020/08/01', 'graduated', '54617', '2', '54618', 'Foresight', 'WGB 2.21'),
('10000004', 'Stark', 'Robb', 'rs@ucc.ie', 'PhD', 3, 'Full Time', 'EU',
'October', '2020/10/01', '2024/09/30', 'Smart car technology for winter driving',
null, 'registered', '54615', '2', 54613, 'School', 'WGB 2.21'),
('10000005', 'Stark', 'Bran', 'bs@ucc.ie', 'MSc', 1, 'Full Time', 'EU',
'January', '2020/01/01', '2024/12/31', 'Technology for assisted living',
null, 'registered', 54614, '3', 54615, 'School', 'WGB 1.22'),
('10000006', 'Stark', 'Arya', 'as@ucc.ie', 'PhD', 4, 'Full Time', 'EU',
'April', '2018/04/01', '2022/03/31', 'Protecting your identity online',
null, 'registered', null, null, null, 'Attach', 'ORB G.24'),
('10000007', 'Stark', 'Sansa', 'sansa@ucc.ie', 'PhD', 3, 'Full Time', 'EU',
'October', '2020/10/01', '2024/09/30', 'Human and Computer Interaction',
null, 'registered', null, null, null, 'Foresight', 'ORB G.25'),
('10000008', 'Baratheon', 'Stannis', 'sb@ucc.ie', 'MSc', 2, 'Part Time', 'EU',
'April', '2020/10/01', '2024/09/30', 'Cybersecurity',
null, 'registered', null, null, null, 'School', 'ORB G.24'),
('10000009', 'Targaryen', 'Daenerys', 'dt@ucc.ie', 'PhD', 4, 'Full Time', 'non-EU',
'October', '2020/10/01', '2024/09/30', 'Artificial Intelligence',
null, 'registered', 54617, '2', 54618, 'School', 'WGB 2.21'),
('10000010', 'Lannister', 'Cersei', 'cl@ucc.ie', 'PhD', 3, 'Full Time', 'non-EU',
'January', '2020/10/01', '2024/09/30', 'Artificial Intelligence',
null, 'registered', null, null, null, 'School', 'WGB 1.22'),
('10000011', 'Lannister', 'Jaime', 'jl@ucc.ie', 'PhD', 3, 'Full Time', 'non-EU',
'July', '2020/10/01', '2024/09/30', 'Information visualisation',
null, 'registered', 54615, '3', 54613, 'Attach', 'WGB 2.21'),
('10000012', 'Lannister', 'Tyrion', 'tl@ucc.ie', 'PhD', 8, 'Part Time', 'non-EU',
'January', '2020/10/01', '2024/09/30', 'Machine learning',
null, 'registered', null, null, null, 'Foresight', 'WGB 1.22'),
('10000013', 'Lannister', 'Tywin', 'tl2@ucc.ie', 'PhD', 4, 'Full Time', 'non-EU',
'October', '2020/10/01', '2024/09/30', 'Deep learning',
null, 'registered', 54617, '1', 54613, 'School', 'ORB G.25'),
('10000014', 'Tyrell', 'Margaery', 'mt@ucc.ie', 'PhD', 4, 'Full Time', 'EU',
'April', '2020/10/01', '2024/09/30', 'Data science and analytics',
null, 'registered', null, null, null, 'School', 'WGB 1.22'),
('10000015', 'Baratheon', 'Joffrey', 'jb@ucc.ie', 'MSc', 1, 'Full Time', 'EU',
'January', '2020/10/01', '2024/09/30', 'Networking',
null, 'registered', 54613, '1', 54617, 'Attach', 'ORB G.25'),
('10000016', 'Baelish', 'Petyr', 'pb@ucc.ie', 'PhD', 4, 'Full Time', 'EU',
'October', '2020/10/01', '2024/09/30', 'Internet of things',
null, 'registered', null, null, null, 'School', 'WGB 1.22'),
('10000017', 'Tully', 'Catelyn', 'ct@ucc.ie', 'PhD', 4, 'Full Time', 'EU',
'July', '2020/10/01', '2024/09/30', 'Cloud Computing',
null, 'registered', 54618, '2', 54614, 'School', 'WGB 2.21'),
('10000018', 'Martell', 'Oberyn', 'om@ucc.ie', 'PhD', 4, 'Full Time', 'non-EU',
'July', '2020/10/01', '2024/09/30', 'Data Analytics',
null, 'registered', null, null, null, 'School', 'WGB 1.22'),
('10000019', 'Clegane', 'Sandor', 'sc@ucc.ie', 'PhD', 6, 'Part Time', 'EU',
'October', '2020/10/01', '2024/09/30', 'Cloud computing',
null, 'registered', null, null, null, 'School', 'WGB 2.21'),
('10000020', 'Greyjoy', 'Euron', 'eg@ucc.ie', 'MSc', 2, 'Part Time', 'EU',
'January', '2018/01/01', '2020/12/31', 'MSc on Piracy and Hacking',
'2020/11/11', 'registered', '54613', '1', null, 'School', 'WGB 2.21');

-- -----------------------------------------------------
-- Populate table Supervisor_Student
-- -----------------------------------------------------

insert into Supervisor_Student (studentID, supervisorNumber) values
('10000001', '54614'), 
('10000001', '54617'),
('10000002', '54613'),
('10000003', '54614'),
('10000004', '54615'),
('10000005', '54617'), 
('10000005', '54618'),
('10000006', '54614'),
('10000007', '54614'),
('10000008', '54613'),
('10000009', '54613'),
('10000010', '54617'), 
('10000010', '54618'),
('10000011', '54617'), 
('10000011', '54618'),
('10000012', '54613'), 
('10000012', '54614'),
('10000013', '54615'),
('10000014', '54615'),
('10000015', '54618'),
('10000016', '54618'),
('10000017', '54613'), 
('10000017', '54614'),
('10000018', '54615'),
('10000019', '54614'),
('10000020', '54615');

-- -----------------------------------------------------
-- Populate table ResearchAccount
-- -----------------------------------------------------

insert into ResearchAccount (rNumber, staffNumber) values
('R00001', '54612'),
('R00002', '54612'),
('R00003', '54616'),
('R00004', '54616');

-- -----------------------------------------------------
-- Populate table Payment
-- -----------------------------------------------------

insert into Payment (rNumber, studentID) values
('R00001', '10000001'),
('R00003', '10000003'),
('R00004', '10000004'),
('R00001', '10000005'), 
('R00004', '10000005'),
('R00002', '10000006'),
('R00003', '10000007'),
('R00004', '10000008'),
('R00001', '10000009'), 
('R00002', '10000009'),
('R00002', '10000010'), 
('R00003', '10000010'),
('R00003', '10000011'),
('R00004', '10000012'), 
('R00002', '10000012'),
('R00001', '10000013'),
('R00002', '10000014'), 
('R00003', '10000014'),
('R00003', '10000015'), 
('R00004', '10000015'),
('R00004', '10000016'),
('R00001', '10000017'), 
('R00003', '10000017'),
('R00002', '10000018'),
('R00003', '10000019'),
('R00004', '10000020');

-- -----------------------------------------------------
-- Populate table FormSubmission
-- -----------------------------------------------------

insert into FormSubmission (submissionDate, studentID) values
('2020/09/01', '10000001'),
('2020/10/01', '10000001'),
('2020/10/01', '10000001'),
('2020/06/30', '10000002');

-- -----------------------------------------------------
-- Populate table StandardForm
-- -----------------------------------------------------

insert into StandardForm (formID, formType) values
('1', 'Application Form'),
('2', 'Fees Form'),
('3', 'Payment Form');

-- -----------------------------------------------------
-- Populate table ChangeRequestForm
-- -----------------------------------------------------

insert into ChangeRequestForm (formID, requestType) values
('4', 'Leave of Absence');

/*
  Creates the trigger update_payment. When a user changes a student's regStatus to 'graduated'
  then they will be deleted from the Payment table as they will no longer be payed from a research
  account.
*/
delimiter $$
create trigger update_payment after update on Student
for each row
begin
  if new.regStatus = 'graduated' then
    delete from Payment where studentID = new.studentID;
  end if;
end $$
delimiter ;

-- Tests the above trigger
update Student
set regStatus = 'graduated'
where studentID = '10000003';

-- Changes a student's roomNumber to null when they graduate
update Student 
set roomNumber = null 
where regStatus = 'graduated';

-- Keeps track of the number of desks being used by students in a room (Location)
update Location set occupiedDesks = 
	(select count(roomNumber)
    from Student
    where Student.roomNumber = Location.roomNumber);

-- Shows the number of empty desks in a room
update Location set remainingDesks = capacity - occupiedDesks;

-- Creates and index to speed up queries looking for students from particular research centres
create index centreInd 
on Student(centreName asc);

-- Creates a view that shows all staff names and emails
create or replace view staffContactDetails as
	select surname as 'Surname', firstName as 'First Name', email as 'Email'
    from Staff
    order by surname;
    
-- Creates a view that shows all student names and emails
create or replace view studentContactDetails as
	select studentID as 'Student ID', surname as 'Surname', firstName as 'First Name', email as 'Email'
    from Student
    order by surname;
    
-- Creates a view that shows which students are payed from which research accounts
create or replace view studentPaymentDetails as
	select Student.studentID as 'Student ID', surname as 'Surname', firstName as 'First Name', email as 'Email', Payment.rNumber as 'R Account'
    from Student join Payment
    on Student.studentID = Payment.studentID
    join ResearchAccount
    on Payment.rNumber = ResearchAccount.rNumber
    order by Student.studentID;

-- Creates a view that shows which students are associated with which research centres
create or replace view studentByResearchCentre as
	select centreName as 'Research Centre', studentID as 'Student ID', surname as 'Surname', firstName as 'First Name', email as 'Email'
    from Student
    order by centreName;
    
-- Creates a view that shows what forms have been submitted by students and the dates
create or replace view studentForms as
	select Student.studentID as 'Student ID', surname as 'Surname', firstName as 'First Name', 
    FormSubmission.submissionDate as 'Submission Date', StandardForm.formType as 'Form Type', 
    ChangeRequestForm.requestType as 'Change Request'
    from Student left join FormSubmission
    on Student.studentID = FormSubmission.studentID
    left join StandardForm
    on FormSubmission.formID = StandardForm.formID
    left join ChangeRequestForm
    on FormSubmission.formID = ChangeRequestForm.formID
    order by Student.studentID;
 
-- Creates a view that shows what seats are available and occupied in a room and the admin for the room
create or replace view spaceReport as
	select roomNumber as 'Room', concat(Staff.firstName,' ',Staff.surname) as 'Administrator', capacity as 'Capacity', 
    occupiedDesks as 'Occupied', remainingDesks as 'Remaining'
    from Location join AdministrativeStaff
    on Location.administrator = AdministrativeStaff.staffNumber
    join Staff
    on AdministrativeStaff.staffNumber = Staff.staffNumber;
    
/*Create a view that shows Student from student table and includes names of associated staff
  As Staff.staffID is used to join multiple times, aliases need to be used*/
create or replace view studentInfo as
	select Student.studentID as 'Student ID', Student.surname as 'Surname', Student.firstName as 'First Name' , Student.email as 'email',
    degreeType as 'Degree Type', degreeDuration as 'Degree Duration', fullTimePartTime as 'Full/Part Time',
    region as 'Region', registrationMonth as 'Registration Month', startDate as 'Start Date',
    endDate as 'End Date', thesisTitle as 'Thesis', vivaDate as 'Viva Date', regStatus as 'Registration Status', 
    concat(s3.firstName,' ',s3.surname) as 'Supervisor', 
    concat(Staff.firstName,' ',Staff.surname) as 'Advisor',
    concat(s2.firstName,' ',s2.surname) as 'Internal Examiner', 
    concat(ExternalExaminer.firstName,' ',ExternalExaminer.surname) as 'External Examiner',
    centreName as 'Research Centre', roomNumber as 'Location'
    from Student left join Advisor
    on Student.advisorNumber = Advisor.advisorNumber
    left join Staff
    on Advisor.advisorNumber = Staff.staffNumber    
    left join InternalExaminer
    on Student.iExaminerNumber = InternalExaminer.iExaminerNumber
    left join Staff s2
    on InternalExaminer.iExaminerNumber = s2.staffNumber
    left join ExternalExaminer
    on Student.examinerNumber = ExternalExaminer.examinerNumber
    join Supervisor_Student
    on Student.studentID = Supervisor_Student.studentID
    join Supervisor
    on Supervisor_Student.supervisorNumber = Supervisor.supervisorNumber
    left join Staff s3
    on Supervisor.supervisorNumber = s3.staffNumber;
    
    

commit;