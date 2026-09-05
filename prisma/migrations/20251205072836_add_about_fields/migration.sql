/*
  Warnings:

  - You are about to drop the column `description` on the `About` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `About` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `About` table. All the data in the column will be lost.
  - Added the required column `deskripsi` to the `About` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_About" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT,
    "seorangApa" TEXT,
    "email" TEXT,
    "alamat" TEXT,
    "jabatan" TEXT,
    "telepon" TEXT,
    "whatsapp" TEXT,
    "fotoFormal" TEXT,
    "fotoNonFormal" TEXT,
    "deskripsiSingkat" TEXT,
    "deskripsi" TEXT NOT NULL,
    "githubUrl" TEXT,
    "linkedinUrl" TEXT,
    "facebookUrl" TEXT,
    "instagramUrl" TEXT,
    "stats" TEXT,
    "cvUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_About" ("createdAt", "id", "stats", "updatedAt") SELECT "createdAt", "id", "stats", "updatedAt" FROM "About";
DROP TABLE "About";
ALTER TABLE "new_About" RENAME TO "About";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
