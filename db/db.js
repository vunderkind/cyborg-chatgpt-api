import sqlite3 from 'sqlite3';
import fs from 'fs';
import * as url from 'url';


const sqlite = sqlite3.verbose();
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const filepath = `${__dirname}cyborg.db`;

function createDbConnection() {
    if (fs.existsSync(filepath)) {
        return new sqlite.Database(filepath);
    } 
    else {
        const db = new sqlite.Database(filepath, (error) => {
    if (error) {
        return console.error(error.message);
    }
    createTable(db);
  });
  console.log("Connection with SQLite has been established");
  return db;
}
}


function createTable(db) {
    db.exec(`
    CREATE TABLE users
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name   VARCHAR(30) NOT NULL,
      password   VARCHAR(50) NOT NULL,
    )
  `);
  }

  export default createDbConnection();
