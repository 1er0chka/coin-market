import {Coin, IAssetsResponse, ICoinResponse} from "@/app/service/Types";

const Service = {
    async getAssets(offset: number): Promise<Coin[]> {
        try {
            const res: Response = await fetch('https://api.coincap.io/v2/assets?limit=40&offset=' + offset)
            const info: IAssetsResponse = await res.json()
            return info.data.filter((coin) => {
                return (coin.marketCapUsd && parseFloat(coin.priceUsd) >= 0.01)
            })
        } catch (e) {
            return []
        }
    },

    async getAssetsById(id: string): Promise<Coin | undefined> {
        try {
            const res: Response = await fetch('https://api.coincap.io/v2/assets/' + id)
            if (res.status == 200) {
                console.log('200')
                const info: ICoinResponse = await res.json()
                return info.data
            } else {
                console.log('404')
                return undefined
            }
        } catch (e) {
            console.log('err0r')
            return undefined
        }
    },

    async getCoinsNumber(): Promise<number> {
        let lastRank: number = 0
        try {
            while (true) {
                let res: Response = await fetch('https://api.coincap.io/v2/assets?limit=2000&offset=' + lastRank)
                let info: IAssetsResponse = await res.json()
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
            const info: IAssetsResponse = await res.json()
            return info.data.filter((coin) => {
                return (coin.marketCapUsd && parseFloat(coin.priceUsd) >= 0.01)
            })
        } catch (e) {
            return []
        }
    }
}

export default Service