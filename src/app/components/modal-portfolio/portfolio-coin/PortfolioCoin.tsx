import React, { FunctionComponent, useEffect, useState } from "react";
import styles from "./PortfolioCoin.module.scss";
import Button from "@/app/components/button/Button";
import { Coin, defaultCoin, Portfolio } from "@/app/service/Types";
import Service from "@/app/service/Service";
import { formatNumber } from "@/app/service/Formats";
import Image from "next/image";

interface IPortfolioCoinProps {
  coin: Portfolio;
}

const PortfolioCoin: FunctionComponent<IPortfolioCoinProps> = ({ coin }) => {
  const [coinData, setCoinData] = useState<Coin>(defaultCoin);

  useEffect(() => {
    const getAssets = async () => {
      Service.getAssetsById(coin.id)
        .then((data) => {
          setCoinData(data);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    getAssets();
  }, []);

  const removePortfolio = () => {
    const portfolio = localStorage.getItem("portfolio");
    if (coin) {
      if (portfolio) {
        const result: Portfolio[] = JSON.parse(portfolio);
        result.filter((item) => {
          return item.id != coin.id;
        });
        const temp = result.filter((item) => {
          return item.id != coin.id;
        });
        localStorage.setItem("portfolio", JSON.stringify(temp));
      }
      document.dispatchEvent(new Event("storage"));
    }
  };

  return (
    <div className={styles.coinCard}>
      <div className={styles.coinInfo}>
        <div className={styles.coinData}>
          <div className={styles.logo}>
            <Image
              alt={""}
              width={1}
              height={1}
              layout={"responsive"}
              src={
                "https://assets.coincap.io/assets/icons/" +
                coinData?.symbol.toLowerCase() +
                "@2x.png"
              }
            />
          </div>
          <div className={styles.name}>
            {coinData?.name} ({coin.number})
          </div>
        </div>
        <div className={styles.prices}>
          <div className={styles.newPrice}>{formatNumber(coin.oldPrice)}</div>
          <div className={styles.difference}>
            (
            {formatNumber(
              coin.oldPrice -
                coin.number * parseFloat(coinData?.priceUsd as string),
            )}
            )
          </div>
        </div>
      </div>
      <div className={styles.delete}>
        <Button onClick={removePortfolio} disabled={false} text={"X"} />
      </div>
    </div>
  );
};

export default PortfolioCoin;
