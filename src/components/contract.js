import Head from 'next/head'
import Web3 from 'web3'
import 'bulma/css/bulma.css'
import styles from '../styles/VendingMachine.module.css'
import { useState } from 'react'
import lottery_require_all_abi from '../../abi/lottery_require_all.json'
import lottery_event_abi from '../../abi/lottery_event.json'
import lottery_require_abi from '../../abi/lottery_require.json'
import lottery_nft_abi from '../../abi/lottery_nft.json'
import lottery_recieve_abi from '../../abi/lottery_recieve.json'
import lottery_winner_abi from '../../abi/lottery_winner.json'
import lottery_transection_abi from '../../abi/lottery_transection.json'
import lottery_url_abi from '../../abi/lottery_url.json'
import lottery_token_abi from '../../abi/lottery_token.json'
import ERC20_abi from '../../abi/ERC20.json'
import Ballot_abi from '../../abi/Ballot.json'


const VendingMachine = () =>{
	let web3 = new Web3(process.env.NEXT_PUBLIC_PROVIDER);
	const contract_event = new web3.eth.Contract(lottery_event_abi,process.env.NEXT_PUBLIC_lottery_event_address)
	const contract_require = new web3.eth.Contract(lottery_require_abi,process.env.NEXT_PUBLIC_lottery_require_address)
	const contract_lottery_nft = new web3.eth.Contract(lottery_nft_abi,process.env.NEXT_PUBLIC_lottery_nft_address)
    const contract_lottery_recieve = new web3.eth.Contract(lottery_recieve_abi,process.env.NEXT_PUBLIC_lottery_recieve_address)
    const contract_lottery_winner = new web3.eth.Contract(lottery_winner_abi,process.env.NEXT_PUBLIC_lottery_winner_address)
    const contract_lottery_transection = new web3.eth.Contract(lottery_transection_abi,process.env.NEXT_PUBLIC_lottery_transection_address)
    const contract_lottery_url = new web3.eth.Contract(lottery_url_abi,process.env.NEXT_PUBLIC_lottery_url_address)
    const contract_lottery_token = new web3.eth.Contract(lottery_token_abi,process.env.NEXT_PUBLIC_lottery_token_address)
    const contract_lottery_requireall = new web3.eth.Contract(lottery_require_all_abi,process.env.NEXT_PUBLIC_lottery_require_all_address)

    const [error,setError] = useState('')
	const [canbuy,setCanbuy] = useState(0)
	const [canbuystatus,setCanbuystatus] = useState('unknow')
    const [lotterystatus,setLotterystatus] = useState('unknow')
    const [owneraddress,setOwneraddress] = useState('unknow')
    const [totalevent,setTotalevent] = useState('unknow')
    const [totalamount,setTotalamount] = useState('unknow')
    const [tokenaddress,setTokenaddress] = useState('unknow')
    const [exchangeaddress,setExchangeaddress] = useState('unknow')
	const handlecanbuychange = (e) => {
		setCanbuy(e.target.value)
	}


    //window.ethereum
    const connectWalletHandler = async () => {
        if (typeof window !== "undefined" && typeof window.ethereum !== "undefined"){
            try{
                await window.ethereum.request({method:"eth_requestAccounts"})
                web3 = new Web3(window.ethereum)
				console.log(web3)
            }catch(err){
                setError(err.message)
                console.log(account)
            }
            
        }else{
            console.log('Please install MetaMask')
        }
    }
    const checkprovider = () => {
        if (typeof web3 !== 'undefined') { 
            console.debug(web3.currentProvider);
            web3 = new Web3(web3.currentProvider);
            console.log(web3.currentProvider)
            console.log(web3)
        } else {
            alert("No currentProvider for web3");
        }
    }
    const canBuy = () => {
        try{
			const callfunction = contract_lottery_requireall.methods.canBuy(canbuy).call();
			console.log(callfunction)
            callfunction.then((a) => { setCanbuystatus(String(a)) })
        }catch(err){
            setError(err.message)
            console.log(err)
        }
    }

    // contract_event
    const _isLotteryActive = () => {
        const callfunction = contract_event.methods._isLotteryActive().call();
		console.log(callfunction)
        callfunction.then((a) => { setLotterystatus(String(a)) })
    }
    const owner = () => {
        const callfunction = contract_event.methods.owner().call();
		console.log(callfunction)
        callfunction.then((a) => { setOwneraddress(String(a)) })
    }
    const totalEvent = () => {
        const callfunction = contract_event.methods.totalEvent().call();
		console.log(callfunction)
        callfunction.then((a) => { setTotalevent(String(a)) })
    }

    // contract_lottery_recieve
    const totalAmount = () => {
        const callfunction = contract_lottery_recieve.methods.totalAmount().call();
		console.log(callfunction)
        callfunction.then((a) => { setTotalamount(String(a)) })
    }
    const event_tokenid = () => {
        const callfunction = contract_lottery_recieve.methods.event_tokenid().call();
		console.log(callfunction)
    }
    const tokenId_eventId = () => {
        const callfunction = contract_lottery_recieve.methods.tokenId_eventId().call();
		console.log(callfunction)
    }
    const tokenId_address = () => {
        const callfunction = contract_lottery_recieve.methods.tokenId_address().call();
		console.log(callfunction)
    }
    const tokenId_prediction = () => {
        const callfunction = contract_lottery_recieve.methods.tokenId_prediction().call();
		console.log(callfunction)
    }
    const buyer_bool = () => {
        const callfunction = contract_lottery_recieve.methods.buyer_bool().call();
		console.log(callfunction)
    }
    const getBonus = () => {
        const callfunction = contract_lottery_recieve.methods.getBonus().call();
		console.log(callfunction)
    }
    const getEventIdtokenIdLength = () => {
        const callfunction = contract_lottery_recieve.methods.getEventIdtokenIdLength().call();
		console.log(callfunction)
    }
    const getTokenIdEventId = () => {
        const callfunction = contract_lottery_recieve.methods.getTokenIdEventId().call();
		console.log(callfunction)
    }
    const getEvent_tokenid = () => {
        const callfunction = contract_lottery_recieve.methods.getEvent_tokenid().call();
		console.log(callfunction)
    }
    const getTokenId_prediction = () => {
        const callfunction = contract_lottery_recieve.methods.getTokenId_prediction().call();
		console.log(callfunction)
    }


    // contract_lottery_transection
    const AllowedCrypto = () => {
        const callfunction = contract_lottery_transection.methods.AllowedCrypto(1).call();
		console.log(callfunction)
        callfunction.then((a) => { console.log(a[0]);console.log(a[1]);console.log(a[2]);console.log(a[3]) })
    }
    const token_address = () => {
        const callfunction = contract_lottery_transection.methods.token_address().call();
		console.log(callfunction)
        callfunction.then((a) => { setTokenaddress(a) })
    }
    const exchange_address = () => {
        const callfunction = contract_lottery_transection.methods.exchange_address().call();
		console.log(callfunction)
        callfunction.then((a) => { setExchangeaddress(a) })
    }
    const getLatestPrice = () => {
        const callfunction = contract_lottery_transection.methods.getLatestPrice(0,0,0).call();//活動代碼，票數，第幾種代幣
		console.log(callfunction)
    }

    // contract_lottery_winner
    const getTokenId_win = () => {
        const callfunction = contract_lottery_winner.methods.getTokenId_win().call();
		console.log(callfunction)
    }
    const getEventId_wintokenId = () => {
        const callfunction = contract_lottery_winner.methods.getEventId_wintokenId().call();
		console.log(callfunction)
    }
    const getEventId_wintokenIdLength = () => {
        const callfunction = contract_lottery_winner.methods.getEventId_wintokenIdLength().call();
		console.log(callfunction)
    }
    const getEnentId_winprediction = () => {
        const callfunction = contract_lottery_winner.methods.getEnentId_winprediction().call();
		console.log(callfunction)
    }
    const getEnentId_winner = () => {
        const callfunction = contract_lottery_winner.methods.getEnentId_winner().call();
		console.log(callfunction)
    }
    const getTokenId_takenmoney = () => {
        const callfunction = contract_lottery_winner.methods.getTokenId_takenmoney().call();
		console.log(callfunction)
    }
    const tokenId_takenmoney = () => {
        const callfunction = contract_lottery_winner.methods.tokenId_takenmoney().call();
		console.log(callfunction)
    }
    const enentId_winner = () => {
        const callfunction = contract_lottery_winner.methods.enentId_winner().call();
		console.log(callfunction)
    }
    const tokenId_win = () => {
        const callfunction = contract_lottery_winner.methods.tokenId_win().call();
		console.log(callfunction)
    }
    const eventId_wintotal = () => {
        const callfunction = contract_lottery_winner.methods.eventId_wintotal().call();
		console.log(callfunction)
    }
    const eventId_wintokenId = () => {
        const callfunction = contract_lottery_winner.methods.eventId_wintokenId().call();
		console.log(callfunction)
    }
    const enentId_winprediction = () => {
        const callfunction = contract_lottery_winner.methods.enentId_winprediction().call();
		console.log(callfunction)
    }
    const organizer_bool = () => {
        const callfunction = contract_lottery_winner.methods.organizer_bool().call();
		console.log(callfunction)
    }

	const ERC20 = () => {
        try{
            const contract = new web3.eth.Contract(ERC20_abi,process.env.NEXT_PUBLIC_USDT_address)
            console.log(contract)
			const call = contract.methods.approve('0xfe8fDab51be1E3fF449195c3a36641762efa9541',100).send({from:'0x0a8010d0C1d29d661B6e841559cDCb33a4c07689'})
			console.log(call)
        }catch(err){
            setError(err.message)
            console.log(err)
        }
    }
}