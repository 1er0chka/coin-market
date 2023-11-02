import {Coin, IResponse} from "@/app/service/Types";

const Service = {
    async getAssets(offset: number): Promise<Coin[]> {
        try {
            const res: Response = await fetch('https://api.coincap.io/v2/assets?limit=40&offset=' + offset)
            const info: IResponse = await res.json()
            return info.data.filter((coin) => {
                return (coin.marketCapUsd && parseFloat(coin.priceUsd) >= 0.01)
            })
        } catch (e) {
            return []
        }
    },

    async getCoinsNumber(): Promise<number> {
        let lastRank: number = 0
        try {
            while (true) {
                let res: Response = await fetch('https://api.coincap.io/v2/assets?limit=2000&offset=' + lastRank)
                let info: IResponse = await res.json()
                let data: Coin[] = info.data
                if (data.length == 0) {
                    return lastRank
                }
                lastRank = +data[data.length - 1].rank
            }
        } catch (e) {
            return 0
        }
    },

    async getSearchResult(searchRequest: string): Promise<Coin[]> {
        try {
            let res: Response = await fetch('https://api.coincap.io/v2/assets?limit=2000&search=' + searchRequest)
            const info: IResponse = await res.json()
            return info.data.filter((coin) => {
                return (coin.marketCapUsd && parseFloat(coin.priceUsd) >= 0.01)
            })
        } catch (e) {
            return []
        }
    }
}

export default Service