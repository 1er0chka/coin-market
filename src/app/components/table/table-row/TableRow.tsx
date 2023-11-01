'use client'
import React, {FunctionComponent} from 'react';
import {Coin} from "@/app/service/Types";

const TableRow: FunctionComponent<{ rowContent: Coin, key: number }> = ({rowContent, key}) => {
    return (
        <tr>
            <td>{rowContent.rank}</td>
            <td>{rowContent.name}</td>
            <td>{rowContent.priceUsd}</td>
            <td>{rowContent.changePercent24Hr}</td>
            <td>{rowContent.marketCapUsd}</td>
            <td><button>+</button></td>
        </tr>
    );
};

export default TableRow;