import { usePrepareContractWrite, useContractWrite } from 'wagmi'
import ipfsClient from 'ipfs-http-client';
import { create as ipfsHttpClient } from 'ipfs-http-client'
import platformContract from './utils/platformContract.json'
import { useState } from 'react'

const ipfs = ipfsHttpClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

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

export const MintButton = () => {
  const [avatar, setAvatar] = useState('');

  const uploadToIPFS = async (event: any) => {
    // Get the selected file from the input field
    const file = event.target.files[0];

    // Upload the file to IPFS and get the URI of the uploaded content
    const { path } = await ipfs.add(file);

    // Set the URI of the uploaded content to the component's state
    setAvatar(path);
  }

  const handleClick = async () => {
    // Mint the NFT using the URI of the uploaded content
    useMintNFT(avatar)
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