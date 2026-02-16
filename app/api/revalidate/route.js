
import { time, timeStamp } from "console";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export default async function POST(request) {
   
    try {
        const body=await request.json()
        const tag=body.tag
    
    
        if(!tag){
            return NextResponse.json(
                {error:"Tag required"},
                {status:400}
            )
        }
    
        revalidateTag(tag)
    
        return NextResponse.json({
            revalidateTag:tag,
            tag:true,
            timeStamp: new Date().toISOString()
        })
    
    } catch (error) {
        return NextResponse.json(
            {error:"Failed to revalidate"},
            {status:500}
        )
        
    }



    

}