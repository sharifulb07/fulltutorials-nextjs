// parallel data fetching

// get users
async function getUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) {
    throw new Error("User not Found ");
  }
  return res.json();
}

// get posts
async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) {
    throw new Error("Post not Found");
  }
  return res.json();
}
// get comments
async function getComments() {
  const res = await fetch("https://jsonplaceholder.typicode.com/comments");
  if (!res.ok) {
    throw new Error("Comment not found ");
  }
  return res.json();
}

// dashboard

export default async function Dashboard() {
  const [users, posts, comments] = await Promise.all([
    getUsers(),
    getPosts(),
    getComments(),
  ]);

  return (
    <div className="bg-amber-500 rounded-2xl p-6">
      <div className="grid grid-cols-3 gap-4 p-2">
        <div className="bg-green-500 rounded-lg p-4">
          <h2 className="font-semibold">Users Length: </h2>
          <p className="font-bold text-2xl">{users?.length || 0}</p>
        </div>
        <div className="bg-blue-500 rounded-lg p-4">
          <h2 className="font-semibold">Posts Length: </h2>
          <p className="font-bold text-2xl">{posts?.length || 0}</p>
        </div>
        <div className="bg-purple-500 rounded-lg p-4">
          <h2 className="font-semibold">Comments Length: </h2>
          <p className="font-bold text-2xl">{comments?.length || 0}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {/* uses */}
        <div>
          <h2>Users List</h2>
          <div>
            {users?.slice(0, 5).map((user) => (
              <div key={user.id}>
                <h2 className="text-black"> Name : {user.name}</h2>
                <p className="text-sm text-yellow-300">Email: {user.email}</p>
              </div>
            ))}
          </div>
        </div>

        {/* posts */}

        <div>
          <h2>Users Lists</h2>
          <div>
            {posts?.slice(0, 5).map((post) => (
              <div key={post.id}>
                <h2 className="text-black">{post.title}</h2>
                <p className="text-sm text-white">{post.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Comments */}
        <div>
          <h2>Users List</h2>
          <div>
            {comments?.slice(0, 5).map((comment) => (
              <div key={comment.id}>
                <h2 className="text-black">{comment.name}</h2>
                <p className="text-sm text-white">{comment.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
