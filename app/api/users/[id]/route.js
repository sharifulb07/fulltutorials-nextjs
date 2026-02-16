import { error } from "console";
import { NextResponse } from "next/server";

// local data
const users=[
    {id:1, name:"Hasan",email:"hasan@gmmail.com"},
    {id:2, name:"Adiyat", email:"adiyat@gmail.com"}
]

// get-> single user

export async function Get(request, {params}){
    const id=parseInt(params.id)
    const user=users.find(u=>u.id==id)

    if(!user){
        return NextResponse.json(
            {error:"User not found"},
            {status:404}
        )
        return NextResponse.json(user)
    }
}


// put -> update user

export async function PUT(request, {params}){
    const id=parseInt(params.id)
    const index=users.findIndex(u=>u.id==id)

    const body=await request.json()

    if(!users[index]){
        return NextResponse.json(
            {error:"User not Found"},
            {status:404}
        )
    }
    users[index]={...users[i], ...body}

    return NextResponse.json(users[index])
}

// delete-> erase a user from database


export async function DELETE(request, {params}) {
    const id=parseInt(params.id)
    const index=users.findIndex(u=>u.id==id)

    if (index==-1){
        return NextResponse.json(
            {error:"User not found"},
            {status:404}
        )
    }

    users.splice(index,1)

    return NextResponse.json({message:"user is delete successfully "})
}