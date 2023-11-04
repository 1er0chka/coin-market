'use client'
import React, {FunctionComponent} from 'react';
import {Coin} from "@/app/service/Types";
import styles from "./TableRow.module.scss"
import {formatNumber} from "@/app/service/Formats";
import {useRouter} from "next/router";

const TableRow: FunctionComponent<{ rowContent: Coin, key: number }> = ({rowContent, key}) => {
    const router = useRouter();
    const handleClick = () => {
        router.push("/coin/[currency_coin]", "/coin/" + rowContent.id.toLowerCase());
    }

    return (
        <tr className={styles.tableRow}>
            <td onClick={handleClick}>{rowContent.rank}</td>
            <td onClick={handleClick}>
                <div className={styles.nameRow}>
                    <img className={styles.nameRow_logo}
                         src={'https://assets.coincap.io/assets/icons/' + rowContent.symbol.toLowerCase() + '@2x.png'}/>
                    <div>{rowContent.name}</div>
                    <div className={styles.nameRow_symbol}>{rowContent.symbol}</div>
                </div>
            </td>
            <td onClick={handleClick}>{formatNumber(parseFloat(rowContent.priceUsd))}</td>
            <td onClick={handleClick}
                className={parseFloat(rowContent.changePercent24Hr) < 0 ? styles.negativeSum : styles.positiveSum}>{parseFloat(rowContent.changePercent24Hr).toFixed(2)}%
            </td>
            <td onClick={handleClick}>{formatNumber(parseFloat(rowContent.marketCapUsd))}</td>
            <td>
                <div className={styles.addButton}>
                    <img src={"resources/images/add-cart.png"}/>
                </div>
            </td>
        </tr>
    );
};

export default TableRow;