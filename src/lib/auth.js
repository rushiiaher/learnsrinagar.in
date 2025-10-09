import { createCookieSessionStorage, redirect } from "@remix-run/node";

const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: "__session",
        secrets: ["s3cret"],
        sameSite: "lax",
        path: "/",
        httpOnly: true,
        secure: true,
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
                secure: true,
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