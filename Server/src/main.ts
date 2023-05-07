import dotenv from 'dotenv'
dotenv.config()

import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import nocache from "nocache";
import cookieParser from "cookie-parser";
import { AddressInfo } from 'net';
import { exit } from 'process';

import logger from "./utils/logger"
import morganMiddleware from "./utils/logger.express"

import authRoute, { jwtMiddleware, errorMiddleware } from './auth';
import apiRoute from './api';


// Get host and origin parameters from environment (dotenv)
const host_address = process.env.HOST_ADDRESS;
const host_port = process.env.HOST_PORT;
const origin_address = process.env.HOST_APP_ORIGIN_ADDRESS;
const origin_port = process.env.HOST_APP_ORIGIN_PORT;

// Exit if not defined
if (host_port == undefined || host_address == undefined) {
    logger.error("Host address or port undefined")
    exit(-1)
}

if (origin_port == undefined || origin_address == undefined) {
    logger.error("Origin address or port undefined")
    exit(-1)
}

// Create express
const app: Express = express();

// Parsing cookie (needed for authorization) 
app.use(cookieParser());

// Prevent use of caching
app.use(nocache())

// Requests logging to file
app.use(morganMiddleware);

// Parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json())

// Change default origin policy
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", `http://${origin_address}:${origin_port}`);
    res.header("Access-Control-Allow-Credentials", 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

// Default configuration fo CORS (Cross-Origin Resource Sharing)
const corsConfig = {
    credentials: true,
    // preflightContinue: true,
    origin: [`http://${origin_address}:${host_port}`, `http://${origin_address}:${origin_port}`],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"]
};
app.use(cors(corsConfig))
app.options('*', cors(corsConfig))

// Authentication and authorization check
app.use(jwtMiddleware)

// Routes
app.use("/auth", authRoute);
app.use("/api", apiRoute);

// Testing root path
app.get('/', (req: Request, res: Response)=>{
    res.send('Hello, this is Express + TypeScript');
});

// Some additional logging
app.use(errorMiddleware)

// Parse app port
const port = parseInt(host_port)

// Start server
const listener = app.listen(port, host_address, () => {
    const addr = listener.address() as AddressInfo;
    console.log(`[Server]: I am running at http://${addr.address}:${addr.port} / ${addr.family}`);
});