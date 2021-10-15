export interface TradingSessionRecord {
    id:                string;
    profileId:         string;
    createdDate:       Date;
    buyTrades:         Trade[];
    sellTrades:        Trade[];
    source:            null;
    symbol:            string;
    pastGain:          string;
    underStopLoss:     string;
    priceMax:          number;
    priceMin:          number;
    stoploss:          number;
    costAverage:       number;
    target1:           number;
    target2:           number;
    target3:           number;
    stoplossAmount:    number;
    totalAmountBought: number;
    totalAmountSold:   number;
    avePriceBought:    number;
    avePriceSold:      number;
    commissionEnter:   number;
    commissionSell:    number;
    timeStart:         Date;
    timeEnd:           Date;
}

export interface Trade {
    id:              null;
    tradeId:         number;
    orderSide:       string;
    symbol:          string;
    orderId:         number;
    price:           number;
    qty:             number;
    commission:      number;
    commissionAsset: string;
    date:            string;
}
