import {useWallet} from "@manahippo/aptos-wallet-adapter";
import {Button, Col, message, Modal, Row} from "antd";

export default function useWalletModal() {
    const {wallets, connect, account} = useWallet()

    const destroyAll = () => {
        Modal.destroyAll();
    };
    const onConnect = (wallet: string) => {
        return connect(wallet)
            .catch((e) => {
                console.log(e)
                message.error("connect error")

            }).then(() => {
                console.log('close')
                destroyAll()
            })
    }
    const open_modal = () => {
        Modal.info({
            title: "Connect Wallet",
            closable: true,
            className: "wallet-modal",
            content: <Row justify="center">
                {
                    wallets.map((wallet, index) => {
                        return <Col key={index}>
                            <div className="wallet_item">
                                <img src={wallet.adapter.icon} id={wallet.adapter.name}/>
                                {
                                    wallet.readyState == "Installed" ?
                                        <Button
                                            type="text"
                                            block
                                            onClick={() => onConnect(wallet.adapter.name)}
                                        >
                                            Connect
                                        </Button> :
                                        <Button
                                            block
                                            type="text"
                                            onClick={() => window.open(wallet.adapter.url)}
                                        >
                                            Install
                                        </Button>
                                }

                            </div>
                        </Col>
                    })
                }
            </Row>
        })
    }


    return {open_modal, close_modal: () => Modal.destroyAll()}
}
