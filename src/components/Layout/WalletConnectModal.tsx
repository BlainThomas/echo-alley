import { Dialog, Transition } from '@headlessui/react';
import { useAccount, useConnect, useDisconnect } from 'wagmi'

interface WalletConnectModalProp {
  walletModal: boolean;
  CloseModal: () => void;
}

export function WalletConnectModal( {walletModal, CloseModal}: WalletConnectModalProp ) {
  const { isConnected, connector } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
  const { disconnect } = useDisconnect()
  
  const handleConnect = async (x: any) => {
    await connect({ connector: x });
    CloseModal();
  };

  return (
    <Transition appear show={walletModal}>
    <Dialog as="div" className='wallet-modal' onClose={CloseModal}>
      { isConnected ?
        <div>
          <h1>Wallet Connected</h1>
          <button onClick={() => disconnect()}>
            Disconnect from {connector?.name}
          </button>
        </div>
      :
        <div>
          <h1>Connect Wallet</h1>
          <div>
            {connectors
              .filter((x) => x.ready && x.id !== connector?.id)
              .map((x) => (
                <button style={{margin: '15px'}} key={x.id} onClick={() => handleConnect(x)}>
                  {x.name}
                  {isLoading && x.id === pendingConnector?.id && ' (connecting)'}
                </button>
            ))}
          </div>
        {error && <div>{error.message}</div>}
      </div>
      }
      </Dialog>
    </Transition>
  )
}