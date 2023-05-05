import { useContractRead } from 'wagmi'
import platformContract from './utils/platformContract.json'

export function ProfileImage ( props: { id: number, isProfile: boolean } ) {

  const id = props.id

  const { data, isLoading } = useContractRead({
    address: `0x${platformContract.address}`,
    abi: platformContract.abi,
    functionName: 'tokenURI',
    args: [id]
  })

  return (
    <div className='switch-image'>
      {isLoading ? 
        <h4>Loading</h4>
        : 
        <div >
          <h2>Current Profile</h2>
          <img className='NFT' src={data as string} />
        </div>
        
      }
    </div>
  )
}