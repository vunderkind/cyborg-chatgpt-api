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
      email VARCHAR(100) UNIQUE NOT NULL,
      password   VARCHAR(500) NOT NULL
    );
    CREATE TABLE authors
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        penName VARCHAR(30),
        userId INTEGER NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id)
    );
    CREATE TABLE stories
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        genreId INTEGER NOT NULL,
        authorId INTEGER NOT NULL,
        title VARCHAR(200) NOT NULL,
        FOREIGN KEY (authorId) REFERENCES authors(id),
        FOREIGN KEY (genreId) REFERENCES genres(id)
    );
    CREATE TABLE genres
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(10) NOT NULL,
        description VARCHAR(500) NOT NULL
    );
    CREATE TABLE chapters
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        storyId INTEGER NOT NULL,
        text TEXT NOT NULL,
        FOREIGN KEY (storyId) REFERENCES stories(id)
    );
    CREATE TABLE likes
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        storyId INTEGER NOT NULL,
        userId INTEGER NOT NULL,
        FOREIGN KEY (storyId) REFERENCES stories(id),
        FOREIGN KEY (userId) REFERENCES users(id)
    );
  `);
  }

  export default createDbConnection();
