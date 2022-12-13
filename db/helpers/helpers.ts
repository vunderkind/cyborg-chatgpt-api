import db from '../db.js';
import bcrypt from 'bcrypt';

const saltRounds = 10;

type Credentials = {
    email: string,
    password: string,
}

async function createUser({email, password}: Credentials): Promise<void>{
    const emailValidator = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if(!emailValidator.test(email)) throw new Error(`${email} is not an email address`);
    bcrypt.hash(password, saltRounds, (_, hash) => {
        db.run(`INSERT INTO users (email, password) VALUES(?,?)`,
        [email, hash],
        function (error){
            if (error) {
                throw new Error(error.message);
            }
            console.log(`Inserted a row with ID: ${this.lastID}`);
        }
        );
    });
}

function addAuthorName(authorName: string, userId: number): void {
    db.run(`INSERT INTO authors (penName, userId) VALUES(${authorName}, ${userId})`,
    function(error) {
        if (error) {
            throw new Error(error.message);
        }
    return `Inserted a row with ID: ${this.lastID}`
    }
    )
}

function updateAuthorName(authorName: string, userId: string): void {
    db.run(`UPDATE authors SET penName = '${authorName}' WHERE userId = '${userId}'`,
    function(error) {
        if (error) {
            throw new Error(error.message);
        }
    return `Inserted a row with ID: ${this.lastID}`
    }
    )
}


async function loginUser({email, password}: Credentials): Promise<boolean>{
    const hash = await new Promise((resolve, reject) => {
        db.get(`SELECT password FROM users WHERE email = ?`,
        [email],
        function (err, row){
            if(err) reject(err)
            resolve(row.password)
        })
    });

    const match = await bcrypt.compare(password, hash);
    return match;
}

export {
    createUser,
    loginUser,
    addAuthorName,
    updateAuthorName
}