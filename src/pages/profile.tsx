import { Layout } from '../components/Layout'
import { useContractReads, useAccount } from 'wagmi'
import platformContract from '../components/utils/platformContract.json'
import { MintImage, SwitchImage, ProfileImage } from '../components'
import { BigNumber } from 'ethers';


function Profile() {
  
  let profile = 0;
  let totalTokens;

  const { isConnected, address } = useAccount()

  const { data } = useContractReads({
    contracts: [
      {
        address: `0x${platformContract.address}`,
        abi: platformContract.abi,
        functionName: 'tokenCount',
      },
      {
        address: `0x${platformContract.address}`,
        abi: platformContract.abi,
        functionName: 'profiles',
        args: [address],
      },
    ],
  })
  
  if( data && data[1] ){
    totalTokens = BigNumber.from((data as any)[0]?._hex).toNumber();
    profile = BigNumber.from((data as any)[1]?._hex).toNumber();
  }

  return (
    <Layout>
      <h1>Welcome To Your Profile</h1>
      {isConnected ?
      <>
        <div className='profile'>
          { profile != 0 ? <ProfileImage id={profile} isProfile={true} /> : <h2>Mint an NFT</h2> }
          <MintImage />
        </div>
        <div className='NFT-options'>
          <h2>{ totalTokens && totalTokens > 1 ? 'Your previous Mints' : 'Mint an NFT'}</h2>
          <div style={{display: 'flex'}}>
          { totalTokens ? Array.from({ length: totalTokens }, (_, i) => (
            <SwitchImage key={i} id={i} isProfile={false} />
          )) : null}
          </div>
        </div>
        </>
      :
        <h3>Please Connect Your Wallet</h3>
      }
    </Layout>
  )
}

export default Profile
