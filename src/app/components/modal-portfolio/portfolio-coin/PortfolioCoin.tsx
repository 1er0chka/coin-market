import React, {FunctionComponent, useEffect, useState} from 'react';
import styles from './PortfolioCoin.module.scss'
import Button from "@/app/components/button/Button";
import {Coin, Portfolio} from "@/app/service/Types";
import Service from "@/app/service/Service";
import {formatNumber} from "@/app/service/Formats";

const PortfolioCoin: FunctionComponent<{ coin: Portfolio }> = ({coin}) => {
    const [coinData, setCoinData] = useState<Coin | undefined>(undefined)

    useEffect(() => {
        const getAssets = async () => {
            Service.getAssetsById(coin.id).then((data) => {
                setCoinData(data)
            });
        }
        getAssets()
    }, [])

    const removePortfolio = () => {
        const portfolio = localStorage.getItem('portfolio')
        if (coin) {
            if (portfolio) {
                const result: Portfolio[] = JSON.parse(portfolio)
                result.filter((item) => {
                    return item.id != coin.id;
                })
                const temp = result.filter((item) => {
                    return item.id != coin.id;
                })
                localStorage.setItem('portfolio', JSON.stringify(temp))
            }
            window.dispatchEvent(new Event("storage"))
        }
    }

    return (
        <div className={styles.coinCard}>
            <div className={styles.coinInfo}>
                <div className={styles.coinData}>
                    <img className={styles.logo}
                         src={'https://assets.coincap.io/assets/icons/' + 'btc' + '@2x.png'}/>
                    <div className={styles.name}>
                        {coinData?.name} ({coin.number})
                    </div>
                </div>
                <div className={styles.prices}>
                    <div className={styles.newPrice}>{formatNumber(coin.oldPrice)}</div>
                    <div className={styles.difference}>({formatNumber(coin.oldPrice - coin.number * parseFloat(coinData?.priceUsd as string))})</div>
                </div>
            </div>
            <div className={styles.delete}>
                <Button onClick={removePortfolio} disabled={false} text={'X'}/>
            </div>
        </div>
    );
};

export default PortfolioCoin;