import {withAuth} from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';

const publicPath=['/','/login'];

export default withAuth({
    pages:{
        signIn:"/auth"
    }
});




export const config = {
    matcher:[
        "/users/:path*",
        "/conversations/:path*",
        
    ]
}