import { usePrepareContractWrite, useContractWrite } from 'wagmi'
import platformContract from './utils/platformContract.json'

const useSwitchNFT = (id: string) => {
  const { config } = usePrepareContractWrite({
    address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
    abi: platformContract.abi,
    functionName: 'setProfile',
    args: [id],
  })
  const { write: switchFunction } = useContractWrite(config)
  return switchFunction
}

export const SwitchButton = ( nft: any ) => {

  const handleClick = async () => {
    useSwitchNFT(nft.id)
  }

  return (
    <>
      <img src={nft.avatar} />
      <h3>{nft.username}</h3>
      <button onClick={handleClick}>Switch NFT</button>
    </>
  )
}