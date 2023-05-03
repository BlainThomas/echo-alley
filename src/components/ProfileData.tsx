import { useContractReads, useContractRead, useAccount } from 'wagmi'
import { useState } from 'react'
import { ProfileProp } from './utils/Props'
import platformContract from './utils/platformContract.json'
import { MintButton, SwitchButton } from './'

export const ProfileData= () => {
  const { address } = useAccount()
  const [profile, setProfile] = useState<ProfileProp>()
  const [nfts, setNfts] = useState<ProfileProp[]>([])

  const { data: Profile, isLoading } = useContractReads({
    contracts: [
      {
        address: '0x972E818bE6C71750996Bf5E4c36c9Bc803101DBc',
        abi: platformContract.abi,
        functionName: 'getMyNfts',
      },
      {
        address: '0x972E818bE6C71750996Bf5E4c36c9Bc803101DBc',
        abi: platformContract.abi,
        functionName: 'tokenURI',
      },
      {
        address: '0x972E818bE6C71750996Bf5E4c36c9Bc803101DBc',
        abi: platformContract.abi,
        functionName: 'profiles',
        args: [address],
      },
    ],
    })

  const useTokenURI = (tokenId: number) => {
    const { data } = useContractRead({
      address: '0x972E818bE6C71750996Bf5E4c36c9Bc803101DBc',
      abi: platformContract.abi,
      functionName: 'profiles',
      args: [tokenId],
      onSuccess(data) {
        console.log('Success', data)
      },
    });
    return data;
  };


  return (
    <div className=''>
        {profile ? (
          <div >
            <h3 >{profile.username}</h3>
            <img src={profile.avatar} />
          </div>)
        :
          <h4 >No NFT profile, please create one...</h4>
        }
        <MintButton avatar='string' username='string' />
        <div>
          {nfts.map((nft, idx) => {
            if (nft.id != profile?.id) return
            return ( <SwitchButton nft={nft} /> )
          })}
        </div>
    </div>
  )
}

export default ProfileData
