import { useContractRead, usePrepareContractWrite, useContractWrite, useSigner } from 'wagmi'
import { useState } from 'react';
import { Post } from "./utils/Props"
import platformContract from './utils/platformContract.json'
import { ethers } from 'ethers';


export function Message( props: { post: Post  }  ) {

  const { data: signer } = useSigner()

  const [content, setContent] = useState<string | null>(null);

  const { data: imageID, isLoading: imageLoading } = useContractRead({
    address: '0x972E818bE6C71750996Bf5E4c36c9Bc803101DBC',
    abi: platformContract.abi,
    functionName: 'profiles',
    args: [props.post.author],
  })

  const id = imageLoading ? 0 : imageID;

  const { data, isLoading } = useContractRead({
    address: '0x972E818bE6C71750996Bf5E4c36c9Bc803101DBC',
    abi: platformContract.abi,
    functionName: 'tokenURI',
    args: [id]
  })

  const fetchContent = async () => {
    const response = await fetch(`https://echo-alley.infura-ipfs.io/ipfs/${props.post.hash}`)
    const content = await response.json();
    setContent(content.post)
  };

  fetchContent();

  const { config } = usePrepareContractWrite({
    address: '0x972E818bE6C71750996Bf5E4c36c9Bc803101DBC',
    abi: platformContract.abi,
    functionName: 'tipPostOwner',
    args: [ '1' ],
    signer,
    overrides: { 
      // from: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
      value: ethers.utils.parseEther("0.01")
    }
  })
  const { write: Tip } = useContractWrite(config)

  return (
    <div className='display-message'>
      <div>
        {!isLoading && <img className='NFT' src={data as string} />}
        <p>Tip amount: {props.post.tipAmount}</p>
        <button onClick={ () => Tip?.()} >Tip Post</button>
      </div>
      <div className='message-data'>
        <h4>{props.post.author}</h4>
        <p className='content' >{content}</p>
      </div>
    </div>
    )
}