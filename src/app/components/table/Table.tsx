'use client'
import styles from "./Table.module.scss"
import Service from "@/app/service/Service";
import React, {FunctionComponent, useEffect, useState} from "react";
import {Coin} from "@/app/service/Types";
import TableRow from "@/app/components/table/table-row/TableRow";
import Loading from "@/app/components/loading/Loading";
import Pagination from "@/app/components/table/pagination/Pagination";
import Search from "@/app/components/table/search/Search";

const Table: FunctionComponent<{}> = () => {
    const [coinsNumber, setCoinsNumber] = useState<number>(0)
    const [offset, setOffset] = useState<number>(0)
    const [objects, setObjects] = useState<Coin[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [searchInfo, setSearchInfo] = useState<string>("")

    const getCoinsNumber = async () => {
        Service.getCoinsNumber().then((data) => {
            setCoinsNumber(data)
            console.log(coinsNumber)
        })
    }

    const increaseOffset = () => {
        setOffset(offset + 40);
        setLoading(true)
    };

    const decreaseOffset = () => {
        setOffset(offset - 40);
        setLoading(true)
    }

    const getAssets = async () => {
        Service.getAssets(offset).then((data) => {
            setObjects(data)
        })
    }

    const search = async () => {
        Service.getSearchResult(searchInfo).then((data) => {
            setObjects(data)
        })
    }

    useEffect(() => {
        getCoinsNumber()
    }, [])

    useEffect(() => {
        getAssets()
    }, [offset])

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [objects])

    return <div className={styles.body}>
        <div className={styles.aboveTableArea}>
            <div className={styles.title}>Today's Cryptocurrency Prices</div>
            <Search onClick={search} searchInfo={searchInfo} setSearchInfo={setSearchInfo}/>
        </div>
        {
            loading ?
                <Loading/>
                :
                <div>
                    <table className={styles.cpTable}>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>24h%</th>
                            <th>Market Cap</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            objects.map((rowContent: Coin, rowId: number) => <TableRow rowContent={rowContent}
                                                                                       key={rowId}/>)
                        }
                        </tbody>
                    </table>
                </div>
        }
        <Pagination onClickPrev={decreaseOffset} onClickNext={increaseOffset} offset={offset}
                    coinsNumber={coinsNumber}/>
    </div>
}

export default Table;