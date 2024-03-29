BEGIN;
CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    length INTEGER,
    category TEXT,
    priority TEXT,
    finished INTEGER DEFAULT 0 CHECK (finished IN (0,1)),
    taskDate DATETIME DEFAULT CURRENT_TIMESTAMP   
);

COMMIT;