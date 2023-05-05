import { useContractRead, useAccount } from 'wagmi'
import { useState } from 'react';
import { Post } from "./utils/Props"
import platformContract from './utils/platformContract.json'
import { Tip } from './'

export function Message( props: { post: Post  }  ) {

  const { address } = useAccount()

  const [content, setContent] = useState<string | null>(null);

  const { data: imageID, isLoading: imageLoading } = useContractRead({
    address: `0x${platformContract.address}`,
    abi: platformContract.abi,
    functionName: 'profiles',
    args: [props.post.author],
  })

  const id = imageLoading ? 0 : imageID;

  const { data, isLoading } = useContractRead({
    address: `0x${platformContract.address}`,
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

  console.log(props.post.id)

  return (
    <div className='display-message'>
      <div>
        {!isLoading && <img className='NFT' src={data as string} />}
        <p>Tip amount: {props.post.tipAmount}</p>
        { address != props.post.author && props.post.id && <Tip id={props.post.id}/> }
      </div>
      <div className='message-data'>
        <h4>{props.post.author}</h4>
        <p className='content' >{content}</p>
      </div>
    </div>
    )
}