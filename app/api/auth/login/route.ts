import { NextResponse, NextRequest } from 'next/server';
import { createConnection } from '@/database/mysql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const POST = async (request: NextRequest) => {
    try {
        const db = await createConnection();

        const { email, password } = await request.json();

        const response: any = await db.query("SELECT * FROM user WHERE email=?", email);

        if (response[0].length > 0) {
            const user = response[0][0];
            const passwordVerify = bcrypt.compareSync(password, user.password);

            if (passwordVerify) {

                const payload = {
                    id: user.id,
                    email: user.email
                }

                const token = jwt.sign(payload, "ANIMALS_SECRET_KEY", {
                    expiresIn: '1h'
                });

                return NextResponse.json({
                    status: "ok",
                    message: "Login Exitoso",
                    token
                }, { status: 200 });
            } else {
                return NextResponse.json({
                    status: "error",
                    message: "Correo y/o contraseña incorrectas"
                }, { status: 400 });
            }
        } else {
            return NextResponse.json({
                status: "error",
                message: "Correo y/o contraseña incorrectas"
            }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({
            status: "error",
            message: error
        }, { status: 500 });
    }
}