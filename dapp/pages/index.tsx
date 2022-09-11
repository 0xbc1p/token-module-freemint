import type {NextPage} from 'next'
import Head from 'next/head'
import {useWallet} from '@manahippo/aptos-wallet-adapter';
import styles from '../styles/Home.module.css'


const Home: NextPage = () => {
    const {account, connect, disconnect, wallets} = useWallet()

    console.log(wallets)

    const mint_token = {
        arguments: ["1000000000"],
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
            const signTransaction = await (global.window as any).aptos.signAndSubmitTransaction(
                tx_info,
            )
            console.log(signTransaction)
        } catch (error) {
            // see "Errors"
            console.log(error)
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
        </div>
    )
}

export default Home