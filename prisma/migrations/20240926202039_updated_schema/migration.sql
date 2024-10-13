/*
  Warnings:

  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `Grade` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Grade` on the `Grade` table. All the data in the column will be lost.
  - You are about to drop the column `GradeID` on the `Grade` table. All the data in the column will be lost.
  - You are about to drop the column `Remarks` on the `Grade` table. All the data in the column will be lost.
  - You are about to drop the column `StudentID` on the `Grade` table. All the data in the column will be lost.
  - You are about to drop the column `SubjectID` on the `Grade` table. All the data in the column will be lost.
  - You are about to drop the column `Term` on the `Grade` table. All the data in the column will be lost.
  - The primary key for the `Room` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Building` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `Capacity` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `RoomID` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `RoomNumber` on the `Room` table. All the data in the column will be lost.
  - The primary key for the `Schedule` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `DayOfWeek` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `EndTime` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `ScheduleID` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `SectionID` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `StartTime` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `SubjectID` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `TeacherID` on the `Schedule` table. All the data in the column will be lost.
  - The primary key for the `Section` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `AdviserID` on the `Section` table. All the data in the column will be lost.
  - You are about to drop the column `RoomID` on the `Section` table. All the data in the column will be lost.
  - You are about to drop the column `SectionID` on the `Section` table. All the data in the column will be lost.
  - You are about to drop the column `SectionName` on the `Section` table. All the data in the column will be lost.
  - You are about to drop the column `StrandID` on the `Section` table. All the data in the column will be lost.
  - You are about to drop the column `YearLevel` on the `Section` table. All the data in the column will be lost.
  - The primary key for the `Strand` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Description` on the `Strand` table. All the data in the column will be lost.
  - You are about to drop the column `StrandID` on the `Strand` table. All the data in the column will be lost.
  - You are about to drop the column `StrandName` on the `Strand` table. All the data in the column will be lost.
  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `EnrollmentDate` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `GuardianName` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `SectionID` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `StrandID` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `StudentID` on the `Student` table. All the data in the column will be lost.
  - The primary key for the `Subject` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Description` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the column `GradeLevel` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the column `SubjectID` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the column `SubjectName` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the column `Units` on the `Subject` table. All the data in the column will be lost.
  - The primary key for the `Teacher` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Department` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `Position` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `RoomID` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `TeacherID` on the `Teacher` table. All the data in the column will be lost.
  - Added the required column `grade` to the `Grade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Grade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentID` to the `Grade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectID` to the `Grade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `term` to the `Grade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `capacity` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomNumber` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dayOfWeek` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sectionID` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectID` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Section` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sectionName` to the `Section` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yearLevel` to the `Section` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Strand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `strandName` to the `Strand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lrn` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeId` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Users_Email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Users";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "middleName" TEXT,
    "dateOfBirth" DATETIME NOT NULL,
    "gender" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" INTEGER NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Grade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentID" INTEGER NOT NULL,
    "subjectID" INTEGER NOT NULL,
    "term" TEXT NOT NULL,
    "grade" REAL NOT NULL,
    "remarks" TEXT,
    CONSTRAINT "Grade_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Grade_subjectID_fkey" FOREIGN KEY ("subjectID") REFERENCES "Subject" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
DROP TABLE "Grade";
ALTER TABLE "new_Grade" RENAME TO "Grade";
CREATE TABLE "new_Room" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "roomNumber" TEXT NOT NULL,
    "building" TEXT,
    "capacity" INTEGER NOT NULL
);
DROP TABLE "Room";
ALTER TABLE "new_Room" RENAME TO "Room";
CREATE UNIQUE INDEX "Room_roomNumber_key" ON "Room"("roomNumber");
CREATE TABLE "new_Schedule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "subjectID" INTEGER NOT NULL,
    "teacherID" INTEGER,
    "sectionID" INTEGER NOT NULL,
    "dayOfWeek" TEXT NOT NULL,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    CONSTRAINT "Schedule_subjectID_fkey" FOREIGN KEY ("subjectID") REFERENCES "Subject" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Schedule_teacherID_fkey" FOREIGN KEY ("teacherID") REFERENCES "Teacher" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Schedule_sectionID_fkey" FOREIGN KEY ("sectionID") REFERENCES "Section" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
DROP TABLE "Schedule";
ALTER TABLE "new_Schedule" RENAME TO "Schedule";
CREATE TABLE "new_Section" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sectionName" TEXT NOT NULL,
    "yearLevel" INTEGER NOT NULL,
    "strandID" INTEGER,
    "roomID" INTEGER,
    "adviserID" INTEGER,
    CONSTRAINT "Section_strandID_fkey" FOREIGN KEY ("strandID") REFERENCES "Strand" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Section_roomID_fkey" FOREIGN KEY ("roomID") REFERENCES "Room" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Section_adviserID_fkey" FOREIGN KEY ("adviserID") REFERENCES "Teacher" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
DROP TABLE "Section";
ALTER TABLE "new_Section" RENAME TO "Section";
CREATE TABLE "new_Strand" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "strandName" TEXT NOT NULL,
    "description" TEXT
);
DROP TABLE "Strand";
ALTER TABLE "new_Strand" RENAME TO "Strand";
CREATE TABLE "new_Student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "guardianName" TEXT,
    "enrollmentDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sectionID" INTEGER,
    "strandID" INTEGER,
    "lrn" TEXT NOT NULL,
    CONSTRAINT "Student_sectionID_fkey" FOREIGN KEY ("sectionID") REFERENCES "Section" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Student_strandID_fkey" FOREIGN KEY ("strandID") REFERENCES "Strand" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Student_id_fkey" FOREIGN KEY ("id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_lrn_key" ON "Student"("lrn");
CREATE TABLE "new_Subject" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "gradeLevel" INTEGER
);
DROP TABLE "Subject";
ALTER TABLE "new_Subject" RENAME TO "Subject";
CREATE TABLE "new_Teacher" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "department" TEXT,
    "position" TEXT,
    "employeeId" TEXT NOT NULL,
    "roomID" INTEGER,
    CONSTRAINT "Teacher_roomID_fkey" FOREIGN KEY ("roomID") REFERENCES "Room" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Teacher_id_fkey" FOREIGN KEY ("id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
DROP TABLE "Teacher";
ALTER TABLE "new_Teacher" RENAME TO "Teacher";
CREATE UNIQUE INDEX "Teacher_employeeId_key" ON "Teacher"("employeeId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
