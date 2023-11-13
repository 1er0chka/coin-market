import styles from "@/pages/coin/CurrencyCoinPage.module.scss";
import CoinElem from "@/app/components/coin-elem/CoinElem";
import CoinChart from "@/app/components/coin-chart/CoinChart";
import Link from "next/link";
import { formatNumber } from "@/app/service/Formats";
import CoinData from "@/app/components/coin-data/CoinData";
import React, { useContext, useState } from "react";
import { CoinInfoContext } from "@/app/provider/CoinInfoContext";
import ModalAddCoin from "@/app/components/modal-add-coin/ModalAddCoin";

const CoinPage = () => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const { coin } = useContext(CoinInfoContext);

  return (
    <div className={styles.content}>
      <CoinElem />
      <div className={styles.info}>
        <div className={styles.infoLeft}>
          <CoinChart />
          <Link className={styles.back} href={"/"}>
            {" "}
            ← Back to table
          </Link>
        </div>
        <div className={styles.infoRight}>
          <div className={styles.coinPrice}>
            {formatNumber(parseFloat(coin.priceUsd))}
          </div>
          <CoinData
            primaryInfo={"Market Cap"}
            secondaryInfo={formatNumber(parseFloat(coin.marketCapUsd))}
          />
          <CoinData
            primaryInfo={"Supply"}
            secondaryInfo={formatNumber(parseFloat(coin.supply))}
          />
          <CoinData
            primaryInfo={"Max Supply"}
            secondaryInfo={formatNumber(parseFloat(coin.maxSupply))}
          />
          <button
            onClick={() => setModalVisible(true)}
            className={styles.addButton}
          >
            Add To Basket
          </button>
        </div>
      </div>
      <ModalAddCoin
        isVisible={isModalVisible}
        setVisible={setModalVisible}
        coin={coin}
      />
    </div>
  );
};

export default CoinPage;
