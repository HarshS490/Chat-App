import {withAuth} from 'next-auth/middleware';
import { redirect } from 'next/dist/server/api-utils';
import { NextRequest, NextResponse } from 'next/server';
import { useRouter } from 'next/navigation';
const publicPath=['/','/auth'];

export default withAuth({
    pages:{
        signIn:"/auth"
    },
    callbacks:{
        async authorized({req,token}){
            if(!!token){
                console.log('authenticated');
            }
            else{
                console.log('unauthenticated');
            }

            return !!token;
        },
    },
});




export const config = {
    matcher:[
        "/users/:path*",
        "/conversations/:path*",
        
    ]
}