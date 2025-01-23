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

const app = express();
connectToDB();

// Middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Replace with your frontend's production URL
    credentials: true, // Allow cookies/credentials
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // This will correctly parse JSON bodies
app.use(cookieParser());
app.use(express.static("public"));

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;