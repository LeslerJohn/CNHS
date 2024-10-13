-- CreateTable
CREATE TABLE "Users" (
    "UserID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "MiddleName" TEXT,
    "DateOfBirth" DATETIME,
    "Gender" TEXT NOT NULL,
    "Address" TEXT,
    "ContactNumber" TEXT,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "UserType" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Room" (
    "RoomID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "RoomNumber" TEXT NOT NULL,
    "Building" TEXT,
    "Capacity" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Strand" (
    "StrandID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "StrandName" TEXT NOT NULL,
    "Description" TEXT
);

-- CreateTable
CREATE TABLE "Teacher" (
    "TeacherID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Department" TEXT,
    "Position" TEXT,
    "RoomID" INTEGER,
    CONSTRAINT "Teacher_RoomID_fkey" FOREIGN KEY ("RoomID") REFERENCES "Room" ("RoomID") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Teacher_TeacherID_fkey" FOREIGN KEY ("TeacherID") REFERENCES "Users" ("UserID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Section" (
    "SectionID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "SectionName" TEXT NOT NULL,
    "YearLevel" INTEGER NOT NULL,
    "StrandID" INTEGER,
    "RoomID" INTEGER,
    "AdviserID" INTEGER,
    CONSTRAINT "Section_StrandID_fkey" FOREIGN KEY ("StrandID") REFERENCES "Strand" ("StrandID") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Section_RoomID_fkey" FOREIGN KEY ("RoomID") REFERENCES "Room" ("RoomID") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Section_AdviserID_fkey" FOREIGN KEY ("AdviserID") REFERENCES "Teacher" ("TeacherID") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Student" (
    "StudentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "GuardianName" TEXT,
    "EnrollmentDate" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "SectionID" INTEGER,
    "StrandID" INTEGER,
    CONSTRAINT "Student_SectionID_fkey" FOREIGN KEY ("SectionID") REFERENCES "Section" ("SectionID") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Student_StrandID_fkey" FOREIGN KEY ("StrandID") REFERENCES "Strand" ("StrandID") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Student_StudentID_fkey" FOREIGN KEY ("StudentID") REFERENCES "Users" ("UserID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Subject" (
    "SubjectID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "SubjectName" TEXT NOT NULL,
    "Description" TEXT,
    "Units" INTEGER NOT NULL,
    "GradeLevel" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Schedule" (
    "ScheduleID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "SubjectID" INTEGER NOT NULL,
    "TeacherID" INTEGER,
    "SectionID" INTEGER NOT NULL,
    "DayOfWeek" TEXT NOT NULL,
    "StartTime" DATETIME NOT NULL,
    "EndTime" DATETIME NOT NULL,
    CONSTRAINT "Schedule_SubjectID_fkey" FOREIGN KEY ("SubjectID") REFERENCES "Subject" ("SubjectID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Schedule_TeacherID_fkey" FOREIGN KEY ("TeacherID") REFERENCES "Teacher" ("TeacherID") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Schedule_SectionID_fkey" FOREIGN KEY ("SectionID") REFERENCES "Section" ("SectionID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Grade" (
    "GradeID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "StudentID" INTEGER NOT NULL,
    "SubjectID" INTEGER NOT NULL,
    "Term" TEXT NOT NULL,
    "Grade" REAL NOT NULL,
    "Remarks" TEXT,
    CONSTRAINT "Grade_StudentID_fkey" FOREIGN KEY ("StudentID") REFERENCES "Student" ("StudentID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Grade_SubjectID_fkey" FOREIGN KEY ("SubjectID") REFERENCES "Subject" ("SubjectID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_Email_key" ON "Users"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Room_RoomNumber_key" ON "Room"("RoomNumber");
