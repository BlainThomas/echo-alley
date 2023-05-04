import { useAccount } from 'wagmi'
import { DisplayMessages, SendMessage } from '../components'
import { Layout } from '../components/Layout'

function Page() {
  const { isConnected } = useAccount()

  return (
    <Layout>
      <div className='main-feed'>
        <h1>Welcome To Echo Alley</h1>
        {isConnected &&
          <>
            <SendMessage />
            {/* <DisplayMessages />  */}
          </>} 
      </div>
    </Layout>
  )
}

export default Page