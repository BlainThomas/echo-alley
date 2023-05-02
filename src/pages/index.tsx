import { useAccount, useContractRead } from 'wagmi'
import { DisplayMessage } from '../components'
import { Layout } from '../components/Layout'
import platformContract from "../components/utils/platformContract.json"
import { usePostsHook, Post } from '../components/hooks/usePostsHook'

function Page() {
  const { isConnected } = useAccount()

  const { data: rawPosts } = useContractRead({
      address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
      abi: platformContract.abi,
      functionName: 'getAllPosts',
    })

  const posts = usePostsHook(rawPosts as any)

  return (
    <Layout>
      <div className='main-feed'>
        <h1>Welcome To Echo Alley</h1>
        {posts.length === 0 ? 
          <h2>There are no messages yet. Please go to profile and post!</h2>
         : 
          <>
            {isConnected && posts.map((post: Post, i: number) => (
              <DisplayMessage key={i} post={post} />
            ))}
          </>
        }
      </div>
    </Layout>
  )
}

export default Page