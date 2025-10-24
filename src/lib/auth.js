import { createCookieSessionStorage, redirect } from "@remix-run/node";
import bcrypt from 'bcryptjs';
import { query } from './db';

const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: "__session",
        secrets: ["s3cret"],
        sameSite: "lax",
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    },
});

export const { commitSession, destroySession, getSession } = sessionStorage;

export async function createSession(request, user) {
    const session = await sessionStorage.getSession(request.headers.get("Cookie"));
    session.set('user', user);
    return redirect('/dashboard', {
        headers: {
            "Set-Cookie": await sessionStorage.commitSession(session, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 60 * 60 * 24 * 7
            }),
        },
    });
}

export async function deleteSession(request) {
    const session = await sessionStorage.getSession(request.headers.get("Cookie"));
    return redirect("/login", {
        headers: {
            "Set-Cookie": await sessionStorage.destroySession(session),
        },
    });
}

export async function getUser(request) {
    const session = await sessionStorage.getSession(request.headers.get("Cookie"));
    const user = session.get('user');
    return user;
}

export async function verifyLogin(email, password) {
    console.log('Attempting login for:', email);
    
    const [users] = await query('SELECT * FROM users WHERE email = ?', [email]);
    console.log('Users found:', users.length);
    
    if (users.length === 0) {
        console.log('No user found with email:', email);
        return null;
    }
    
    const user = users[0];
    let passwordHash = user.password_hash;
    console.log('Original hash:', passwordHash);
    
    // Fix bcrypt format if needed ($2b$ -> $2a$)
    if (passwordHash.startsWith('$2b$')) {
        passwordHash = passwordHash.replace('$2b$', '$2a$');
        console.log('Fixed hash:', passwordHash);
    }
    
    console.log('Comparing password with hash...');
    const isValid = await bcrypt.compare(password, passwordHash);
    console.log('Password valid:', isValid);
    
    if (!isValid) {
        return null;
    }
    
    return user;
}