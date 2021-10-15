
export interface BotInstance {
    _id:              string;
    name:             string;
    profileId:        string;
    state:            State;
    loop:             boolean;
    hasOpenOrder:     boolean;
    defaultStoploss:  number;
    defaultAmount:    number;
    exchangeAccount:  ExchangeAccount;
    lastModifiedDate: string;
    // _class:           string;
    // method:           null;
    // get status():string{
    //     return "xxxx";
    //     // if(state===undefined)return "stand by"
    //     // else return "trading"
    // }
}

export interface ExchangeAccount {
    exchange:  string;
    publicKey: string;
    secret:    string;
}

export interface State {
    currentAmount:      number;
    symbol:             Symbol;
    position:           Position;
    openSellOrder:      OpenOrder;
    openBuyOrder:       OpenOrder;
    costAverage:        boolean;
    costAverageArm:     boolean;
    lastTargetTrailing: boolean;
    canUpdate:          boolean;
}

export interface OpenOrder {
    symbol:              string;
    orderId:             number;
    clientOrderId:       string;
    transactTime:        number;
    price:               number;
    origQty:             number;
    executedQty:         number;
    cummulativeQuoteQty: number;
    status:              string;
    timeInForce:         string;
    type:                string;
    side:                string;
    // fills:               any[];
}

export interface Position {
    buyTrades:          Trade[];
    sellTrades:         Trade[];
    lastTicker:         Ticker;
    // prevTicker:         Ticker;
    pastGain:           boolean;
    underStopLoss:      boolean;
    priceMax:           number;
    priceMin:           number;
    stoploss:           number;
    costAverage:        number;
    targets:            number[];
    // target1:            number;
    // target2:            number;
    // target3:            number;
    stoplossAmount:     number;
    lastTargetTrailing: boolean;
}

export interface Trade {
    _id:             number;
    symbol:          string;
    orderId:         number;
    price:           number;
    qty:             number;
    commission:      number;
    commissionAsset: string;
    time:            number;
    isBuyer:         boolean;
    isMaker:         boolean;
    isBestMatch:     boolean;
}

export interface Ticker {
    bid:  number;
    ask:  number;
    last: number;
}

export interface Symbol {
    symbol:             string;
    status:             string;
    baseAsset:          string;
    baseAssetPrecision: number;
    quoteAsset:         string;
    quotePrecision:     number;
}

