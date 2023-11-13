import React, { FunctionComponent } from "react";
import styles from "./PopularCoin.module.scss";
import { Coin } from "@/app/service/Types";
import { formatNumber } from "@/app/service/Formats";
import Image from "next/image";

const PopularCoin: FunctionComponent<{ coin: Coin }> = ({ coin }) => {
  return (
    <div className={styles.body}>
      <div className={styles.title}>
        <div className={styles.coinImage}>
          <Image
            alt={""}
            width={110}
            height={110}
            layout={"responsive"}
            src={
              "https://assets.coincap.io/assets/icons/" +
              coin.symbol.toLowerCase() +
              "@2x.png"
            }
          ></Image>
        </div>
        <div className={styles.coinName}>{coin.name}</div>
        <div className={styles.coinSymbol}>{coin.symbol}</div>
      </div>
      <div className={styles.coinPrice}>
        {formatNumber(parseFloat(coin.priceUsd))}
      </div>
    </div>
  );
};

export default PopularCoin;
