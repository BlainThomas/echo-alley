import { usePrepareContractWrite, useContractWrite } from 'wagmi'
import platformContract from './utils/platformContract.json'
import { useState } from 'react'
import { ipfs } from './utils/ipfs'

export function MintImage () {
  const [ uri, setUri] = useState<string>('');

  const { config } = usePrepareContractWrite({
    address: `0x${platformContract.address}`,
    abi: platformContract.abi,
    functionName: 'mint',
    args: [uri],
  })
  const { write: mintFunction } = useContractWrite(config)  

  const uploadToIPFS = async (event: any) => {
    event.preventDefault();
    const files = event.target.files;
    if (!files || files.length === 0) {
      return alert("No files selected");
    }
    const file =  files[0];
    if (!file ) {
      alert("No file selected");
      return;
    }
    const result = await ipfs.add(file, { pin: true });
    setUri(`https://echo-alley.infura-ipfs.io/ipfs/${result.path}`)
  };

  async function handleMint () {
    mintFunction?.()
  }

  return (
    <div className='mint-image' >
      <input
        type="file"
        required
        name="file"
        onChange={uploadToIPFS}
      />
      <button onClick={handleMint}>Mint NFT</button>
    </div>
  )
}