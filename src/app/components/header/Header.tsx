import React, {useContext, useEffect, useState} from 'react';
import styles from './Header.module.scss'
import {Coin, Portfolio} from "@/app/service/Types";
import Service from "@/app/service/Service";
import PopularCoin from "@/app/components/header/popular-coin/PopularCoin";
import {ModalPortfolioContext, ModalPortfolioProvider} from "@/app/provider/ModalPortfolioContext";
import {formatNumber} from "@/app/service/Formats";

const Header = () => {
    const [coins, setCoins] = useState<Coin[]>([])
    const {isVisible, setVisible} = useContext(ModalPortfolioContext)
    const [portfolioSum, setPortfolioSum] = useState<number>(0);
    const [portfolioDif, setPortfolioDif] = useState<number>(0);

    useEffect(() => {
        setCoins([])
        const getAssets = async (id: string) => {
            Service.getAssetsById(id).then((coin) => {
                setCoins(prevCoins => [...prevCoins, coin as Coin]);
            });
        }
        getAssets('bitcoin')
        getAssets('ethereum')
        getAssets('tether')
    }, [])

    useEffect(() => {
        window.addEventListener("storage", getSum)
        getSum()
        return () => window.removeEventListener("storage", getSum)
    }, [])

    const getSum = () => {
        let sum = 0
        const portfolio = localStorage.getItem('portfolio')
        if (portfolio) {
            const data: Portfolio[] = JSON.parse(portfolio)
            data.forEach((item) => {
                sum += item.oldPrice
            })
        }
        setPortfolioSum(sum)
    }

    useEffect(() => {
        setPortfolioDif(0)
        const getAssets = async (coin: Portfolio) => {
            Service.getAssetsById(coin.id).then((data) => {
                setPortfolioDif(portfolioDif + (coin.oldPrice - coin.number * parseFloat(data?.priceUsd as string)))
            });
        }
        const portfolio = localStorage.getItem('portfolio')
        if (portfolio) {
            const data: Portfolio[] = JSON.parse(portfolio)
            data.forEach((item) => {
                getAssets(item)
            })
        }
    }, [portfolioSum])

    return (
        <div className={styles.body}>
            {
                coins.length == 3 ?
                    <div className={styles.popular}>
                        <PopularCoin coin={coins[0]}/>
                        <PopularCoin coin={coins[1]}/>
                        <PopularCoin coin={coins[2]}/>
                    </div>
                    :
                    <div/>
            }
            <div className={styles.portfolio} onClick={() => setVisible(true)}>
                <div className={styles.portfolioPrice}>
                    <div className={styles.price}>{formatNumber(portfolioSum)}</div>
                    {
                        portfolioDif != 0 ?
                            <div className={styles.difference}>{formatNumber(portfolioDif)} ({(portfolioDif / portfolioSum * 100).toFixed(2)}%)</div>
                            :
                            <div className={styles.difference}>0 (0%)</div>
                    }
                </div>
                <img src={"/resources/images/coin.png"}/>
            </div>
        </div>
    );
};

export default Header;