import {useRouter} from "next/router";
import dynamic from "next/dynamic";
import styles from './CurrencyCoinPage.module.scss'
import '../../app/globals.css'
import Button from "@/app/components/button/Button";
import {useEffect, useState} from "react";
import CoinChart from "@/pages/coin/coin-chart/CoinChart";
import ProgressBar from "@/app/components/progressBar/ProgressBar";

const CurrencyCoinPage = () => {
    const router = useRouter();
    const {currency_coin} = router.query;

    const coin = typeof router.query.currency_coin === 'string'
        ? router.query.currency_coin
        : undefined;


    return (
        <div className={styles.content}>
            <div className={styles.title}>
                <div className={styles.coinRank}>1.</div>
                <img src={"https://assets.coincap.io/assets/icons/btc@2x.png"} className={styles.coinImage}></img>
                <div className={styles.coinName}>{coin}</div>
                <div className={styles.coinSymbol}>BTC</div>
            </div>
            <div className={styles.info}>
                <div className={styles.infoLeft}>
                    <CoinChart/>
                </div>
                <div className={styles.infoRight}>
                    <div className={styles.coinPrice}>1,808.23 $</div>
                    <ProgressBar percentage={78.21}/>
                </div>
            </div>

        </div>
    );
}

export default CurrencyCoinPage