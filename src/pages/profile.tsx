import { useAccount } from 'wagmi'
import { useState } from 'react'
import { SendMessage } from '../components'
import { Layout } from '../components/Layout'
import { ProfileData } from '../components'

function Profile() {
  const { isConnected } = useAccount()

  
  return (
    <Layout>
      <div className='profile' >
        <h1>Welcome To Your Profile</h1>
        {isConnected ?
         <ProfileData />
         :
         <h3>Please Connect Your Wallet</h3>
         }
      </div>
    </Layout>
  )
}

export default Profile
