import { Router, Request, Response, NextFunction } from 'express';
import hardwareRoute from './hardware';


const apiRoute = Router()

apiRoute.use("/hardware", hardwareRoute)

export default apiRoute
