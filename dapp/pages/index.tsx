import type {NextPage} from 'next'
import {useWallet} from '@manahippo/aptos-wallet-adapter';
import Navbar from "../componenst/Navbar";
import {Button, Divider} from "antd";
import {useAccountResource} from "../move/hooks/useAccountResource";
import {useEffect, useState} from "react";
import {modules_types} from "../move/configs";
import {sleep} from "../move/utils";
import useWalletModal from "../move/hooks/useWalletModal";


const Home: NextPage = () => {
    const {account, signAndSubmitTransaction} = useWallet()
    const {data, getData} = useAccountResource()
    const [tokenData, setTokenData] = useState<any>(undefined)
    const [apt, setAPT] = useState<any>(undefined)
    const [loading, setLoading] = useState(false)
    const {open_modal} = useWalletModal()
    const mint_token = {
        arguments: ["10000000000"],
        function:
            '0xfb407449ecdee47b9a8ff7f7d3b6357683bb844ac9b8f1df8d8e27256bc66684::coins::mint_token',
        type: 'entry_function_payload',
        type_arguments: [],
    }
    const register_token = {
        arguments: [],
        function:
            '0xfb407449ecdee47b9a8ff7f7d3b6357683bb844ac9b8f1df8d8e27256bc66684::coins::register_coin',
        type: 'entry_function_payload',
        type_arguments: [],
    }

    const send = async (tx_info: any) => {
        try {
            setLoading(true)
            const signTransaction = await signAndSubmitTransaction(
                tx_info,
            )
            console.log(signTransaction.hash)
        } catch (error) {
            // see "Errors"
            console.log(error)
        } finally {
            setLoading(false)
            await sleep(3000)
            getData()
        }
    }

    useEffect(() => {
        if (data) {
            setTokenData(data.find((f: any) => f.type === modules_types.token))
            setAPT(data.find((f: any) => f.type === modules_types.apt))
        }
    }, [data])

    return (
        <>
            <Navbar/>
            <div className="main">
                {
                    account ? <>
                            <div className="information">
                                <div className="token">
                                </div>
                                {tokenData && <div className="token">
                                    <div className="token-name">
                                        WAPT
                                    </div>
                                    <div className="token-balance">
                                        {tokenData.data.coin.value / 1e6}
                                    </div>
                                </div>}
                                {apt && <div className="token">
                                    <div className="token-name">
                                        APT
                                    </div>
                                    <div className="token-balance">
                                        {apt?.data?.coin?.value}
                                    </div>
                                </div>}
                            </div>
                            <Divider/>
                            {tokenData ?
                                <Button type="primary" loading={loading} onClick={() => send(mint_token)}>Claim</Button> :
                                <Button loading={loading} onClick={() => send(register_token)} type="primary">Register
                                    Token</Button>}
                        </> :
                        <Button type="primary" onClick={open_modal}>Connect</Button>
                }
            </div>
        </>
    )
}

export default Home
