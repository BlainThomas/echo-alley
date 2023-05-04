import { useContractRead } from 'wagmi'
import { Post } from "./utils/Props"
import platformContract from './utils/platformContract.json'
import { Message } from './'


export function DisplayMessages() {

  const { data: rawPosts, isLoading } = useContractRead({
      address: '0x972E818bE6C71750996Bf5E4c36c9Bc803101DBC',
      abi: platformContract.abi,
      functionName: 'getAllPosts',
    })

    const posts = (rawPosts as any).map( (post: any) => ({
      id: post.id.toString(),
      hash: post.hash,
      tipAmount: post.tipAmount.toString(),
      author: post.author.toString(),
      content: '',
    })) as Post[]

    console.log(posts)

  return (
    <div className='display-messages'>
      {isLoading ? (
        <h3>Loading</h3>
      // ) : posts.length > 0 ? (
      //   posts.map((post: Post, i: number) => <Message key={i} post={post} />)
      ) : (
        <h3>There are no messages yet</h3>
      )}
    </div>
  )
} 