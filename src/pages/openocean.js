import React from "react";
import Web3 from "web3";
import dynamic from "next/dynamic";

const OpenoceanComponents = dynamic(() => import('@/components/OpenoceanComponent'), {
  ssr: false,
})

const ConnectWallet = dynamic(() => import('@/components/ConnectWallet'), {
  ssr: false,
})

export default function Openocean() {
  return (
    <div>
      openocean
      <OpenoceanComponents />
      <ConnectWallet/>
    </div>
  );
}
