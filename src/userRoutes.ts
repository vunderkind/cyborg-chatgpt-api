import express from 'express';
import dbHelpers from '../db/helpers/helpers.js';
import jwt from 'jsonwebtoken';
const app = express();

app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        const register = await dbHelpers.createUser({email, password});
        res.send(register);
    } catch(error) {
        res.status(404);
        res.send(error.message);
    }


});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!(email && password)) {
        res.status(422);
        res.send('Both username and password must be provided');
    }
    try {
        const loggedIn = await dbHelpers.loginUser({email, password });
        if (loggedIn) {
            const token = jwt.sign({email}, process.env.TOKEN_KEY, {expiresIn: "7d"});

            res.status(201).json({
                userLoggedIn: loggedIn,
                token
            })
        } else {
            res.status(422);
            res.send('Wrong credentials submitted');
        }
    } catch(error) {
        res.status(404);
        res.send(error.message);
    }


})

export default app;