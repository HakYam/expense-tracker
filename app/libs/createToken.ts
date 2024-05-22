import * as jose from 'jose';

export default async function createToken(userId: string) {
    const token = await new jose.SignJWT({ userId })
        .setExpirationTime("1d")
        .setProtectedHeader({ alg: "HS256" })
        .sign(new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET));
    return token;
}
