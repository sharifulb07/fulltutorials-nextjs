
import { NextResponse } from "next/server";

export async function GET() {
    
    return NextResponse.json({
        message:"Hello From Api",
        timestamp:new Date().toISOString()
    })
}