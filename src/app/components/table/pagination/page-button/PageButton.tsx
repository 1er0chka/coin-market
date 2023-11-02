'use client'
import React, {FunctionComponent, MouseEventHandler} from 'react';
import styles from "./PageButton.module.scss"

interface IButtonParams {
    onClick: MouseEventHandler<HTMLButtonElement>
    disabled: boolean
    text: string
}

const PageButton: FunctionComponent<IButtonParams> = ({onClick, disabled, text}) => {

    return (
        <button className={styles.button} onClick={onClick} disabled={disabled}>{text}</button>
    );
}

export default PageButton;