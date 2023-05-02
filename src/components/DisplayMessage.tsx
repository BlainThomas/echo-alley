import {Post} from "./hooks/usePostsHook"

interface DisplayMessageProps {
  post: Post
}

export function DisplayMessage({ post }: DisplayMessageProps) {

  return (
    <div key={post.id}>
      <h2>{post.author.username}</h2>
      <p>{post.content}</p>
      <p>Tip amount: {post.tipAmount}</p>
    </div>
  )
}