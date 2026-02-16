
import {NextResponse} from "next/server";


// array of objects of users

const users=[
    {id:1, name:"Rahim", email:"rahim@gmail.com"},
    {id:2, name:"Karim", email:"karim@gmail.com"}
]



// get method

export async function GET(request){
    const searchParams=request.nextUrl.searchParams
    const  search=searchParams.get('search')

    if (search){
        const filteredUsers=users.filter((u)=>u.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
        return NextResponse.json(filteredUsers)
    }
    return NextResponse.json(users)
}

// post method

export async function POST(request){

    try{
    const body=request.json()

    if(!body.name || !body.email){
        return NextResponse.json(
            {error:"Name and Email is required"},
            {status:201}
        )
    }

    const newUser={
        id:users.length+1,
        name:body.name,
        email:body.email
    }

    users.push(newUser)

    return NextResponse.json(newUser, {status:201})}
    catch(err){
        return NextResponse.json({error:"Invalid Json"}, {status:400})
    }
}