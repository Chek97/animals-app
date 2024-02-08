import { NextResponse, NextRequest } from 'next/server';
import { createConnection } from '@/database/mysql';
import bcrypt from 'bcrypt';

export const POST = async (request: NextRequest) => {
    try {
        const db = await createConnection();

        const { email, password } = await request.json();

        const encriptedPassword = await bcrypt.hash(password, 10);

        const response = await db.query("INSERT INTO user SET ?", {
            email,
            password: encriptedPassword
        });

        //console.log(response[0].affectedRows);

        return NextResponse.json({
            status: "ok",
            message: "Usuario creado con exito"
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            error: true,
            message: error
        }, { status: 500 });
    }

}