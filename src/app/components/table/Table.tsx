'use client'
import styles from "./Table.module.sass"
import Service from "@/app/service/Service";
import React, {FunctionComponent, useEffect, useState} from "react";
import {Coin} from "@/app/service/Types";
import TableRow from "@/app/components/table/table-row/TableRow";

const Table: FunctionComponent<{}> = () => {
    const [coinsNumber, setCoinsNumber] = useState<number>(0)
    const [offset, setOffset] = useState<number>(0)
    const [objects, setObjects] = useState<Coin[]>([])

    const getCoinsNumber = async () => {
        Service.getCoinsNumber().then((data) => {
            setCoinsNumber(data)
            console.log(coinsNumber)
        })
    }
    // TODO вызывается 100500 раз
    getCoinsNumber()

    const increaseOffset = () => {
        setOffset(offset + 40);
        // todo не успевает примениться setOffset
        getAssets()
    };

    const decreaseOffset = () => {
        setOffset(offset - 40);
        // todo не успевает примениться setOffset
        getAssets()
    }


    const getAssets = async () => {
        console.log(offset)
        Service.getAssets(offset).then((data) => {
            setObjects(data)
            console.log(objects)
        })
    }

    useEffect(() => {
        getAssets()
    }, [])

    return <div className={styles.body}>
        <table>
            <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>24h%</th>
                <th>Market Cap</th>
            </tr>
            </thead>
            <tbody>
            {
                objects.map((rowContent: Coin, rowId: number) => <TableRow rowContent={rowContent} key={rowId}/>)
            }
            </tbody>
        </table>
        <div>
            <button onClick={decreaseOffset} disabled={offset - 40 < 0}>prev</button>
            <div>{offset}-{offset + 40 > coinsNumber ? coinsNumber : offset + 40}</div>
            <button onClick={increaseOffset} disabled={offset + 40 > coinsNumber}>next</button>
        </div>
    </div>
}

export default Table;