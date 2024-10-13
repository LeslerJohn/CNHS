/*
  Warnings:

  - You are about to drop the column `departmentName` on the `Department` table. All the data in the column will be lost.
  - You are about to drop the column `programName` on the `GovernmentProgram` table. All the data in the column will be lost.
  - You are about to drop the column `sectionName` on the `Section` table. All the data in the column will be lost.
  - You are about to drop the column `strandName` on the `Strand` table. All the data in the column will be lost.
  - Added the required column `name` to the `Department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `GovernmentProgram` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Section` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Strand` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Department" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT
);
INSERT INTO "new_Department" ("description", "id") SELECT "description", "id" FROM "Department";
DROP TABLE "Department";
ALTER TABLE "new_Department" RENAME TO "Department";
CREATE TABLE "new_GovernmentProgram" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT
);
INSERT INTO "new_GovernmentProgram" ("description", "id") SELECT "description", "id" FROM "GovernmentProgram";
DROP TABLE "GovernmentProgram";
ALTER TABLE "new_GovernmentProgram" RENAME TO "GovernmentProgram";
CREATE TABLE "new_Section" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "yearLevel" INTEGER NOT NULL,
    "strandID" INTEGER,
    "roomID" INTEGER,
    "adviserID" INTEGER,
    CONSTRAINT "Section_strandID_fkey" FOREIGN KEY ("strandID") REFERENCES "Strand" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Section_roomID_fkey" FOREIGN KEY ("roomID") REFERENCES "Room" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Section_adviserID_fkey" FOREIGN KEY ("adviserID") REFERENCES "Teacher" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Section" ("adviserID", "id", "roomID", "strandID", "yearLevel") SELECT "adviserID", "id", "roomID", "strandID", "yearLevel" FROM "Section";
DROP TABLE "Section";
ALTER TABLE "new_Section" RENAME TO "Section";
CREATE TABLE "new_Strand" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT
);
INSERT INTO "new_Strand" ("description", "id") SELECT "description", "id" FROM "Strand";
DROP TABLE "Strand";
ALTER TABLE "new_Strand" RENAME TO "Strand";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
