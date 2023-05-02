export default interface DisplayMessageProp {
    post: { 
      key: string;
      author: {
        username: string;
      };
      content: string;
      tipAmount: number;
    };
  }