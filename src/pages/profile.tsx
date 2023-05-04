import { Layout } from '../components/Layout'
import { useContractReads, useContractRead, useAccount } from 'wagmi'
import platformContract from '../components/utils/platformContract.json'
import { MintImage, SwitchImage, ProfileImage } from '../components'
import { BigNumber } from 'ethers';


function Profile() {
  
  let profile;
  let totalTokens;
  const { isConnected, address } = useAccount()

  const { data } = useContractReads({
    contracts: [
      {
        address: '0x972E818bE6C71750996Bf5E4c36c9Bc803101DBC',
        abi: platformContract.abi,
        functionName: 'tokenCount',
      },
      {
        address: '0x972E818bE6C71750996Bf5E4c36c9Bc803101DBC',
        abi: platformContract.abi,
        functionName: 'profiles',
        args: [address],
      },
    ]
  })
  
  if( data && data[1] ){
    profile = BigNumber.from((data as any)[1]?._hex).toNumber();
    totalTokens = BigNumber.from((data as any)[0]?._hex).toNumber();
  }

  return (
    <Layout>
      <div className='profile' >
        <h1>Welcome To Your Profile</h1>
        {isConnected ?
          <div className=''>
            { profile ?
              <ProfileImage id={profile} isProfile={true} />
            :
              <h4 >No NFT profile, please create one...</h4>
            }
            <MintImage />
            <div className='NFT-options'>
              {totalTokens ? Array.from({ length: totalTokens }, (_, i) => (
                <SwitchImage key={i} id={i} isProfile={false} />
              )) : null}
            </div>
          </div>
        :
          <h3>Please Connect Your Wallet</h3>
        }
      </div>
    </Layout>
  )
}

export default Profile
