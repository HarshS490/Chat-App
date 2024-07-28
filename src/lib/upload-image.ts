"use server";
import {v2 as cloudinary} from "cloudinary";
cloudinary.config({
    cloud_name:process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key:process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

export const UploadImage = async(file:File,folder:string)=>{
    const buffer = await file.arrayBuffer();
    const bytes = Buffer.from(buffer);
    return new Promise(async (resolve,reject)=>{
        cloudinary.uploader.upload_stream({
            resource_type:'auto',
            folder:folder,
        },async(err,res)=>{
            if(err){
                return reject(err.message);
            }
            return resolve(res);
        }).end(bytes);
    })
}