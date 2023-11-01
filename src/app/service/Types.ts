export interface Coin {
    id: string
    name: string
    rank: string
    symbol: string
    supply: string
    msxSupply: string
    priceUsd: string
    changePercent24Hr: string
    marketCapUsd: string
}

export interface IResponse {
    data: Coin[]
}