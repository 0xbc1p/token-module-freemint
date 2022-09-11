import {useWallet} from "@manahippo/aptos-wallet-adapter";
import useWalletModal from "../move/hooks/useWalletModal";
import {Button} from "antd";
import {splitAddress} from "../move/utils";

export default function Navbar() {
    const {account, disconnect} = useWallet()
    const {open_modal} = useWalletModal()
    return <div className="navbar">
        <div className="address">
            {account && account.address ?
                <span>
                Hello: {splitAddress(account.address.toString())}
            </span> :
                <span>
                Hello
            </span>}
        </div>
        <div className="wallet">
            {account ? <Button type="primary" onClick={disconnect}>Disconnect</Button> : <Button type="primary" onClick={open_modal}>Connect</Button>}
        </div>
    </div>
}
