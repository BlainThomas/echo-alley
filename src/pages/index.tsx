import { useAccount, useContractRead } from 'wagmi'
import { DisplayMessages, SendMessage } from '../components'
import { Layout, TestnetDescription } from '../components/Layout'
import platformContract from '../components/utils/platformContract.json'
import { BigNumber } from 'ethers'

function Page() {
  const { isConnected, address } = useAccount()

  const { data: imageID, isLoading } = useContractRead({
    address: `0x${platformContract.address}`,
    abi: platformContract.abi,
    functionName: 'profiles',
    args: [address],
  })

  let profile = 0

  if( !isLoading && isConnected ){
    profile = BigNumber.from((imageID as any)?._hex).toNumber();
  }

  return (
    <Layout>
      <TestnetDescription />
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