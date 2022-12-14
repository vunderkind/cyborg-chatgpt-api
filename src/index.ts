import express from 'express';
import userRoutes from './userRoutes.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

const api = express();
const port = 3000 || process.env.PORT;
api.use(bodyParser.json())
api.use(bodyParser.urlencoded({ extended: true }))

api.use('/users', userRoutes);

api.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

