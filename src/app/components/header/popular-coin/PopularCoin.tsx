import React, {FunctionComponent} from 'react';
import styles from "./PopularCoin.module.scss";
import {Coin} from "@/app/service/Types";
import {formatNumber} from "@/app/service/Formats";

const PopularCoin: FunctionComponent<{ coin: Coin }> = ({coin}) => {
    return (
        <div className={styles.body}>
            <div className={styles.title}>
                <img
                    src={"https://assets.coincap.io/assets/icons/" + coin.symbol.toLowerCase() + "@2x.png"}
                    className={styles.coinImage}></img>
                <div className={styles.coinName}>{coin.name}</div>
                <div className={styles.coinSymbol}>{coin.symbol}</div>
            </div>
            <div className={styles.coinPrice}>{formatNumber(parseFloat(coin.priceUsd))}</div>
        </div>
    );
};

export default PopularCoin;