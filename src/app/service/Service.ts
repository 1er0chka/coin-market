import {Coin, IResponse} from "@/app/service/Types";

const Service = {
    async getAssets(offset: number): Promise<Coin[]> {
        try {
            const res: Response = await fetch('https://api.coincap.io/v2/assets?limit=40&offset=' + offset)
            const info: IResponse = await res.json()
            return info.data
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
                lastRank = +data.at(-1).rank
            }
        } catch (e) {
            return 0
        }
    }
}

export default Service