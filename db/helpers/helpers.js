import db from '../db.js';

console.log(db)
function createUser({username, password}){
    db.run(`INSERT INTO users (name, password) VALUES(?,?)`,
    [username, password],
    (success, error) => {
        if (error) {
            console.error(error.message);
        }
        console.log(`Inserted a row with ID: ${JSON.stringify(success)}`);
    }
    )
}

createUser({username: 'papal', password: 'hey there'});

export {
    createUser
}