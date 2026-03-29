import express from 'express';
import routes from './routes.js';
import * as dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(express.json());
app.use(routes);
app.use(cors());

export default app;