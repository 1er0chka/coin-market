import React, {FunctionComponent, useEffect, useState} from 'react';
import styles from "./Pagination.module.scss"
import Button from "@/app/components/button/Button";
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
            <Button onClick={decreaseOffset} disabled={offset - 40 < 0} text={"<"}/>
            <div>{offset} - {offset + 40 > coinsNumber ? coinsNumber : offset + 40}</div>
            <Button onClick={increaseOffset} disabled={offset + 40 > coinsNumber} text={">"}></Button>
        </div>
    );
};

export default Pagination;