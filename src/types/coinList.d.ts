interface ICoinList {
    market?: string;
    korean_name?: string;
    english_name?: string;
    market_event?: {
        warning?: boolean;
        caution?: {
            PRICE_FLUCTUATIONS?: string;
            TRADING_VOLUME_SOARING?: string;
            DEPOSIT_AMOUNT_SOARING?: string;
            GLOBAL_PRICE_DIFFERENCES?: string;
            CONCENTRATION_OF_SMALL_ACCOUNTS: string;
        }
    }
}

