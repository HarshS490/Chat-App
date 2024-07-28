import { UploadImage } from "@/lib/upload-image";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    try {
        const formData =await req.formData();
        if(!formData.get('image')){
            return new NextResponse("No file found to upload",{status:400})
        }
        //@ts-ignore
        const data = await UploadImage(formData.get('image'),process.env.CLOUDINARY_FOLDERNAME);
        if(!data){
            return new NextResponse("Error uploading to cloudinary",{status:500});
        }

        //@ts-ignore
        const image = {image:data.secure_url,public_id:data.public_id,
        }

        //@ts-ignore
        return NextResponse.json(image,{status:200});
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal error",{status:500});
    }
}