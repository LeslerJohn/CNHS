/*
  Warnings:

  - You are about to drop the column `department` on the `Teacher` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Department" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "departmentName" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "GovernmentProgram" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "programName" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "TeacherOnDepartments" (
    "teacherId" INTEGER NOT NULL,
    "departmentId" INTEGER NOT NULL,

    PRIMARY KEY ("teacherId", "departmentId"),
    CONSTRAINT "TeacherOnDepartments_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TeacherOnDepartments_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StudentOnPrograms" (
    "studentId" INTEGER NOT NULL,
    "programId" INTEGER NOT NULL,

    PRIMARY KEY ("studentId", "programId"),
    CONSTRAINT "StudentOnPrograms_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "StudentOnPrograms_programId_fkey" FOREIGN KEY ("programId") REFERENCES "GovernmentProgram" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Teacher" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "position" TEXT,
    "employeeId" TEXT NOT NULL,
    "roomID" INTEGER,
    CONSTRAINT "Teacher_roomID_fkey" FOREIGN KEY ("roomID") REFERENCES "Room" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Teacher_id_fkey" FOREIGN KEY ("id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Teacher" ("employeeId", "id", "position", "roomID") SELECT "employeeId", "id", "position", "roomID" FROM "Teacher";
DROP TABLE "Teacher";
ALTER TABLE "new_Teacher" RENAME TO "Teacher";
CREATE UNIQUE INDEX "Teacher_employeeId_key" ON "Teacher"("employeeId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
