
import { error } from "console";
import { NextResponse } from "next/server";

// sample post
let posts = [
    {
      id: 1,
      title: 'Next.js শেখা শুরু',
      content: 'Next.js একটি powerful React framework...',
      author: 'রহিম',
      category: 'Technology',
      tags: ['nextjs', 'react'],
      createdAt: new Date().toISOString(),
      views: 150
    }
  ];

// single get post
export async function GET(request, {params}){
    const id= parseInt(params.id)
    const post=posts.find(p=p.id===id)

    if(!post){
        return NextResponse.json(
            {
                error:"Post not found now "
            },
            {status:400}
        )
    }
    post.views+=1

    return NextResponse.json(post, {status:201})
}

// update post

export async function PUT(request, {params}) {
    const id=parseInt(params.id)
    const body=await request.json()

    const index=posts.findIndex(p=>p.id===id)

    if(index===-1){
        return NextResponse.json(
            {error:"post not found"},
            {status:404}
        )
    }

    posts[index]={
        ...posts[index],
        ...body,
        id:posts[index].id,
        createdAt:posts[index].createdAt,
        views:posts[index].views,

    }
    return NextResponse.json(posts[index])
    

}


// delete post 


export async function DELETE(request, {params}) {
    
    const id=parseInt(params.id)
    const index= posts.findIndex(p=>p.id===id)

    if (index===-1){
        return NextResponse.json(
            {error:"Post not found"},
            {status:404}
        )
    }
    const deletedPost=posts[index]

    posts.splice(index,1)
    return NextResponse.json(deletedPost)

}