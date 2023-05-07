import { serialize } from 'cookie';


export default function logout() {
    return serialize('token', "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        maxAge: -1,
        path: '/',
    });
}