import { useState } from 'react'
import platformContract from './utils/platformContract.json'
import { usePrepareContractWrite, useContractWrite, useSigner } from 'wagmi'
import { ethers } from 'ethers';

export function SendMessage() {
  const [ hasProfile, setHasProfile] = useState(true);
  const [ post, setPost] = useState('');
  const { data: signer } = useSigner()

  const { config, error } = usePrepareContractWrite({
    address: '0x972E818bE6C71750996Bf5E4c36c9Bc803101DBC',
    abi: platformContract.abi,
    functionName: 'uploadPost',
    args: [post],
    signer,
    onSuccess(data) {
      console.log('Success', data)
    },
    onError(error) {
      console.log('Error', error)
    },
  });

  const { write } = useContractWrite(config);

  function handleInput(e: any) {
    setPost(e.value)
  }

  return (
    <>
      {hasProfile ? (
        <form >
          <textarea
            required
            name="message"
            placeholder="Message"
            onChange={handleInput}
          />
          <button onClick={write}>Post!</button>
        </form>
      ) : (
        <div className="text-center">
          <h2>Must own an NFT to post</h2>
        </div>)
      }
    </>
  )
}