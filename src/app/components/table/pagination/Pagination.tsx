import React, {FunctionComponent, MouseEventHandler, useEffect, useState} from 'react';
import styles from "./Pagination.module.scss"
import PageButton from "@/app/components/table/pagination/page-button/PageButton";
import Service from "@/app/service/Service";

interface IPaginationParams {
    refreshTable: (a: number) => Promise<void>
}

const Pagination: FunctionComponent<IPaginationParams> = ({refreshTable}) => {
    const [coinsNumber, setCoinsNumber] = useState<number>(0)
    const [offset, setOffset] = useState<number>(0)

    const getCoinsNumber = async () => {
        Service.getCoinsNumber().then((data) => {
            setCoinsNumber(data)
            console.log(coinsNumber)
        })
    }
    const increaseOffset = () => {
        setOffset(offset + 40);
    };

    const decreaseOffset = () => {
        setOffset(offset - 40);
    }

    useEffect(() => {
        getCoinsNumber()
    }, [])

    useEffect(() => {
        refreshTable(offset)
    }, [offset])

    return (
        <div className={styles.pagination}>
            <PageButton onClick={decreaseOffset} disabled={offset - 40 < 0} text={"<"}/>
            <div>{offset} - {offset + 40 > coinsNumber ? coinsNumber : offset + 40}</div>
            <PageButton onClick={increaseOffset} disabled={offset + 40 > coinsNumber} text={">"}></PageButton>
        </div>
    );
};

export default Pagination;