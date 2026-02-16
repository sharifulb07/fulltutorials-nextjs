
async function getUsers(){
    const res=await fetch('https://jsonplaceholder.typicode.com/users')
    if(!res.ok){
        throw new Error("Fetche users failed")
    }
    return res.json()
}

export default async function userPage(){
    const users=await getUsers()

    return(
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Users List</h2>

        <div className="grid gap-4">
          {  users.map((user)=>(
            <div key={user.id} className="border p-4 rounded">
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500">{user.phone}</p>
                </div>
            ))}
            </div>

        </div>
    )
}