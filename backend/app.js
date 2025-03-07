import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { connectToDB } from './db/db.js';
import userRoutes from "./routes/user.routes.js";
import captainRoutes from "./routes/captain.routes.js";
import mapRoutes from "./routes/maps.routes.js";
import ridesRoutes from "./routes/rides.routes.js";

const app = express();
connectToDB();

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // This will correctly parse JSON bodies
app.use(cookieParser());
app.use(express.static("public"));

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapRoutes);
app.use('/rides', ridesRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;