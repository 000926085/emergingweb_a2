require('dotenv').config({ path: '../.env' });
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require('bcrypt');

const { COORDINATOR_USER, COORDINATOR_PASS,
        DEPOT_STAFF_USER, DEPOT_STAFF_PASS
} = process.env;

if (!COORDINATOR_PASS || !DEPOT_STAFF_PASS) {
    console.error("COORDINATOR_PASS and DEPOT_STAFF_PASS must be set in your .env file.");
    process.exit(1);
}

var db = new sqlite3.Database("database.db");

async function setupDatabase() {
const coordinatorPassword = await bcrypt.hash(COORDINATOR_PASS, 10);
const depotStaffPassword = await bcrypt.hash(DEPOT_STAFF_PASS, 10);

    db.serialize(() => {
        db.run('PRAGMA foreign_keys = ON');

        db.run('DROP TABLE IF EXISTS loan_requests');
        db.run('DROP TABLE IF EXISTS accounts');
        db.run('DROP TABLE IF EXISTS items');
        db.run('DROP TABLE IF EXISTS departments');
        db.run('DROP TABLE IF EXISTS roles');

        db.run(`CREATE TABLE departments (
            department_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        )`);

        db.run(`CREATE TABLE roles (
            role_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        )`);

        db.run(`CREATE TABLE accounts (
            account_id INTEGER PRIMARY KEY AUTOINCREMENT,
            role_id INTEGER NOT NULL,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            FOREIGN KEY (role_id) REFERENCES roles(role_id)
        )`);

        db.run(`CREATE TABLE items (
            item_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name INTEGER NOT NULL,
            category TEXT NOT NULL,
            stock INTEGER NOT NULL
        )`);

        db.run(`CREATE TABLE loan_requests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date DATETIME DEFAULT CURRENT_TIMESTAMP,
            requestedBy TEXT NOT NULL,
            department INTEGER NOT NULL,
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

        const insertRole = db.prepare('INSERT INTO roles (role_id, name) VALUES (?, ?)');
        insertRole.run(1, "Coordinator")
        insertRole.run(2, "Depot Staff")
        insertRole.finalize();

        const insertAccount = db.prepare('INSERT INTO accounts (role_id, username, password) VALUES (?, ?, ?)');
        insertAccount.run(1, COORDINATOR_USER, coordinatorPassword);
        insertAccount.run(2, DEPOT_STAFF_USER, depotStaffPassword);
        insertAccount.finalize();

        const insertDepartment = db.prepare('INSERT INTO departments (department_id, name) VALUES (?, ?)');
        insertDepartment.run(1, "Business")
        insertDepartment.run(2, "Nursing")
        insertDepartment.run(3, "Media Studies")
        insertDepartment.run(4, "Engineering")
        insertDepartment.run(5, "Student Services")
        insertDepartment.run(6, "Athletics")
        insertDepartment.finalize();

        const insertItem = db.prepare('INSERT INTO Items (name, category, stock) VALUES (?, ?, ?)');
        insertItem.run("HDMI Projector", "Visual", "24");
        insertItem.run("Wireless Mic", "Audio", "48");
        insertItem.run("Extension Cord", "Electrical", "64");
        insertItem.run("Laptop Cart", "Utility", "36");
        insertItem.run("Whiteboard on Wheels", "Utility", "12");
        insertItem.finalize();
    });

    db.close();

    console.log("Database created successfully.");
}

setupDatabase();
