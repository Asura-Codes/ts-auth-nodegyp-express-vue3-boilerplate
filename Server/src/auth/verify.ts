import express from 'express';
import { expressjwt } from "express-jwt"


// Every page except '/auth/login' require authorization
export const jwtMiddleware = expressjwt({
    secret: process.env.JWT_KEY as string, // Remember to set JWT_KEY in .env
    algorithms: ["HS256"], // Same as in file login.ts
    credentialsRequired: true, // Always require permissions
    getToken: function fromHeaderOrQuerystring(req: express.Request) {
        if (req.cookies && req.cookies["token"]) {
            return req.cookies["token"];
        }
        return null;
    },
}).unless({ path: ["/auth/login"] })