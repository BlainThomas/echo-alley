import { useAccount } from 'wagmi'
import { DisplayMessage } from '../components'
import { Layout } from '../components/Layout'

function Page() {
  const { isConnected } = useAccount()

  return (
    <Layout>
      <div className='main-feed'>
      <h1>Welcome To Echo Alley</h1>
      <h2>There are no messages yet. Please go to profile and post!</h2>
      {isConnected &&
      <DisplayMessage />
      }
      </div>
    </Layout>
  )
}

export default Page
