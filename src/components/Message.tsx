import { useContractRead } from 'wagmi'
import { useState } from 'react';
import { Post } from "./utils/Props"
import platformContract from './utils/platformContract.json'


export function Message( props: { post: Post  }  ) {

  const [content, setContent] = useState<string | null>(null);

  const { data: imageID, isLoading: imageLoading } = useContractRead({
    address: '0x972E818bE6C71750996Bf5E4c36c9Bc803101DBC',
    abi: platformContract.abi,
    functionName: 'profiles',
    args: [props.post.author],
  })

  const id = imageLoading ? 0 : imageID;
  console.log(props.post)

  const fetchContent = async () => {
    const response = await fetch(`https://echo-alley.infura-ipfs.io/ipfs/${props.post.hash}`)
    const content = await response.json();
    console.log(content)
    setContent(content.post)
  };

  fetchContent();

  const { data, isLoading } = useContractRead({
    address: '0x972E818bE6C71750996Bf5E4c36c9Bc803101DBC',
    abi: platformContract.abi,
    functionName: 'tokenURI',
    args: [id]
  })

  return (
    <div className='display-message'>
      <div>
        {!isLoading && <img className='NFT' src={data as string} />}
        <p>Tip amount: {props.post.tipAmount}</p>
      </div>
      <div className='message-data'>
        <h4>{props.post.author}</h4>
        <p className='content' >{content}ghjsdfiklagfjhldsagihujbdslhjfgdskjhgflijsdbhfugbvwdeshyjugbvfrhyjuewgvblhyfrvlwehjvfhgjuwehgjuvfhduasbfLHKJEB HYFGQELEUIHGF IHUDEGAHLJVCBDLSHJ YW IFIE FIUEIVFG UHLBVHJL BUIF WGUIFG EHIJ;GFIHAJHC BH;KI</p>
      </div>
    </div>
    )
}
