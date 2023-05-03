import { useContractRead } from 'wagmi'
import { Post } from "./hooks/usePostsHook"
import platformContract from './utils/platformContract.json'


export function DisplayMessage() {

  const { data: rawPosts, isLoading } = useContractRead({
      address: '0x972E818bE6C71750996Bf5E4c36c9Bc803101DBC',
      abi: platformContract.abi,
      functionName: 'getAllPosts',
    })

    console.log(rawPosts)

  const posts = rawPosts as Post[]


  return (
    <>
      {posts.map((post: Post, i: number) => (
      <div key={post.id}>
        <h2>{post.author.username}</h2>
        <p>{post.content}</p>
        <p>Tip amount: {post.tipAmount}</p>
      </div>
    ))}
    </>
    )
}