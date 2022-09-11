import {useWallet} from "@manahippo/aptos-wallet-adapter";
import {useEffect, useState} from "react";
import {aptosClient} from "../configs";

export const useAccountModules = () => {
    const {account} = useWallet()
    const [data, setData] = useState<any>(null)
    const getData = async () => {
        if (account && account.address) {
            try {
                const result = await aptosClient.getAccountModules(account.address)
                setData(result)
            } catch (e) {
                console.log('useAccountModules-getData', e)
            }
        }
    }
    useEffect(() => {
        if (account && account.address) getData()
    }, [account])

    return {data, getData}
}
