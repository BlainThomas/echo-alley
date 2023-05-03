export interface DisplayMessageProp {
    post: { 
      key: string;
      author: {
        username: string;
      };
      content: string;
      tipAmount: number;
    };
  }


export interface ProfileProp {
  id: string;
  username: string;
  avatar: string;
}

export interface MintProps{
  avatar: string;
  username: string
}