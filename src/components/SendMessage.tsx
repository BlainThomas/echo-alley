import { useState, useEffect } from 'react';
import platformContract from './utils/platformContract.json';
import { usePrepareContractWrite, useContractWrite, useSigner } from 'wagmi';
import { ipfs } from './utils/ipfs';

export function SendMessage() {
  const [hasProfile, setHasProfile] = useState(true);
  const [post, setPost] = useState('test');
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
    console.log(post)
    const result = await ipfs.add(JSON.stringify({ post }));
    console.log(result)
    setHash( (result as any).path )
  }

  useEffect(() => {
    if (hash != 'QmVYRPge26NENGBh98kz4fJcBbpiye69cpQMZAAqFTJQNw')
      write?.()
  }, [hash]);
  function writeNewHash(){
    write?.();
  }

  return (
    <div className='send-message'>
      {hasProfile ? (
        <div>
          <textarea
            style={{ margin: '20px auto 10px' }}
            required
            name='message'
            placeholder='Message'
            onChange={handleInput}
          />
          <button style={{ margin: '10px auto' }} onClick={ async () => handlePost() } >Post!</button>
        </div>
      ) : (
        <div className='text-center'>
          <h2>Must own an NFT to post</h2>
        </div>
      )}
    </div>
  );
}
