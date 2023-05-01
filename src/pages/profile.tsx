import { useAccount } from 'wagmi'
import { SendMessage } from '../components'
import { Layout } from '../components/Layout'

function Profile() {
  const { isConnected } = useAccount()

  return (
    <Layout>
      <div className='profile' >
        <h1>Welcome To Your Profile</h1>
        {isConnected ?
          <SendMessage />
        :
          <div>Please Connect your Wallet</div>
        }
      </div>
    </Layout>
  )
}

export default Profile
