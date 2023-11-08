'use client'

import React, {
    createContext,
    useState,
    ReactNode,
    FunctionComponent,
    PropsWithChildren
} from 'react';

type ModalContextType = {
    isVisible: boolean
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
};

const defaultState:ModalContextType  = {
    isVisible: false,
    setVisible: () => null
};

export const ModalPortfolioContext = createContext<ModalContextType>(defaultState);

type ModalProviderProps = {
    children: ReactNode;
};

export const ModalPortfolioProvider: FunctionComponent<PropsWithChildren<ModalProviderProps>> = ({children}) => {
    const [isVisible, setVisible] = useState<boolean>(false);

    return (
        <ModalPortfolioContext.Provider value={{isVisible: isVisible, setVisible: setVisible}}>
            {children}
        </ModalPortfolioContext.Provider>
    );
};
