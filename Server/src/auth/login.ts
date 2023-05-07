import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const KEY = process.env.JWT_KEY;

export default async function authenticate(login: string, password: string, user: any) {
    if (KEY) {
        // Compare password with its hash
        const isMatch = await bcrypt.compare(password, user.cPASSWORD)

        if (isMatch) {
            // Only user name and addidional text (admin, user, guest etc.) 
            const payload = {
                id: user.cUSER,
                claims: user.cCLAIMS,
            };

            // Creating token
            const token = jwt.sign(
                payload,
                KEY,
                {   
                    algorithm: "HS256", // Same as in file verify.ts
                    expiresIn: 60 * 60 * 24 * 30,
                }
            );

            return serialize('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                expires: new Date(new Date().valueOf() + 1000 * 60 * 60 * 24),
                sameSite: 'none',
                path: '/',
            });
        }
    }
}