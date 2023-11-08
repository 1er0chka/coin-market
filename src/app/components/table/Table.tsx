'use client'
import styles from "./Table.module.scss"
import Service from "@/app/service/Service";
import React, {useEffect, useState} from "react";
import {Coin} from "@/app/service/Types";
import TableRow from "@/app/components/table/table-row/TableRow";
import Loading from "@/app/components/loading/Loading";
import Pagination from "@/app/components/table/pagination/Pagination";
import Search from "@/app/components/table/search/Search";
import TableHeader from "@/app/components/table/table-header/TableHeader";

const Table = () => {
    const [objects, setObjects] = useState<Coin[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [searchInfo, setSearchInfo] = useState<string>("")

    const getAssets = async (offset: number = 0) => {
        setLoading(true)
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
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [objects])

    return <div className={styles.body}>
        <div className={styles.aboveTableArea}>
            <div className={styles.title}>Today`s Cryptocurrency Prices</div>
            <Search onClick={search} searchInfo={searchInfo} setSearchInfo={setSearchInfo}/>
        </div>
        {
            loading ?
                <Loading/>
                :
                <div>
                    <table className={styles.cpTable}>
                        <TableHeader objects={objects} setObjects={setObjects}/>
                        <tbody>
                        {
                            objects.map((rowContent: Coin, rowId: number) => <TableRow rowContent={rowContent}
                                                                                       key={rowId}/>)
                        }
                        </tbody>
                    </table>
                </div>
        }
        <Pagination refreshTable={getAssets}/>
    </div>
}

export default Table;