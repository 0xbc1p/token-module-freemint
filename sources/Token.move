module owner::token {
    use std::error;
    use std::signer;
    use std::string;

    use aptos_framework::coin::{Self, BurnCapability, FreezeCapability, MintCapability};

    //
    // Errors
    //

    /// Account has no capabilities (burn/mint).
    const ENO_CAPABILITIES: u64 = 1;

    //
    // Data structures
    //

    /// Capabilities resource storing mint and burn capabilities.
    /// The resource is stored on the account that initialized coin `CoinType`.
    struct Capabilities<phantom CoinType> has key {
        burn_cap: BurnCapability<CoinType>,
        freeze_cap: FreezeCapability<CoinType>,
        mint_cap: MintCapability<CoinType>,
    }

    //
    // Public functions
    //

    /// Withdraw an `amount` of coin `CoinType` from `account` and burn it.
    public entry fun burn<CoinType>(
        account: &signer,
        amount: u64,
    ) acquires Capabilities {
        let account_addr = signer::address_of(account);

        assert!(
            exists<Capabilities<CoinType>>(account_addr),
            error::not_found(ENO_CAPABILITIES),
        );

        let capabilities = borrow_global<Capabilities<CoinType>>(account_addr);

        let to_burn = coin::withdraw<CoinType>(account, amount);
        coin::burn(to_burn, &capabilities.burn_cap);
    }

    /// Initialize new coin `CoinType` in Aptos Blockchain.
    /// Mint and Burn Capabilities will be stored under `account` in `Capabilities` resource.
    public entry fun initialize<CoinType>(
        account: &signer,
        name: vector<u8>,
        symbol: vector<u8>,
        decimals: u8,
        monitor_supply: bool,
    ) {
        let (burn_cap, freeze_cap, mint_cap) = coin::initialize<CoinType>(
            account,
            string::utf8(name),
            string::utf8(symbol),
            decimals,
            monitor_supply,
        );

        move_to(account, Capabilities<CoinType> {
            burn_cap,
            freeze_cap,
            mint_cap,
        });
    }

    public entry fun set_owner<CoinType>(sender: &signer, _account: address) acquires Capabilities {
        let account_addr = signer::address_of(sender);
        assert!(
            exists<Capabilities<CoinType>>(account_addr),
            error::not_found(ENO_CAPABILITIES),
        );
        let capabilities = borrow_global<Capabilities<CoinType>>(@owner);
        move_to(sender, Capabilities<CoinType> {
            burn_cap: capabilities.burn_cap,
            freeze_cap: capabilities.freeze_cap,
            mint_cap: capabilities.mint_cap,
        });
    }

    /// Create new coins `CoinType` and deposit them into dst_addr's account.
    public entry fun mint<CoinType>(
        account: &signer,
        amount: u64,
    ) acquires Capabilities {
        let account_addr = signer::address_of(account);
        let capabilities = borrow_global<Capabilities<CoinType>>(@owner);
        let coins_minted = coin::mint(amount, &capabilities.mint_cap);
        coin::deposit(account_addr, coins_minted);
    }

    /// Creating a resource that stores balance of `CoinType` on user's account, withdraw and deposit event handlers.
    /// Required if user wants to start accepting deposits of `CoinType` in his account.
    public entry fun register<CoinType>(account: &signer) {
        coin::register<CoinType>(account);
    }
}
