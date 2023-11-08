import React, {FunctionComponent} from 'react';
import styles from './CoinElem.module.scss';
import {Coin} from "@/app/service/Types";
import Image from "next/image";

const CoinElem:FunctionComponent<{coin: Coin | undefined}> = ({coin}) => {
    return (
        <div className={styles.title}>
            <div className={styles.coinRank}>{coin?.rank}.</div>
            <div className={styles.coinImage}>
                <Image alt={''} width={1} height={1} layout={"responsive"}
                       src={"https://assets.coincap.io/assets/icons/" + coin?.symbol.toLowerCase() + "@2x.png"}></Image>
            </div>

            <div className={styles.coinName}>{coin?.name}</div>
            <div className={styles.coinSymbol}>{coin?.symbol}</div>
        </div>
    );
};

export default CoinElem;