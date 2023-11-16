import React, {FunctionComponent, useEffect, useState} from "react";
import styles from "./Header.module.scss";
import {Coin, Portfolio} from "@/app/service/Types";
import Service from "@/app/service/Service";
import PopularCoin from "@/app/components/header/popular-coin/PopularCoin";
import {formatNumber} from "@/app/service/Formats";
import Image from "next/image";
import ModalPortfolio from "@/app/components/modal-portfolio/ModalPartfolio";

const Header: FunctionComponent<{ coins: Coin[] }> = ({coins}) => {
    const [portfolioSum, setPortfolioSum] = useState<number>(0);
    const [portfolioDif, setPortfolioDif] = useState<number>(0);
    const [isModalVisible, setModalVisible] = useState<boolean>(false);

    useEffect(() => {
        document.addEventListener("storage", getSum);
        getSum();
        return () => document.removeEventListener("storage", getSum);
    }, []);

    const getSum = () => {
        let sum = 0;
        const portfolio = localStorage.getItem("portfolio");
        if (portfolio) {
            const data: Portfolio[] = JSON.parse(portfolio);
            data.forEach((item) => {
                sum += item.oldPrice;
            });
        }
        setPortfolioSum(sum);
    };

    useEffect(() => {
        setPortfolioDif(0);
        const getAssets = async (coin: Portfolio) => {
            Service.getAssetsById(coin.id)
                .then((data) => {
                    setPortfolioDif(
                        portfolioDif +
                        (coin.oldPrice -
                            coin.number * parseFloat(data?.priceUsd as string)),
                    );
                })
                .catch((err) => {
                    console.error(err);
                });
        };
        const portfolio = localStorage.getItem("portfolio");
        if (portfolio) {
            const data: Portfolio[] = JSON.parse(portfolio);
            data.forEach((item) => {
                getAssets(item);
            });
        }
    }, [portfolioSum]);

    return (
        <div className={styles.body}>
            {coins.length == 3 ? (
                <div className={styles.popular}>
                    <PopularCoin coin={coins[0]}/>
                    <PopularCoin coin={coins[1]}/>
                    <PopularCoin coin={coins[2]}/>
                </div>
            ) : (
                <div/>
            )}
            <div className={styles.portfolio} onClick={() => setModalVisible(true)}>
                <div className={styles.portfolioPrice}>
                    <div className={styles.price}>{formatNumber(portfolioSum)}</div>
                    {portfolioDif != 0 ? (
                        <div className={styles.difference}>
                            {formatNumber(portfolioDif)} (
                            {((portfolioDif / portfolioSum) * 100).toFixed(2)}%)
                        </div>
                    ) : (
                        <div className={styles.difference}>0 (0%)</div>
                    )}
                </div>
                <div className={styles.image}>
                    <Image
                        width={300}
                        height={300}
                        layout={"responsive"}
                        src={"/resources/images/coin.png"}
                        alt={"Portfolio"}
                    />
                </div>
            </div>
            <ModalPortfolio isVisible={isModalVisible} setVisible={setModalVisible}/>
        </div>
    );
};

export default Header;
