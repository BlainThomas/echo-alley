import { useContractRead } from 'wagmi'
import { Post } from "./utils/Props"
import platformContract from './utils/platformContract.json'
import { Message } from './'


export function DisplayMessages() {

  const { data: rawPosts, isLoading } = useContractRead({
      address: `0x${platformContract.address}`,
      abi: platformContract.abi,
      functionName: 'getAllPosts',
    })
  
    let posts: Post[] = [];
    
  if ( rawPosts ) {
    posts = (rawPosts as any).map( (post: any) => ({
      id: post.id.toString(),
      hash: post.hash,
      tipAmount: (post.tipAmount/1000000000000000000).toString(),
      author: post.author.toString(),
      content: '',
    })) as Post[]
  }

  return (
    <div className='display-messages'>
      {isLoading ?
        <h3>Loading</h3>
      : rawPosts && posts.length > 0 ?
        posts.reverse().map((post: Post, i: number) => <Message key={i} post={post} />)
      : 
      <div className='send-message'>
        <h3>There are no posts yet</h3>
      </div>
      }
    </div>
  )
} 