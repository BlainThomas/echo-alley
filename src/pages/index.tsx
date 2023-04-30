import { useAccount } from 'wagmi'

import { Connect } from '../components'

function Page() {
  const { isConnected } = useAccount()

  return (
    <>
      <h1>wagmi + Next.js</h1>
      <Connect />
    </>
  )
}

export default Page
