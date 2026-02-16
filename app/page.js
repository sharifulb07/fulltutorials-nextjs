import Image from "next/image";

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/hello/");
  const data = await response.json();

  return (
    <div>
      <h1>First Project </h1>
      <h2>{data.message}</h2>
    </div>
  );
}
