import { useContractRead } from 'wagmi'
import platformContract from './utils/platformContract.json'

export function ProfileImage ( props: { id: number, isProfile: boolean } ) {

  const id = props.id

  const { data, isLoading } = useContractRead({
    address: '0x972E818bE6C71750996Bf5E4c36c9Bc803101DBC',
    abi: platformContract.abi,
    functionName: 'tokenURI',
    args: [id]
  })

  return (
    <div className='switch-image'>
      {isLoading ? 
        <h4>Loading</h4>
      :
        <img className='NFT' src={data as string} />
      }
    </div>
  )
}