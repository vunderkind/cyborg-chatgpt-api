import db from '../db.js';
import bcrypt from 'bcrypt';
const saltRounds = 10;
async function createUser({ email, password }) {
    const emailValidator = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailValidator.test(email))
        throw new Error(`${email} is not an email address`);
    const hashing = bcrypt.hash(password, saltRounds, (_, hash) => {
        db.run(`INSERT INTO users (email, password) VALUES(?,?)`, [email, hash], function (error) {
            if (error) {
                console.error(error.message);
            }
            console.log(`Inserted a row with ID: ${this.lastID}`);
        });
    });
    console.log(hashing);
}
async function loginUser({ email, password }) {
    const hash = await new Promise((resolve, reject) => {
        db.get(`SELECT password FROM users WHERE email = ?`, [email], function (err, row) {
            if (err)
                reject(err);
            resolve(row.password);
        });
    });
    const match = await bcrypt.compare(password, hash);
    return match;
}
createUser({ email: "justin@gmail.com", password: "hey" });
export { createUser, loginUser, };
//# sourceMappingURL=helpers.js.map