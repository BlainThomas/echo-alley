import { usePrepareContractWrite, useContractWrite, useContractRead } from 'wagmi'
import platformContract from './utils/platformContract.json'

export function SwitchImage ( props: { id: number, isProfile: boolean } ) {

  const id = props.id+1

  const { data, isLoading } = useContractRead({
    address: '0x972E818bE6C71750996Bf5E4c36c9Bc803101DBC',
    abi: platformContract.abi,
    functionName: 'tokenURI',
    args: [id]
  })

  const { config } = usePrepareContractWrite({
    address: '0x972E818bE6C71750996Bf5E4c36c9Bc803101DBC',
    abi: platformContract.abi,
    functionName: 'setProfile',
    args: [id],
  })
  const { write: switchFunction } = useContractWrite(config)

  const handleClick = async () => {
    switchFunction?.()
  }

  return (
    <div className='switch-image'>
      {isLoading ? 
        <h4>Loading</h4>
        :
        <div >
          <img className='NFT' src={data as string} />
          <button onClick={handleClick}>Switch NFT</button>
        </div>
      }
    </div>
  )
}