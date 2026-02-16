
import Image from "next/image"
// get product function

async function getProducts(){
    const res=await fetch('https://fakestoreapi.com/products', {next:{revalidate:3600}})
    if (!res.ok){
        throw new Error("Failed to fetch products data")
    }

    return res.json()


}


// show data on route

export default async function ProductPage() {
    
    const products=await getProducts()


    return(
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Products</h1>
            <p className="text-gray-600 p-2 mb-6">Data refresh every hour </p>
            <div className="grid grid-cols-3 gap-6">
                {products.map((product)=>(
                    <div key={product.id} className="rounded-lg cursor-pointer border p-4 hover:shadow-lg transition-all">
                        <Image
                        src={product.image}
                        alt="product image"
                        width={250}
                        height={200}
                        className="h-[200px] w-[300px] object-cover mb-4 rounded ml-8"
                        />
                        <h3 className="font-bold mb-2 line-clamp-2">{product.title}</h3>
                        <p className="text-gray-600 mb-3 text-sm line-clamp-3"> {product.description}</p>
                        <div className="flex justify-center items-center">
                            <span className="font-bold text-2xl text-green-500">{product.price}</span>
                            <span className="text-sm text-gray-500">    ⭐ {product.rating.rate} ({product.rating.count})</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}