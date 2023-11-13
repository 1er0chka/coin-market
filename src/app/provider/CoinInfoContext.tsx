"use client";

import React, {
  createContext,
  useState,
  ReactNode,
  FunctionComponent,
  PropsWithChildren,
} from "react";
import { Coin, defaultCoin } from "@/app/service/Types";

type CoinInfoContextType = {
  coin: Coin;
  setCoin: React.Dispatch<React.SetStateAction<Coin>>;
  interval: string;
  setInterval: React.Dispatch<React.SetStateAction<string>>;
  time: string[];
  setTime: React.Dispatch<React.SetStateAction<string[]>>;
  price: number[];
  setPrice: React.Dispatch<React.SetStateAction<number[]>>;
};

const defaultState: CoinInfoContextType = {
  coin: defaultCoin,
  setCoin: () => defaultCoin,
  interval: "m1",
  setInterval: () => "m1",
  time: [],
  setTime: () => [],
  price: [],
  setPrice: () => [],
};

export const CoinInfoContext = createContext<CoinInfoContextType>(defaultState);

type CoinChartProviderProps = {
  children: ReactNode;
};

export const CoinInfoProvider: FunctionComponent<
  PropsWithChildren<CoinChartProviderProps>
> = ({ children }) => {
  const [coin, setCoin] = useState<Coin>(defaultCoin);
  const [interval, setInterval] = useState<string>("m1");
  const [time, setTime] = useState<string[]>([]);
  const [price, setPrice] = useState<number[]>([]);

  return (
    <CoinInfoContext.Provider
      value={{
        coin,
        setCoin,
        interval,
        setInterval,
        time,
        setTime,
        price,
        setPrice,
      }}
    >
      {children}
    </CoinInfoContext.Provider>
  );
};
