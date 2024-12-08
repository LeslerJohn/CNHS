/*
  Warnings:

  - Added the required column `gradeLevel` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "guardianName" TEXT,
    "enrollmentDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gradeLevel" INTEGER NOT NULL,
    "sectionID" INTEGER,
    "strandID" INTEGER,
    "lrn" TEXT NOT NULL,
    CONSTRAINT "Student_sectionID_fkey" FOREIGN KEY ("sectionID") REFERENCES "Section" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Student_id_fkey" FOREIGN KEY ("id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Student" ("enrollmentDate", "guardianName", "id", "lrn", "sectionID", "strandID") SELECT "enrollmentDate", "guardianName", "id", "lrn", "sectionID", "strandID" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_lrn_key" ON "Student"("lrn");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
