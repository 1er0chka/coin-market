import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import styles from './ModalAddCoin.module.scss';
import {ModalCoinContext} from "@/app/provider/ModalCoinContext";
import Button from "@/app/components/button/Button";
import {formatNumber} from "@/app/service/Formats";
import {Portfolio} from "@/app/service/Types";

const ModalAddCoin: FunctionComponent = () => {
    const modalContext = useContext(ModalCoinContext);
    const {coin, setCoin} = modalContext;
    const [coinNumber, setCoinNumber] = useState<number>(0)
    const [isNumberCorrect, setIsNumberCorrect] = useState<boolean>(false)

    if (!modalContext) {
        throw new Error('ModalAddCoin must be used within a ModalProvider');
    }

    const handleClose = (e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>) => {
        if (e.target === e.currentTarget) {
            setCoinNumber(0)
            setCoin(null)
        }
    }

    useEffect(() => {
        if (coinNumber <= 0) {
            setIsNumberCorrect(false)
        } else {
            setIsNumberCorrect(true)
        }
    }, [coinNumber])

    const addToPortfolio = () => {
        const portfolio = localStorage.getItem('portfolio')
        if (coin) {
            if (portfolio) {
                const newCoin: Portfolio = {
                    id: coin.id,
                    number: coinNumber,
                    oldPrice: parseFloat(coin.priceUsd) * coinNumber
                }
                const result: Portfolio[] = JSON.parse(portfolio)
                if (!result.some((coin) => {
                    if (coin.id == newCoin.id) {
                        coin.number += newCoin.number
                        coin.oldPrice += newCoin.oldPrice
                        console.log(coin.oldPrice)
                        return true
                    }
                    return false
                })) {
                    result.push(newCoin)
                }
                localStorage.setItem('portfolio', JSON.stringify(result))
            } else {
                const data: Portfolio[] = [{
                    id: coin.id,
                    number: coinNumber,
                    oldPrice: parseFloat(coin.priceUsd) * coinNumber
                }]
                localStorage.setItem('portfolio', JSON.stringify(data))
            }
            window.dispatchEvent(new Event("storage"))
        }
        setCoinNumber(0)
        setCoin(null)
    }

    return coin ? (
        <div className={styles.modal} onClick={handleClose}>
            <div className={styles.content}>
                <div className={styles.number}>
                    <div className={styles.info}>
                        <div className={styles.coinName}>
                            {coin.name}
                        </div>
                        <div className={styles.coinPrice}>
                            {formatNumber(parseFloat(coin.priceUsd))}
                        </div>
                    </div>
                    <div className={isNumberCorrect ? styles.input : styles.incorrectInput}>
                        <input type={"number"} placeholder={'number'} value={coinNumber}
                               onChange={(event) => setCoinNumber(parseFloat(event.target.value))}/>
                    </div>
                </div>
                <div className={styles.amount}>
                    {formatNumber(coinNumber * parseFloat(coin.priceUsd))}
                </div>
                <div className={styles.buttons}>
                    <Button onClick={handleClose} disabled={false} text={'Cancel'}/>
                    <Button onClick={addToPortfolio} disabled={!isNumberCorrect} text={'Buy'}/>
                </div>
            </div>
        </div>
    ) : null;
};

export default ModalAddCoin;
