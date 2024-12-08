/*
  Warnings:

  - You are about to drop the `Strand` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `studentID` on the `Grade` table. All the data in the column will be lost.
  - You are about to drop the column `subjectID` on the `Grade` table. All the data in the column will be lost.
  - You are about to drop the column `term` on the `Grade` table. All the data in the column will be lost.
  - You are about to drop the column `sectionID` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `subjectID` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `teacherID` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `strandID` on the `Section` table. All the data in the column will be lost.
  - The primary key for the `SubjectonSections` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `studentId` to the `Grade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectId` to the `Grade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startSchoolYear` to the `Section` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `SubjectonSections` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Strand";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Grade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "grade" REAL NOT NULL,
    "remarks" TEXT,
    CONSTRAINT "Grade_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Grade_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "SubjectonSections" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Grade" ("grade", "id", "remarks") SELECT "grade", "id", "remarks" FROM "Grade";
DROP TABLE "Grade";
ALTER TABLE "new_Grade" RENAME TO "Grade";
CREATE TABLE "new_Schedule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dayOfWeek" TEXT NOT NULL,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL
);
INSERT INTO "new_Schedule" ("dayOfWeek", "endTime", "id", "startTime") SELECT "dayOfWeek", "endTime", "id", "startTime" FROM "Schedule";
DROP TABLE "Schedule";
ALTER TABLE "new_Schedule" RENAME TO "Schedule";
CREATE TABLE "new_Section" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "yearLevel" INTEGER NOT NULL,
    "startSchoolYear" INTEGER NOT NULL,
    "roomID" INTEGER,
    "adviserID" INTEGER,
    CONSTRAINT "Section_roomID_fkey" FOREIGN KEY ("roomID") REFERENCES "Room" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Section_adviserID_fkey" FOREIGN KEY ("adviserID") REFERENCES "Teacher" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Section" ("adviserID", "id", "name", "roomID", "yearLevel") SELECT "adviserID", "id", "name", "roomID", "yearLevel" FROM "Section";
DROP TABLE "Section";
ALTER TABLE "new_Section" RENAME TO "Section";
CREATE TABLE "new_SubjectonSections" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "subjectId" INTEGER NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "teacherId" INTEGER,
    "scheduleId" INTEGER,
    CONSTRAINT "SubjectonSections_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "SubjectonSections_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "SubjectonSections_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "SubjectonSections_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SubjectonSections" ("sectionId", "subjectId") SELECT "sectionId", "subjectId" FROM "SubjectonSections";
DROP TABLE "SubjectonSections";
ALTER TABLE "new_SubjectonSections" RENAME TO "SubjectonSections";
CREATE UNIQUE INDEX "SubjectonSections_subjectId_sectionId_key" ON "SubjectonSections"("subjectId", "sectionId");
CREATE TABLE "new_Teacher" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "position" TEXT,
    "employeeId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Teacher_id_fkey" FOREIGN KEY ("id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Teacher" ("employeeId", "id", "position") SELECT "employeeId", "id", "position" FROM "Teacher";
DROP TABLE "Teacher";
ALTER TABLE "new_Teacher" RENAME TO "Teacher";
CREATE UNIQUE INDEX "Teacher_employeeId_key" ON "Teacher"("employeeId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
