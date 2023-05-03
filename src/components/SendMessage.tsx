import { useState } from 'react'
import platformContract from './utils/platformContract.json'
import { usePrepareContractWrite, useContractWrite } from 'wagmi'

export function SendMessage() {
  const [ hasProfile, setHasProfile] = useState(true);
  const [ loading, setLoading] = useState(false);
  const [ post, setPost] = useState('');

  const uploadPost = async () => {
    console.log(post)
    if (!post) return;
    setLoading(true);
    const { config, error } = usePrepareContractWrite({
      address: '0x972E818bE6C71750996Bf5E4c36c9Bc803101DBC',
      abi: platformContract.abi,
      functionName: 'uploadPost',
      args: [post],
    });
    if (error) {
      window.alert('Error preparing contract write: ' + error.message);
      return;
    }
    try {
      const { write } = useContractWrite(config);
      if (!write) {
        window.alert('Error writing to contract: write function is undefined');
        return;
      }
      await write();
    } catch (error: any) {
      window.alert('Error writing to contract: ' + error.message);
    }
    setLoading(false);
  }

  


  return (
    <>
      {hasProfile ? (
        <form >
          <textarea
            required
            name="message"
            placeholder="Message"
          />
          <button onClick={ () => uploadPost} >
              Post!
          </button>
        </form>
      ) : (
        <div className="text-center">
          <h2>Must own an NFT to post</h2>
        </div>)
      }
    </>
  )
}