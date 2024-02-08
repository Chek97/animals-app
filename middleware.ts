import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export const middleware = async(request: NextRequest) => {
    const authHeader = request.headers.get("Authorization");

    if(!authHeader){
        return NextResponse.json({
            status: "error",
            message: "No se ha incluido un token de autorizacion"
        }, { status: 401});
    }

    const [, token] = authHeader.split(" ");
    
    if(!token){
        return NextResponse.json({
            status: "error",
            message: "Token no valido"
        }, { status: 401 });
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/api/animals',
        '/api/animals/:id'
    ]
}