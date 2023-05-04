import { useContractRead } from 'wagmi'
import { Post } from "./utils/Props"
import platformContract from './utils/platformContract.json'


export function Message( props: { post: Post  }  ) {

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

    console.log(data)

  return (
    <div className='display-message'>
      <div>
        {!isLoading && <img className='NFT' src={data as string} />}
        <p>Tip amount: {props.post.tipAmount}</p>
      </div>
      <div className='message-data'>
        <h4>{props.post.author}</h4>
        <p>{props.post.content}</p>
      </div>
    </div>
    )
}