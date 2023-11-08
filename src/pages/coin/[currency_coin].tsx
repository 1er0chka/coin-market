import '../../app/styles/globals.css'
import React from "react";
import {GetStaticPaths, GetStaticProps} from "next";
import {ModalCoinProvider} from "@/app/provider/ModalCoinContext";
import ModalAddCoin from "@/app/components/modal-add-coin/ModalAddCoin";
import ModalPortfolio from "@/app/components/modal-portfolio/ModalPartfolio";
import {ModalPortfolioProvider} from "@/app/provider/ModalPortfolioContext";
import CoinPage from "@/app/components/coin-page/CoinPage";
import Header from "@/app/components/header/Header";

export type CurrencyCoinProps = {
    slug: string;
}

const CurrencyCoinPage = ({slug}: CurrencyCoinProps) => {

    return (<ModalCoinProvider>
            <ModalPortfolioProvider>
                <Header/>
                <CoinPage slug={{slug}}/>
                <ModalAddCoin/>
                <ModalPortfolio/>
            </ModalPortfolioProvider>
        </ModalCoinProvider>
    );
}

export default CurrencyCoinPage

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true
    };
}

export const getStaticProps: GetStaticProps<CurrencyCoinProps> = async (context) => {
    const slug = context.params!.currency_coin as string;
    return {
        props: {
            slug
        }
    }
}
