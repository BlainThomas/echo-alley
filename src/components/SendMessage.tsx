import { useState, useEffect } from 'react';
import platformContract from './utils/platformContract.json';
import { usePrepareContractWrite, useContractWrite } from 'wagmi';
import { ipfs } from './utils/ipfs';

export function SendMessage() {
  const [post, setPost] = useState('');
  const [hash, setHash] = useState('QmVYRPge26NENGBh98kz4fJcBbpiye69cpQMZAAqFTJQNw');

  const { config } = usePrepareContractWrite({
    address: `0x${platformContract.address}`,
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
    console.log(result.path)
    setHash( (result as any).path )
  }

  useEffect(() => {
    if (hash != 'QmVYRPge26NENGBh98kz4fJcBbpiye69cpQMZAAqFTJQNw')
      write?.()
  }, [hash]);
  

  return (
    <div className='send-message'>
      <div>
        <h2>Post Message</h2>
        <textarea
          style={{ margin: '20px auto 10px' }}
          required
          name='message'
          placeholder='Message'
          onChange={handleInput}
        />
        <button style={{ margin: '10px auto' }} onClick={ async () => handlePost() } >Post!</button>
      </div>
    </div>
  );
}
