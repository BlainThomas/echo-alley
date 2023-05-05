import { usePrepareContractWrite, useContractWrite, useContractRead, useAccount } from 'wagmi'
import platformContract from './utils/platformContract.json'

export function SwitchButton ( props: { id: number } ) {

  const { config } = usePrepareContractWrite({
    address: `0x${platformContract.address}`,
    abi: platformContract.abi,
    functionName: 'setProfile',
    args: [props.id],
  })
  const { write: switchFunction } = useContractWrite(config)

  const handleClick = async () => {
    switchFunction?.()
  }

  return (
    <button onClick={handleClick}>Switch NFT</button>
  )
}