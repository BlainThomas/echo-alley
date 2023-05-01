import React, { ReactNode, useState, useRef } from 'react';
import { Navbar, WalletConnectModal } from './'
import { useAccount } from 'wagmi';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [walletModal, setWalletModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const { isConnected } = useAccount();

  function toggleModal() {
    setWalletModal(prevState => !prevState);
  }

  return (
    <div className="layout">
      <Navbar isConnected={isConnected} OpenModal={toggleModal} />
      {walletModal && (
        <div ref={modalRef}>
          <WalletConnectModal walletModal={walletModal} CloseModal={ toggleModal} />
        </div>
      )}
      {isConnected ?
        children
       : 
       <div className='connect-title'>
        <h1>Connect Wallet</h1>
      </div>
      }
    </div>
  )
}