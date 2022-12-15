import express from 'express';
import dbHelpers from '../db/helpers/helpers.js';
const app = express();
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        const register = await dbHelpers.createUser({ email, password });
        res.send(register);
    }
    catch (error) {
        res.status(404);
        res.send(error.message);
    }
});
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const loggedIn = await dbHelpers.loginUser({ email, password });
        if (loggedIn) {
            res.send(loggedIn);
        }
        else {
            res.status(404);
            res.send('Wrong credentials submitted');
        }
    }
    catch (error) {
        res.status(404);
        res.send(error.message);
    }
});
export default app;
//# sourceMappingURL=userRoutes.js.map