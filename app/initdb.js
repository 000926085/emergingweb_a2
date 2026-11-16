const sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("database.db");

db.serialize(function() {
    db.run("DROP TABLE IF EXISTS loan_requests");
    db.run("DROP TABLE IF EXISTS departments");
    db.run("DROP TABLE IF EXISTS items");

    db.run(`CREATE TABLE items (
        item_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE departments,
        department_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    `);

    db.run(`CREATE TABLE loan_requests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date DATETIME DEFAULT CURRENT_TIMESTAMP,
        requestedBy TEXT NOT NULL,
        department INTEGER NOT NULL
        itemRequested INTEGER NOT NULL,
        reason TEXT NOT NULL,
        needed_from TEXT NOT NULL,
        needed_until TEXT NOT NULL,
        status TEXT NOT NULL,
        picked TEXT,
        returned TEXT,
        notes TEXT,
        FOREIGN KEY (itemRequested) REFERENCES items(item_id),
        FOREIGN KEY (department) REFERENCES departments(department_id)
    )`);
})

console.log("Database created successfully.")