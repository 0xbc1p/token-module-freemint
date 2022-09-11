module owner::coins {

    use owner::token::{mint, register, initialize};

    struct APTToken {}

    fun init_module(sender: &signer) {
        initialize<APTToken>(
            sender,
            b"Wrapped APT",
            b"WAPT",
            6,
            true,
        );
        // mint<APTToken>(sender, 100000000000000)
    }

    public entry fun mint_token(sender: &signer, amount: u64) {
        mint<APTToken>(sender, amount);
    }

    public entry fun register_coin(sender: &signer) {
        register<APTToken>(sender);
    }
}
