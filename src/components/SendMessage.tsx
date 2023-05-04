import { useState, useCallback } from 'react';
import platformContract from './utils/platformContract.json';
import { usePrepareContractWrite, useContractWrite, useSigner } from 'wagmi';
import { ipfs } from './utils/ipfs';

export function SendMessage() {
  const [hasProfile, setHasProfile] = useState(true);
  const [post, setPost] = useState('');
  const [hash, setHash] = useState('QmVYRPge26NENGBh98kz4fJcBbpiye69cpQMZAAqFTJQNw');


  const { config } = usePrepareContractWrite({
    address: '0x972E818bE6C71750996Bf5E4c36c9Bc803101DBC',
    abi: platformContract.abi,
    functionName: 'uploadPost',
    args: [hash],
  })
  const { write } = useContractWrite(config)  

  function handleInput(e: any) {
    setPost(e.target.value);
  }

  async function handlePost () {
    const result = await ipfs.add(JSON.stringify({ post }));
    console.log(result)
    setHash( (result as any).path )
    write?.();
  }

  return (
    <div className='send-message'>
      {hasProfile ? (
        <div>
          <textarea
            required
            name='message'
            placeholder='Message'
            onChange={handleInput}
          />
          <button onClick={ async () => handlePost() } >Post!</button>
        </div>
      ) : (
        <div className='text-center'>
          <h2>Must own an NFT to post</h2>
        </div>
      )}
    </div>
  );
}
