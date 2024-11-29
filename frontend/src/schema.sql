CREATE TABLE Notice (
    Not_id VARCHAR(20) PRIMARY KEY,
    title VARCHAR(255),
    info TEXT
);

CREATE TABLE News (
    New_id VARCHAR(20) PRIMARY KEY,
    title VARCHAR(255),
    info TEXT
);

CREATE TABLE Slider (
    Sli_id VARCHAR(20) PRIMARY KEY,  
    imageLink VARCHAR(255)
);

CREATE TABLE ImageGallary (
    im_id VARCHAR(20) PRIMARY KEY,  
    link VARCHAR(255)
);

CREATE TABLE VideoGallary (
    vi_id VARCHAR(20) PRIMARY KEY,  
    link VARCHAR(255)
);

CREATE TABLE Department (
    dep_id VARCHAR(20) PRIMARY KEY,  
    dep_name VARCHAR(255)
);

CREATE TABLE admin (
    id VARCHAR(20) PRIMARY KEY,
    fname VARCHAR(255) NOT NULL,
    lname VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Faculty (
    F_id VARCHAR(20) PRIMARY KEY,  
    fname VARCHAR(255),
    lname VARCHAR(255),
    email VARCHAR(255),
    phone_no VARCHAR(15),
    dep_id VARCHAR(20),
    isActive BOOLEAN,
    password VARCHAR(255),
    FOREIGN KEY (dep_id) REFERENCES Department(dep_id)
);

CREATE TABLE Course (
    c_id VARCHAR(20) PRIMARY KEY, 
    c_name VARCHAR(255)
);

CREATE TABLE Department_course_relation (
    c_id VARCHAR(20),
    dep_id VARCHAR(20),
    PRIMARY KEY (c_id, dep_id),
    FOREIGN KEY (c_id) REFERENCES Course(c_id),
    FOREIGN KEY (dep_id) REFERENCES Department(dep_id)
);

CREATE TABLE Student (
    s_id VARCHAR(20) PRIMARY KEY,
    fname VARCHAR(255),
    lname VARCHAR(255),
    email VARCHAR(255),
    phone_no VARCHAR(15),
    dep_id VARCHAR(20),
    password VARCHAR(255),
    FOREIGN KEY (dep_id) REFERENCES Department(dep_id)
);

CREATE TABLE enrolled_course (
    s_id VARCHAR(20),
    c_id VARCHAR(20),
    PRIMARY KEY (s_id, c_id),
    FOREIGN KEY (s_id) REFERENCES Student(s_id),
    FOREIGN KEY (c_id) REFERENCES Course(c_id)
);

CREATE TABLE Faculty_enrolled (
    F_id VARCHAR(20),
    c_id VARCHAR(20),
    PRIMARY KEY (F_id, c_id),
    FOREIGN KEY (F_id) REFERENCES Faculty(F_id),
    FOREIGN KEY (c_id) REFERENCES Course(c_id)
);

CREATE TABLE Fees (
    s_id VARCHAR(20) PRIMARY KEY,
    ispaid BOOLEAN,
    FOREIGN KEY (s_id) REFERENCES Student(s_id)
);

CREATE TABLE Admission (
    App_id VARCHAR(30) PRIMARY KEY,  
    branch VARCHAR(255),
    fname VARCHAR(255),
    lname VARCHAR(255),
    email VARCHAR(255),
    mobile VARCHAR(15),
    address TEXT,
    date DATE,
    isApproved BOOLEAN,
    Document MEDIUMBLOB
);

CREATE TABLE Certification (
    cer_code VARCHAR(20) PRIMARY KEY,  
    cer_name VARCHAR(255),
    fees DECIMAL(10, 2)
);

CREATE TABLE certificate_enrolled (
    cer_id VARCHAR(20) PRIMARY KEY,  
    cer_name VARCHAR(255),
    s_id VARCHAR(20),
    cer_code VARCHAR(20),
    isCompleted BOOLEAN,
    FOREIGN KEY (s_id) REFERENCES Student(s_id),
    FOREIGN KEY (cer_code) REFERENCES Certification(cer_code)
);

CREATE TABLE Book (
    B_id VARCHAR(20) PRIMARY KEY,  
    B_name VARCHAR(255),
    B_author VARCHAR(255),
    total_quantity INT
);

CREATE TABLE members (
    s_id VARCHAR(20),
    B_id VARCHAR(20),
    issueDate DATE,
    returnDate DATE,
    fine INT,
    PRIMARY KEY (s_id, B_id, issueDate),
    FOREIGN KEY (s_id) REFERENCES Student(s_id),
    FOREIGN KEY (B_id) REFERENCES Book(B_id)
);

CREATE TABLE Grievences (
    id VARCHAR(20) PRIMARY KEY,  
    s_id VARCHAR(20),
    subject VARCHAR(255),
    details TEXT,
    datePosted DATE,
    dateClosed DATE,
    FOREIGN KEY (s_id) REFERENCES Student(s_id)
);

CREATE TABLE Feedback (
    id VARCHAR(20) PRIMARY KEY,  
    s_id VARCHAR(20),
    subject VARCHAR(255),
    details TEXT,
    datePosted DATE,
    dateClosed DATE,
    FOREIGN KEY (s_id) REFERENCES Student(s_id)
);

CREATE TABLE Inquiry (
    id VARCHAR(20) PRIMARY KEY,  
    s_id VARCHAR(20),
    subject VARCHAR(255),
    details TEXT,
    datePosted DATE,
    dateClosed DATE,
    FOREIGN KEY (s_id) REFERENCES Student(s_id)
);

CREATE TABLE contact_us (
    name VARCHAR(255),
    phone VARCHAR(15),
    email VARCHAR(255) PRIMARY KEY
);