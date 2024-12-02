-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AccessLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "accessTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "granted" BOOLEAN NOT NULL,
    CONSTRAINT "AccessLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_AccessLog" ("accessTime", "granted", "id", "url", "userId") SELECT "accessTime", "granted", "id", "url", "userId" FROM "AccessLog";
DROP TABLE "AccessLog";
ALTER TABLE "new_AccessLog" RENAME TO "AccessLog";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
