import { NextResponse, NextRequest } from 'next/server';
import { createConnection } from '@/database/mysql';
import jwt from 'jsonwebtoken';

export const GET = async (request: NextRequest) => {
    try {
        const header = request.headers.get("Authorization") || "";
        const [, token] = header.split(" ");

        const db = await createConnection();
        const { payload }: any = jwt.decode(token, { complete: true });
        const userId = payload.id;


        const response = await db.query("SELECT * from animal WHERE user_id = ?", userId);

        return NextResponse.json({
            status: "ok",
            animals: response[0]
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            status: "error",
            message: error
        }, { status: 400 });
    }
}

export const POST = async (request: NextRequest) => {
    try {
        const header = request.headers.get("Authorization") || "";
        const [, token] = header.split(" ");

        const db = await createConnection();
        const { payload }: any = jwt.decode(token, { complete: true });
        const userId = payload.id;

        const { name, category, behavior, description } = await request.json();


        await db.query("INSERT INTO animal SET ?", {
            name,
            category,
            behavior,
            description,
            user_id: userId
        });

        return NextResponse.json({
            status: "ok",
            message: "Animal creado con exito"
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            error: true,
            message: error
        }, { status: 500 });
    }
}