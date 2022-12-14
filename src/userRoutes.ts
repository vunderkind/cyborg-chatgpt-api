import express from 'express';
import dbHelpers from '../db/helpers/helpers.js';
const app = express();

const userRoutes = () => {
    console.log('CHee');
}

app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const register = await dbHelpers.createUser({email, password});

    res.send(register);


})

export default userRoutes;