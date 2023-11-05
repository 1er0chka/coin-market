import React, {FunctionComponent} from 'react';
import styles from './CoinElem.module.scss';
import {Coin} from "@/app/service/Types";

const CoinElem:FunctionComponent<{coin: Coin | undefined}> = ({coin}) => {
    return (
        <div className={styles.title}>
            <div className={styles.coinRank}>{coin?.rank}.</div>
            <img
                src={"https://assets.coincap.io/assets/icons/" + coin?.symbol.toLowerCase() + "@2x.png"}
                className={styles.coinImage}></img>
            <div className={styles.coinName}>{coin?.name}</div>
            <div className={styles.coinSymbol}>{coin?.symbol}</div>
        </div>
    );
};

export default CoinElem;