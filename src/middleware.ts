import {withAuth} from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';

const publicPath=['/','/login'];

withAuth({
    pages:{
        signIn:"/auth"
    }
});

export {default} from 'next-auth/middleware';


export const config = {
    matcher:[
        "/users/:path*",
        "/conversations/:path*",
        
    ]
}