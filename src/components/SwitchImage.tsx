import { useContractRead, useAccount } from 'wagmi'
import platformContract from './utils/platformContract.json'
import { SwitchButton } from './'

export function SwitchImage ( props: { id: number, isProfile: boolean } ) {

  const { address} = useAccount()

  const id = props.id+1

  const { data } = useContractRead({
    address: `0x${platformContract.address}`,
    abi: platformContract.abi,
    functionName: 'tokenURI',
    args: [id]
  })

  const { data: owner, isLoading: ownerLoading } = useContractRead({
    address: `0x${platformContract.address}`,
    abi: platformContract.abi,
    functionName: 'ownerOf',
    args: [id]
  })

  return (
    <>
      {ownerLoading ? 
        <h4>Loading</h4>
        : owner == address ?
        <div >
          <img className='NFT' src={data as string} />
          <SwitchButton id={id} />
        </div>
        : null
      }
    </>
  )
}