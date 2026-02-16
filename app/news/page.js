
// get news func wth revalidate tags

async function getNews() {
    
    const res=await fetch('https://jsonplaceholder.typicode.com/posts', {next:{tags:"news"}})
    return res.json()

}



// show news 

export default async function NewsPage(){
    const news=await getNews()

    return(
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-2">Latest News</h1>

            <div className="space-y-4">
                <h1>{news.length}</h1>
                {news.slice(0, 5).map((item)=>(
                    <div key={item.id} className="border-b pb-4">
                        <h2 className="text-xl font-semibold mb-2"> {item.title}</h2>
                        <p className="text-shadow-gray-700">{item.body}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

