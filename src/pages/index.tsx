import { useAccount, useContractRead } from 'wagmi'
import { DisplayMessages, SendMessage } from '../components'
import { Layout } from '../components/Layout'
import platformContract from '../components/utils/platformContract.json'
import { BigNumber } from 'ethers'

function Page() {
  const { isConnected, address } = useAccount()

  const { data: imageID, isLoading } = useContractRead({
    address: '0x972E818bE6C71750996Bf5E4c36c9Bc803101DBC',
    abi: platformContract.abi,
    functionName: 'profiles',
    args: [address],
  })

  let profile = 0

  if( !isLoading ){
    profile = BigNumber.from((imageID as any)?._hex).toNumber();
  }

  return (
    <Layout>
      <div className='main-feed'>
        <h1>Welcome To Echo Alley</h1>
        {profile > 0 ? 
          <SendMessage />
        :
          <div className='send-message'>
            <h2>Must own an NFT to post</h2>
          </div>
        }
        {isConnected && <DisplayMessages /> } 
      </div>
    </Layout>
  )
}

export default Page