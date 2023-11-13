import {
  Coin,
  History,
  IAssetsResponse,
  ICoinResponse,
  IHistoryResponse,
} from "@/app/service/Types";

const Service = {
  async getAssets(offset: number): Promise<Coin[]> {
    try {
      const res: Response = await fetch(
        "https://api.coincap.io/v2/assets?limit=40&offset=" + offset,
      );
      const info: IAssetsResponse = await res.json();
      return info.data.filter((coin) => {
        return coin.marketCapUsd && parseFloat(coin.priceUsd) >= 0.01;
      });
    } catch (e) {
      return [];
    }
  },

  async getAssetsById(id: string): Promise<Coin> {
    try {
      const res: Response = await fetch(
        "https://api.coincap.io/v2/assets/" + id,
      );
      if (res.status == 200) {
        const info: ICoinResponse = await res.json();
        return info.data;
      } else {
        throw new Error("Coin not found");
      }
    } catch (e) {
      throw new Error("Error during the request execution");
    }
  },

  async getHistoryById(id: string, interval: string): Promise<History[]> {
    try {
      const res: Response = await fetch(
        "https://api.coincap.io/v2/assets/" +
          id +
          "/history?interval=" +
          interval,
      );
      const info: IHistoryResponse = await res.json();
      return info.data;
    } catch (e) {
      return [];
    }
  },

  async getCoinsNumber(): Promise<number> {
    let lastRank: number = 0;
    try {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const res: Response = await fetch(
          "https://api.coincap.io/v2/assets?limit=2000&offset=" + lastRank,
        );
        const info: IAssetsResponse = await res.json();
        const data: Coin[] = info.data;
        if (data.length == 0) {
          return lastRank;
        }
        lastRank = +data[data.length - 1].rank;
      }
    } catch (e) {
      return 0;
    }
  },

  async getSearchResult(searchRequest: string): Promise<Coin[]> {
    try {
      const res: Response = await fetch(
        "https://api.coincap.io/v2/assets?limit=2000&search=" + searchRequest,
      );
      const info: IAssetsResponse = await res.json();
      return info.data.filter((coin) => {
        return coin.marketCapUsd && parseFloat(coin.priceUsd) >= 0.01;
      });
    } catch (e) {
      return [];
    }
  },
};

export default Service;
