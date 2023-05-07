import { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import logger from "@app/utils/logger"
import authenticate from './login';
import logout from './logout';

const authRoute = Router()


authRoute.post('/login', async (req, res) => {
    try {
        const { login, password } = req.body;

        // Simply check if defined
        if (!login || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'error',
                error: 'Request missing login or password',
            });
        }

        // Here should be request for user record
        const user = (login == "admin") ? { cUSER: "admin", cPASSWORD: "$2a$10$V82Q84r4DUmSyTUBSnEbH.Jf.UR3JvikgJNCspR.cOjc9O1Vcctli", cCLAIMS: "admin" } : undefined;

        // Check if record found
        if (!user) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ status: 'error', error: 'User Not Found' });
        }

        // Create cookie JWT token
        const authorized = await authenticate(login, password, user);

        if (authorized) {
            // Browsers block frontend JavaScript code from accessing the Set-Cookie header (prevent XSS attack) 
            res.setHeader('Set-Cookie', authorized);

            res.status(StatusCodes.OK).json({
                success: true,
                message: 'Logged in'
            });
        } else {
            // If creation of cookie fails for some reason
            res.status(StatusCodes.BAD_REQUEST).json({
                status: 'error',
                error: 'Password and login does not match.',
            });
        }
    } catch (error) {
        logger.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'error',
            error: 'Internal Server Error',
        });
    }
})

authRoute.get('/logout', (req, res) => {
    try {
        // Get cookie from header
        const { cookies } = req;

        // Get JWT token created by function authenticate
        const jwt = cookies.token;

        // If not exist user is not logged in
        if (!jwt) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                status: 'error',
                error: 'Unauthorized',
            });
        }

        // Create empty token cookie
        const unauthorized = logout();

        // setHeader is used to send a cookie from the server to the user agent
        res.setHeader('Set-Cookie', unauthorized);

        res.status(StatusCodes.OK).json({
            status: 'success',
            message: 'Logged out',
        });
    } catch (error) {
        logger.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'error',
            error: 'Internal Server Error',
        });
    }
})

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === "UnauthorizedError") {
        res.status(StatusCodes.UNAUTHORIZED).send({
            status: 'error',
            error: 'Unauthorized',
        });
    } else {
        next(err);
    }
}

export { jwtMiddleware } from "./verify"
export default authRoute