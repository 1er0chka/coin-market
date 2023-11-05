import {useRouter} from "next/router";
import styles from './CurrencyCoinPage.module.scss'
import '../../app/styles/globals.css'
import CoinChart from "@/app/components/coin-chart/CoinChart";
import CoinData from "@/app/components/coin-data/CoinData";
import React, {useContext, useEffect, useState} from "react";
import {Coin} from "@/app/service/Types";
import Service from "@/app/service/Service";
import {GetStaticPaths, GetStaticProps} from "next";
import {formatNumber} from "@/app/service/Formats";
import Link from "next/link";
import Loading from "@/app/components/loading/Loading";
import CoinElem from "@/app/components/coin-elem/CoinElem";
import {ModalCoinContext, ModalCoinProvider} from "@/app/provider/ModalCoinContext";
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
