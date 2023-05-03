import { useAccount, useContractRead } from 'wagmi'
import { DisplayMessage, SendMessage } from '../components'
import { Layout } from '../components/Layout'
import platformContract from "../components/utils/platformContract.json"
import { usePostsHook, Post } from '../components/hooks/usePostsHook'

function Page() {
  const { isConnected } = useAccount()
 

  return (
    <Layout>
      <div className='main-feed'>
        <h1>Welcome To Echo Alley</h1>
        {isConnected &&
          <>
            <SendMessage />
            <DisplayMessage />
          </>
        } 
      </div>
    </Layout>
  )
}

export default Page