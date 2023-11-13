import React, { useContext } from "react";
import styles from "./CoinElem.module.scss";
import Image from "next/image";
import { CoinInfoContext } from "@/app/provider/CoinInfoContext";

const CoinElem = () => {
  const { coin } = useContext(CoinInfoContext);

  return (
    <div className={styles.title}>
      <div className={styles.coinRank}>{coin.rank}.</div>
      <div className={styles.coinImage}>
        <Image
          alt={""}
          width={1}
          height={1}
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
  );
};

export default CoinElem;
