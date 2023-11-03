'use client'
import React, {FunctionComponent, MouseEventHandler} from 'react';
import styles from "./Button.module.scss"

interface IButtonParams {
    onClick: MouseEventHandler<HTMLButtonElement>
    disabled: boolean
    text: string
}

const Button: FunctionComponent<IButtonParams> = ({onClick, disabled, text}) => {

    return (
        <button className={styles.button} onClick={onClick} disabled={disabled}>{text}</button>
    );
}

export default Button;