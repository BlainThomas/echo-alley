import { useAccount, useContractReads } from 'wagmi';
import platformContract from '../utils/platformContract.json';
import { useEffect, useState } from 'react';

export interface Post {
    id: string;
    content: string;
    tipAmount: number;
    author: {
      address: string;
      username: string;
      avatar: string;
    };
  }

  export const usePostsHook = (rawPosts: any[]): Post[] => {
    const { isConnected } = useAccount();
    const [posts, setPosts] = useState<Post[]>([]);
  
    useEffect(() => {
      const fetchPosts = async () => {
        if (!isConnected) return;
  
        const { data: nftAddressesResult } = await useContractReads({
          contracts: [
            {
              address: "0xBE261a83f5a50154e22Bf1F717e92929c5FB2B50",
              abi: platformContract.abi,
              functionName: 'getNftAddresses',
            },
          ],
        });
  
        if (!nftAddressesResult) return;
  
        const nftAddresses = nftAddressesResult as string[];
  
        const postPromises = rawPosts.map(async (rawPost) => {
          const { data: nftIdResult } = await useContractReads({
            contracts: [
              {
                address: "0xBE261a83f5a50154e22Bf1F717e92929c5FB2B50",
                abi: platformContract.abi,
                functionName: 'profiles',
                args: [rawPost.author],
              },
            ],
          });
  
          if (!nftIdResult) return;
  
          const nftId = nftIdResult as unknown as string;
  
          const { data: metadataResult } = await useContractReads({
            contracts: [
              {
                address: "0xBE261a83f5a50154e22Bf1F717e92929c5FB2B50",
                abi: [
                  'function metadata() external view returns (string)',
                ],
                functionName: 'metadata',
              },
            ],
          });
  
          if (!metadataResult) return;
  
          const metadataJson = JSON.parse(metadataResult as unknown as string);
  
          const author = {
            address: rawPost.author,
            username: metadataJson.username,
            avatar: metadataJson.avatar,
          };
  
          const post = {
            id: rawPost.id,
            content: metadataJson.post,
            tipAmount: rawPost.tipAmount,
            author,
          };
  
          return post;
        });
  
        const resolvedPosts = await Promise.all(postPromises);
        setPosts(resolvedPosts.filter((post) => post !== undefined) as Post[]);
      };
  
      fetchPosts();
    }, [isConnected, rawPosts]);
  
    return posts;
  };