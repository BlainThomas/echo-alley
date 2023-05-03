import { usePrepareContractWrite, useContractWrite } from 'wagmi'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import platformContract from './utils/platformContract.json'
import { MintProps } from './utils/Props'

const client = ipfsHttpClient()

const useMintNFT = (uri: string) => {
  const { config } = usePrepareContractWrite({
    address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
    abi: platformContract.abi,
    functionName: 'mint',
    args: [uri],
  })
  const { write: mintFunction } = useContractWrite(config)
  return mintFunction
}

export const MintButton = ( {avatar, username}: MintProps ) => {

  const uploadToIPFS = async (event: any) => {
    event.preventDefault()
    const file = event.target.files[0]
    if (typeof file !== 'undefined') {
        try {
            const result = await client.add(file)
            // setAvatar(`https://ipfs.infura.io/ipfs/${result.path}`)
        } catch (error) {
            console.log("ipfs image upload error: ", error)
        }
    }
}

  const handleClick = async () => {
    const result = await client.add(JSON.stringify({ avatar, username }))
    const uri = result.path ? `https://ipfs.infura.io/ipfs/${result.path}` : ''
    useMintNFT(uri)
  }

  return (
    <div>
      <input
        type="file"
        required
        name="file"
        onChange={uploadToIPFS}
      />
      <button onClick={handleClick}>Mint NFT</button>
    </div>
  )
}