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
	let web3  = new Web3(process.env.NEXT_PUBLIC_PROVIDER);
	// console.log(web3)
	const contract_event = new web3.eth.Contract(lottery_event_abi,process.env.NEXT_PUBLIC_lottery_event_address)
	// console.log(contract_event)
	const contract_require = new web3.eth.Contract(lottery_require_abi,process.env.NEXT_PUBLIC_lottery_require_address)
    // console.log(contract_require)
	const contract_lottery_nft = new web3.eth.Contract(lottery_nft_abi,process.env.NEXT_PUBLIC_lottery_nft_address)
    // console.log(contract_lottery_nft)
    const contract_lottery_recieve = new web3.eth.Contract(lottery_recieve_abi,process.env.NEXT_PUBLIC_lottery_recieve_address)
    // console.log(contract_lottery_recieve)
    const contract_lottery_winner = new web3.eth.Contract(lottery_winner_abi,process.env.NEXT_PUBLIC_lottery_winner_address)
    // console.log(contract_lottery_winner)
    const contract_lottery_transection = new web3.eth.Contract(lottery_transection_abi,process.env.NEXT_PUBLIC_lottery_transection_address)
    // console.log(contract_lottery_transection)
    const contract_lottery_url = new web3.eth.Contract(lottery_url_abi,process.env.NEXT_PUBLIC_lottery_url_address)
    // console.log(contract_lottery_url)
    const contract_lottery_token = new web3.eth.Contract(lottery_token_abi,process.env.NEXT_PUBLIC_lottery_token_address)
    // console.log(contract_lottery_token)
    const contract_lottery_requireall = new web3.eth.Contract(lottery_require_all_abi,process.env.NEXT_PUBLIC_lottery_require_all_address)
    // console.log(contract_lottery_requireall)

    const [error,setError] = useState('')
	const [canbuy,setCanbuy] = useState(0)
	const [canbuystatus,setCanbuystatus] = useState('unknow')
    const [lotterystatus,setLotterystatus] = useState('unknow')
    const [owneraddress,setOwneraddress] = useState('unknow')
    const [totalevent,setTotalevent] = useState('unknow')
    const [totalamount,setTotalamount] = useState('unknow')
    const [tokenaddress,setTokenaddress] = useState('unknow')
    const [exchangeaddress,setExchangeaddress] = useState('unknow')
    const [eventidstart,setEventidstart] = useState('unknow')
    const [eventtdcomplete,setEventtdcomplete] = useState('unknow')
    const [eventidcancel,setEventidcancel] = useState('unknow')
    const [eventdetail,setEventdetail] = useState('unknow')
    const [eventfee,setEventfee] = useState('unknow')
    const [eventpriceperticket,setEventpriceperticket] = useState('unknow')
    const [eventstartEnd,setEventstartEnd] = useState(['','','',''])
    const [eventidname,setEventidname] = useState('unknow')
    const [eventid,setEventid] = useState()
	const handlecanbuychange = (e) => {
		setCanbuy(e.target.value)
	}
    const handleeventidchange = (e) => {
		setEventid(e.target.value)
	}
    const [ticketid,setTicketid] = useState()
    const handleticketidchange = (e) => {
		setTicketid(e.target.value)
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
    const setSetter = () => {
        const contract_event = new web3.eth.Contract(lottery_event_abi,process.env.NEXT_PUBLIC_lottery_event_address)
        const callfunction = contract_event.methods.setSetter('0xC349dE4d5Aa5b10817A11f126f1cbFcD695bfEfF',false).call();
		console.log(callfunction)
        // callfunction.then((a) => { setTotalevent(String(a)) })
    }
    
    const eventIdStart = () => {
        const callfunction = contract_event.methods.eventIdStart(eventid).call();
        callfunction.then((a) => { console.log(a) })
        callfunction.then((a) => { setEventidstart(String(a)) })
    }
    const eventIdComplete = () => {
        const callfunction = contract_event.methods.eventIdComplete(eventid).call();
		callfunction.then((a) => { console.log(a) })
        callfunction.then((a) => { setEventtdcomplete(String(a)) })
    }
    const eventIdCancel = () => {
        const callfunction = contract_event.methods.eventIdCancel(eventid).call();
		callfunction.then((a) => { console.log(a) })
        callfunction.then((a) => { setEventidcancel(String(a)) })
    }
    const event_detail = () => {
        const callfunction = contract_event.methods.event_detail(eventid).call();
		callfunction.then((a) => { console.log(a) })
        callfunction.then((a) => { setEventdetail(String(a)) })
    }
    const event_fee = () => {
        const callfunction = contract_event.methods.event_fee(eventid).call();
		callfunction.then((a) => { console.log(a) })
        callfunction.then((a) => { setEventfee(String(a)) })
    }
    const event_price_per_ticket = () => {
        const callfunction = contract_event.methods.event_price_per_ticket(eventid).call();
		callfunction.then((a) => { console.log(a) })
        callfunction.then((a) => { setEventpriceperticket(String(a)) })
    }
    const event_startEnd = () => {
        const callfunction = contract_event.methods.event_startEnd(eventid).call();
		callfunction.then((a) => { console.log(a[0],a[1],a['timeEnd'],a['timeStart']) })
        callfunction.then((a) => { setEventstartEnd([a[0],a[1],a['timeEnd'],a['timeStart']]) })
    }
    const eventId_name = () => {
        const callfunction = contract_event.methods.eventId_name(eventid).call();
		callfunction.then((a) => { console.log(a) })
        callfunction.then((a) => { setEventidname(String(a)) })
    }

    // contract_lottery_recieve
    const totalAmount = () => {
        const callfunction = contract_lottery_recieve.methods.totalAmount().call();
		console.log(callfunction)
        callfunction.then((a) => { setTotalamount(String(a)) })
    }
    const getBonus = () => {
        const callfunction = contract_lottery_recieve.methods.getBonus(eventid).call();
		console.log(callfunction)
    }
    const getEventIdtokenIdLength = () => {
        const callfunction = contract_lottery_recieve.methods.getEventIdtokenIdLength(eventid).call();
		console.log(callfunction)
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
        const callfunction = contract_lottery_transection.methods.getLatestPrice(0,2,0).call();//活動代碼，票數，第幾種代幣
		console.log(callfunction)
    }

    // contract_lottery_winner
    const getTokenId_win = () => {
        const callfunction = contract_lottery_winner.methods.getTokenId_win(ticketid).call();
		console.log(callfunction)
    }
    const getEventId_wintokenId = () => {
        const callfunction = contract_lottery_winner.methods.getEventId_wintokenId(eventid).call();
		console.log(callfunction)
    }
    const getEventId_wintokenIdLength = () => {
        const callfunction = contract_lottery_winner.methods.getEventId_wintokenIdLength(eventid).call();
		console.log(callfunction)
    }
    const getEnentId_winprediction = () => {
        const callfunction = contract_lottery_winner.methods.getEnentId_winprediction(eventid).call();
		console.log(callfunction)
    }
    const getEnentId_winner = () => {
        const callfunction = contract_lottery_winner.methods.getEnentId_winner(eventid).call();
		console.log(callfunction)
    }
    const getTokenId_takenmoney = () => {
        const callfunction = contract_lottery_winner.methods.getTokenId_takenmoney(ticketid).call();
		console.log(callfunction)
    }
    // const tokenId_takenmoney = () => {
    //     const callfunction = contract_lottery_winner.methods.tokenId_takenmoney().call();
	// 	console.log(callfunction)
    // }
    // const enentId_winner = () => {
    //     const callfunction = contract_lottery_winner.methods.enentId_winner().call();
	// 	console.log(callfunction)
    // }
    // const tokenId_win = () => {
    //     const callfunction = contract_lottery_winner.methods.tokenId_win().call();
	// 	console.log(callfunction)
    // }
    // const eventId_wintotal = () => {
    //     const callfunction = contract_lottery_winner.methods.eventId_wintotal().call();
	// 	console.log(callfunction)
    // }
    const eventId_wintokenId = () => {
        const callfunction = contract_lottery_winner.methods.eventId_wintokenId(eventid).call();
		console.log(callfunction)
    }
    const enentId_winprediction = () => {
        const callfunction = contract_lottery_winner.methods.enentId_winprediction(eventid).call();
		console.log(callfunction)
    }
    // const organizer_bool = () => {
    //     const callfunction = contract_lottery_winner.methods.organizer_bool().call();
	// 	console.log(callfunction)
    // }

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

    // let a = incrementInstance.methods.increment(newValue);

    return(
        <div className={styles.main}>
            <Head>
                <title>VendingMachine App</title>
                <meta name="description" content="A blockchain vending app" />
            </Head>
            
                <div className='container'>
                    <div className='navbar-brand'>
                        <h1>Vending Machine</h1>
                    </div>
                    <div>
                        <button onClick={connectWalletHandler} className='button is-primary'>
                            Connect Wallet
                        </button>
                    </div>
					<div>
                        <button onClick={ERC20} className='button is-primary'>
							ERC20
                        </button>
                    </div>
                    <div>
                        <button onClick={checkprovider} className='button is-primary'>
                            check provider
                        </button>
                    </div>
                    <div>
                        <input onChange={handlecanbuychange} value={canbuy} />
                        <button onClick={canBuy} className='button is-primary'>
                            canBuy
                        </button>
						<span>{canbuystatus}</span>
                    </div>
                    {/* ======================================================= */}
                    <div><h1>contract_event</h1></div>
                    <div>
                        <button onClick={_isLotteryActive} className='button'>
                            _isLotteryActive
                        </button>
                        <span>{lotterystatus}</span>
                    </div>
                    <div>
                        <button onClick={owner} className='button'>
                            owner
                        </button>
                        <span>{owneraddress}</span>
                    </div>
                    <div>
                        <button onClick={totalEvent} className='button'>
                            totalEvent
                        </button>
                        <span>{totalevent}</span>
                    </div>
                    <div>
                        <input placeholder='eventid' value={eventid} onChange={handleeventidchange} />
                        <span>eventid</span>
                    </div>
                    <div>
                        <button onClick={eventIdStart} className='button is-primary'>
                            eventIdStart
                        </button>
                        <span>{eventidstart}</span>
                    </div>
                    <div>
                        <button onClick={eventIdComplete} className='button is-primary'>
                            eventIdComplete
                        </button>
                        <span>{eventtdcomplete}</span>
                    </div>
                    <div>
                        <button onClick={eventIdCancel} className='button is-primary'>
                            eventIdCancel
                        </button>
                        <span>{eventidcancel}</span>
                    </div>
                    <div>
                        <button onClick={event_detail} className='button is-primary'>
                            event_detail
                        </button>
                        <span>{eventdetail}</span>
                    </div>
                    <div>
                        <button onClick={event_fee} className='button is-primary'>
                            event_fee
                        </button>
                        <span>{eventfee}</span>
                    </div>
                    <div>
                        <button onClick={event_price_per_ticket} className='button is-primary'>
                            event_price_per_ticket
                        </button>
                        <span>{eventpriceperticket}</span>
                    </div>
                    <div>
                        <button onClick={event_startEnd} className='button is-primary'>
                            event_startEnd
                        </button>
                        <span>{eventstartEnd[0]},</span>
                        <span>{eventstartEnd[1]},</span>
                        <span>{eventstartEnd[2]},</span>
                        <span>{eventstartEnd[3]}</span>
                    </div>
                    <div>
                        <button onClick={eventId_name} className='button is-primary'>
                            eventId_name
                        </button>
                        <span>{eventidname}</span>
                    </div>
                    {/* ======================================================= */}
                    <div><h1>contract_lottery_recieve</h1></div>
                    <div>
                        <button onClick={totalAmount} className='button'>
                            totalAmount
                        </button>
                        <span>{totalamount}</span>
                    </div>
                    <div>
                        <button onClick={getBonus} className='button is-primary'>
                            getBonus
                        </button>
                        <span>{totalamount}</span>
                    </div>
                    <div>
                        <button onClick={getEventIdtokenIdLength} className='button is-primary'>
                            getEventIdtokenIdLength
                        </button>
                        <span>{totalamount}</span>
                    </div>
                    {/* ======================================================= */}
                    <div><h1>contract_lottery_winner</h1></div>
                    <div>
                        <button onClick={enentId_winprediction} className='button is-primary'>
                            enentId_winprediction
                        </button>
                        <span>{totalamount}</span>
                    </div>
                    <div>
                        <button onClick={eventId_wintokenId} className='button is-primary'>
                            eventId_wintokenId
                        </button>
                        <span>{totalamount}</span>
                    </div>
                    <div>
                        <input placeholder='ticketid' value={ticketid} onChange={handleticketidchange} />
                        <span>ticketid</span>
                    </div>
                    <div>
                        <button onClick={getTokenId_takenmoney} className='button is-primary'>
                            getTokenId_takenmoney
                        </button>
                        <span>{totalamount}</span>
                    </div>
                    <div>
                        <button onClick={getEnentId_winner} className='button is-primary'>
                            getEnentId_winner
                        </button>
                        <span>{totalamount}</span>
                    </div>
                    <div>
                        <button onClick={getEnentId_winprediction} className='button is-primary'>
                            getEnentId_winprediction
                        </button>
                        <span>{totalamount}</span>
                    </div>
                    <div>
                        <button onClick={getEventId_wintokenIdLength} className='button is-primary'>
                            getEventId_wintokenIdLength
                        </button>
                        <span>{totalamount}</span>
                    </div>
                    <div>
                        <button onClick={getEventId_wintokenId} className='button is-primary'>
                            getEventId_wintokenId
                        </button>
                        <span>{totalamount}</span>
                    </div>
                    <div>
                        <button onClick={getTokenId_win} className='button is-primary'>
                            getTokenId_win
                        </button>
                        <span>{totalamount}</span>
                    </div>
                    {/* ======================================================= */}
                    <div><h1>contract_lottery_transection</h1></div>
                    <div>
                        <button onClick={token_address} className='button'>
                            token_address
                        </button>
                        <span>{tokenaddress}</span>
                    </div>
                    <div>
                        <button onClick={exchange_address} className='button'>
                            exchange_address
                        </button>
                        <span>{exchangeaddress}</span>
                    </div>
                    <div>
                        <button onClick={AllowedCrypto} className='button is-primary'>
                            AllowedCrypto
                        </button>
                    </div>
                    <div>
                        <button onClick={getLatestPrice} className='button is-primary'>
                            getLatestPrice
                        </button>
                    </div>
                    
                    
                    
                </div>
            
            <section>
                <div className='container has-text-danger'>
                    <p>{error}</p>
                </div>
            </section>
        </div>
    )
}

export default VendingMachine;