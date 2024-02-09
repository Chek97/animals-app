import { createConnection } from '@/database/mysql';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest, params: any) => {
    try {
        const { id } = params.params;

        const db = await createConnection();
        const response = await db.query("SELECT * FROM animal WHERE id = ?", id);

        return NextResponse.json({
            status: 'ok',
            animal: response[0]
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            error: true,
            message: "Error en el servidor"
        }, { status: 500 });
    }
}


export const PUT = async (request: NextRequest, params: any) => {
    try {
        const { id } = params.params;
        const data = await request.json();


        const db = await createConnection();
        await db.query("UPDATE animal SET ? WHERE id = ?", [data, id]);

        return NextResponse.json({
            status: "ok",
            message: "Animal actualizado con exito"
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            error: true,
            message: error
        }, { status: 500 });
    }
}

export const DELETE = async (request: NextRequest, params: any) => {
    try {
        const { id } = params.params;

        const db = await createConnection();
        await db.query("DELETE FROM animal WHERE id = ?", id);

        return NextResponse.json({
            status: "ok",
            message: "Animal eliminado con exito"
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            error: true,
            message: error
        }, { status: 500 });
    }
}