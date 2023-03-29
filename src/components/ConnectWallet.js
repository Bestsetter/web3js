// import { OpenoceanApiSdk } from '@openocean.finance/api';

// export default function ConnectWallet(){
//   const openoceanApiSdk = new OpenoceanApiSdk()
//   const { swapSdk } = openoceanApiSdk

//   const connectWallet = async  (walletName,chainName) => {
//       let data = await swapSdk.connectWallet({
//           chainName: chainName,
//           walletName: walletName
//       // specialized the chain and wallet name for wallet initalization
//       })
//       if (data.code == 200) {
//       // return 200 means the wallet object is inited 
//           console.log('success')
//           return swapSdk.wallet
//       } else{
//         console.log('error')
//         return
//       }
//   }
//   connectWallet('Account 3','Polygon Mainnet');
//   return <div>ConnectWallet</div>;
// }



import { MetaMask } from "@openocean.finance/wallet";
import { OpenoceanApiSdk } from "@openocean.finance/api";


export default function ConnectWallet(){
  const openoceanApiSdk = new OpenoceanApiSdk();
  const { api, swapSdk, config } = openoceanApiSdk;
  
  const connectWallet = async ( params ) => {
      const myWallet = new MetaMask()
      // console.log('first')
      const result = await myWallet.requestConnect(params.chinId);
      console.log(result)
      // you can use the requestConnect function to trigger your wallet
  }

  const getParams = async () => {
    const params = await OpenOcean.getParams();
    return params
  }
  // connectWallet(getParams);
  const handleClick = () => {
    connectWallet(getParams);
  }

  // const YourSwapFunction = async () => {
  //   let req = await api.getGasPrice({
  //     chain: 'bsc',
  //   })
  //   let swapData = await swapSdk.swapQuote({
  //     chain: 'bsc',
  //     inTokenAddress: "0x55d398326f99059ff775485246999027b3197955",
  //     outTokenAddress: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
  //     amount: 1,
  //     slippage: 1,
  //     account: "0xc1F1Dbe7Cf6c634a4FeAAF7493253e4B0D974099"/*this.wallet.address*/,
  //     gasPrice: req.data.gasPrice,
  //   })
  //   if (swapData.code == 200) {
  //     swapSdk.swap(swapData.data)
  //       .on('error', (error) => {
  //         console.log(`1:${error}`)
  //       })
  //       .on('transactionHash', (hash) => {
  //         console.log(`2:${hash}`)
  //       })
  //       .on('receipt', (data) => {
  //         console.log(`3:${data}`)
  //       })
  //       .on('success', (data) => {
  //         console.log(`4:${data}`)
  //       })
  //   } else {
  //     console.log(`5:${swapData.message}`)
  //     console.log(`5:${swapData}`)
  //   }
  // }

  const swap = async () => {
    if(this.address && this.inAmount > 0) {
      let params = {
      chain: 'bsc',
      inTokenAddress: '0x9029FdFAe9A03135846381c7cE16595C3554e10A',
      outTokenAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      amount: 5,
      gasPrice: 5,
      slippage:100,
      };
      const res = await axios.get("https://open-api.openocean.finance/v3/bsc/swap_quote?inTokenAddress=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&outTokenAddress=0x55d398326f99059ff775485246999027b3197955&amount=5&gasPrice=5&slippage=100&account=0x929B44e589AC4dD99c0282614e9a844Ea9483C69");
      if(res) {
          const {estimatedGas,data,gasPrice} = res.data.data;
          const swapParams = {
              from:this.address,
              to:'0x6352a56caadc4f1e25cd6c75970fa768a3304e64', //this is the only contract you can use if you decide to make transaction by our API.
              gas: estimatedGas,
              gasPrice: gasPrice,
              data
              }; 
          const result = await this.myWallet.sdk.eth.sendTransaction(swapParams)
          }
      else {
        return
      }
    }
  }
  
  return (
    <>
      <div>ConnectWallet</div>
      <button onClick={handleClick}>connect</button>
      <button onClick={YourSwapFunction}>Swap</button>
    </>
  );
}