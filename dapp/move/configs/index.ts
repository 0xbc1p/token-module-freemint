import {AptosClient} from "aptos";

export const MODULES_CONFIG = []

export const RPC = "https://fullnode.devnet.aptoslabs.com/v1"

export const aptosClient = new AptosClient(RPC)

export const modules_types = {
    token: "0x1::coin::CoinStore<0xfb407449ecdee47b9a8ff7f7d3b6357683bb844ac9b8f1df8d8e27256bc66684::coins::APTToken>",
    apt: "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>"
}
