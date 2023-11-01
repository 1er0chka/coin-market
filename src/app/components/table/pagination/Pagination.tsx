import React, {FunctionComponent, MouseEventHandler} from 'react';
import styles from "./Pagination.module.scss"
import PageButton from "@/app/components/table/pagination/page-button/PageButton";

interface IPaginationParams {
    onClickPrev: MouseEventHandler<HTMLButtonElement>
    onClickNext: MouseEventHandler<HTMLButtonElement>
    offset: number
    coinsNumber: number
}

const Pagination: FunctionComponent<IPaginationParams> = ({onClickPrev, offset, coinsNumber, onClickNext}) => {
    return (
        <div className={styles.pagination}>
            <PageButton onClick={onClickPrev} disabled={offset - 40 < 0} text={"<"}/>
            <div>{offset} - {offset + 40 > coinsNumber ? coinsNumber : offset + 40}</div>
            <PageButton onClick={onClickNext} disabled={offset + 40 > coinsNumber} text={">"}></PageButton>
        </div>
    );
};

export default Pagination;