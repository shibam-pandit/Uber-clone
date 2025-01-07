import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectToDB }from './db/db.js';
import sessionConfig from './middlewares/sessionConfig.js';
import userRoutes from "./routes/user.routes.js";
import captainRoutes from "./routes/captain.routes.js";

const app = express();
connectToDB();

// Middlewares
app.use(
    cors({
      origin: process.env.FRONTEND_URL,    // Replace with your frontend's production URL
      credentials: true,                         // Allow cookies/credentials
    })
  );// enable accept requests from any origin and when given a domain it will only accept requests from that domain
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());  // This will correctly parse JSON bodies
app.use(express.static("public"));

// Configure session and passport
sessionConfig(app);

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);

app.get('/', (req, res) => {    
    res.send('Hello World!');
});

export default app;