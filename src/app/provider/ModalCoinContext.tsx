'use client'

import React, {
    createContext,
    useState,
    ReactNode,
    FunctionComponent,
    PropsWithChildren
} from 'react';
import {Coin} from "@/app/service/Types";

type ModalContextType = {
    coin: Coin | null
    setCoin: React.Dispatch<React.SetStateAction<Coin | null>>
};

const defaultState:ModalContextType  = {
    coin: null,
    setCoin: () => null
};

export const ModalCoinContext = createContext<ModalContextType>(defaultState);

type ModalProviderProps = {
    children: ReactNode;
};

export const ModalCoinProvider: FunctionComponent<PropsWithChildren<ModalProviderProps>> = ({children}) => {
    const [coin, setCoin] = useState<Coin | null>(null);

    return (
        <ModalCoinContext.Provider value={{coin: coin, setCoin: setCoin}}>
            {children}
        </ModalCoinContext.Provider>
    );
};
