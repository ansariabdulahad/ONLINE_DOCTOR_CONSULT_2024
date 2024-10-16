import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import { mongoDbConnection } from './utils/db.js';

// dotenv configuration
config();

// constants
const { PORT = 5000, CLIENT_URL } = process.env;
const app = express();

// middlewares
app.use(cors({
    origin: CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization', 'Content-Type']
}));
app.use(express.json());

// routers configuration

// error handlers
app.use((err, req, res, next) => {
    console.log(err.stack || err.message || err);
    res.status(500).json({
        success: false,
        message: "ERROR FROM SERVER, SOMETHING WENT WRONG!",
        error: err.stack || err.message || err
    });
});

// mongodb configuration and server listening
mongoDbConnection()
    .then(() => {
        app.listen(PORT, (err) => {
            if (err) console.log(err);
            console.log(`Server running on ${PORT}`);
        });
    }).catch((err) => {
        console.log(err);
    });