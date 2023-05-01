import Link from 'next/link';
import React from 'react';

interface NavbarProps {
  isConnected: boolean;
  OpenModal: () => void;
}

export function Navbar( { OpenModal,isConnected } : NavbarProps) {

  function handleWalletModal(){
    OpenModal();
  }
 
  return (
    <div className="navbar">
      <div className='nav-links' >
        <Link className='home-link' href={'/'} >
          <h1>Echo Alley</h1>
        </Link>
        <Link className='link' href={'/profile'} >
          <h3>Profile</h3>
        </Link>
      </div>
      <button style={{margin:'15px'}} onClick={handleWalletModal} >
        {isConnected ? 'Connected' : 'Connect'}
      </button>
    </div>
  )
}