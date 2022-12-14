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
export default app;
//# sourceMappingURL=userRoutes.js.map