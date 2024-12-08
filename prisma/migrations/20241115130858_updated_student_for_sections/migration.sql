/*
  Warnings:

  - You are about to drop the column `sectionID` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `strandID` on the `Student` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "StudentOnSections" (
    "studentId" INTEGER NOT NULL,
    "sectionId" INTEGER NOT NULL,

    PRIMARY KEY ("studentId", "sectionId"),
    CONSTRAINT "StudentOnSections_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "StudentOnSections_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Grade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "grade" REAL NOT NULL,
    "remarks" TEXT,
    CONSTRAINT "Grade_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Grade" ("grade", "id", "remarks", "studentId", "subjectId") SELECT "grade", "id", "remarks", "studentId", "subjectId" FROM "Grade";
DROP TABLE "Grade";
ALTER TABLE "new_Grade" RENAME TO "Grade";
CREATE TABLE "new_Section" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "yearLevel" INTEGER NOT NULL,
    "startSchoolYear" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "roomID" INTEGER,
    "adviserID" INTEGER,
    CONSTRAINT "Section_roomID_fkey" FOREIGN KEY ("roomID") REFERENCES "Room" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Section_adviserID_fkey" FOREIGN KEY ("adviserID") REFERENCES "Teacher" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Section" ("adviserID", "id", "name", "roomID", "startSchoolYear", "yearLevel") SELECT "adviserID", "id", "name", "roomID", "startSchoolYear", "yearLevel" FROM "Section";
DROP TABLE "Section";
ALTER TABLE "new_Section" RENAME TO "Section";
CREATE TABLE "new_Student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "guardianName" TEXT,
    "enrollmentDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gradeLevel" INTEGER NOT NULL,
    "lrn" TEXT NOT NULL,
    CONSTRAINT "Student_id_fkey" FOREIGN KEY ("id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Student" ("enrollmentDate", "gradeLevel", "guardianName", "id", "lrn") SELECT "enrollmentDate", "gradeLevel", "guardianName", "id", "lrn" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_lrn_key" ON "Student"("lrn");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
