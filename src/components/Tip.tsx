import { usePrepareContractWrite, useContractWrite, useSigner } from 'wagmi'
import platformContract from './utils/platformContract.json'
import { ethers } from 'ethers';


export function Tip( props: { id: number  }  ) {

  const { data: signer } = useSigner()

  const { config } = usePrepareContractWrite({
    address: `0x${platformContract.address}`,
    abi: platformContract.abi,
    functionName: 'tipPostOwner',
    args: [ props.id ],
    signer,
    overrides: { 
      value: ethers.utils.parseEther("0.01")
    }
  })
  const { write: Tip } = useContractWrite(config)

  return (
    <button onClick={ () => Tip?.()} >Tip Post</button>
  )
}