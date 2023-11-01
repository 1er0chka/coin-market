'use client'
import React, {FunctionComponent} from 'react';
import {Coin} from "@/app/service/Types";
import styles from "./TableRow.module.scss"
import AddButton from "@/app/components/table/table-row/add-button/AddButton";

const TableRow: FunctionComponent<{ rowContent: Coin, key: number }> = ({rowContent, key}) => {
    const formatNumber = (number: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
        }).format(number);
    };

    return (
        <tr className={styles.tableRow}>
            <td>{rowContent.rank}</td>
            <td>{rowContent.name}</td>
            <td>{formatNumber(parseFloat(rowContent.priceUsd))}</td>
            <td className={parseFloat(rowContent.changePercent24Hr) < 0 ? styles.negativeSum : styles.positiveSum}>{parseFloat(rowContent.changePercent24Hr).toFixed(2)}%</td>
            <td>{formatNumber(parseFloat(rowContent.marketCapUsd))}</td>
            <td>
                <div className={styles.addButton}>
                    <img src={"resources/images/add-cart.png"}/>
                </div>
            </td>
        </tr>
    );
};

export default TableRow;