import { error } from "console";
import { NextResponse } from "next/server";

//Temporary data store posts

let Posts = [
  {
    id: 1,
    title: "Next.js শেখা শুরু",
    content:
      "Next.js একটি powerful React framework যা দিয়ে আপনি modern web applications তৈরি করতে পারবেন।",
    author: "রহিম",
    category: "Technology",
    tags: ["nextjs", "react", "web"],
    createdAt: new Date().toISOString(),
    views: 150,
  },
  {
    id: 2,
    title: "JavaScript Tips",
    content: "JavaScript এর কিছু important tips যা আপনার কাজে লাগবে।",
    author: "করিম",
    category: "Programming",
    tags: ["javascript", "tips"],
    createdAt: new Date().toISOString(),
    views: 200,
  },
];

// get method

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const title = searchParams.get("title");
  const content = searchParams.get("content");
  const author = searchParams.get("author");
  const limit = searchParams.get("limit");
  const search = searchParams.get("search");

  let filteredPosts = [...Posts];

  // Author filter
  if (author) {
    filteredPosts = filteredPosts.filter(
      (p) => p.author.toLocaleLowerCase() === author.toLocaleLowerCase()
    );
  }

  // category
  if (category) {
    filteredPosts = filteredPosts.filter(
      (p) => p.category.toLocaleLowerCase() === category.toLocaleLowerCase()
    );
  }

  // search

  if (search) {
    filteredPosts = filteredPosts.filter(
      (p) =>
        p.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        p.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }

  // limit

  if(limit){

    filteredPosts=filteredPosts.slice(0, parseInt(limit))
  }

  // sort by date (newest first)

  filteredPosts.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt))


  return NextResponse(
    {
        posts:filteredPosts,
        total:filteredPosts.length,
        categories:[...new Set(Posts.map(p=>p.category))]
    }
  )

}

// post method

export async function POST(request){
    try {
        const body=await request.json()

        if(!body.author || !body.title ||!body.content){
            return NextResponse.json(
                {error:"Title, Content and author are required"},
                {status:400}
            )
        }

        const newPost={
            id:Posts.length+1,
            title:body.title,
            content:body.content,
            author:body.author,
            category:body.category ||'General',
            tags:body.tags || [],
            createdAt:new Date().toISOString(),
            views:0
        }

        Posts.push(newPost)

        return NextResponse.json(newPost, {status:201})
        
    } catch (error) {
        return NextResponse.json(
            {error:"Invalid request body"},
            {status:404}
        )
    }
}
