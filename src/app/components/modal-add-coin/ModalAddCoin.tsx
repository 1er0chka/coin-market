import React, { FunctionComponent, useEffect, useState } from "react";
import styles from "./ModalAddCoin.module.scss";
import Button from "@/app/components/button/Button";
import { formatNumber } from "@/app/service/Formats";
import { Coin, Portfolio } from "@/app/service/Types";

interface IModalAddCoinProps {
  isVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  coin: Coin;
}

const ModalAddCoin: FunctionComponent<IModalAddCoinProps> = ({
  isVisible,
  setVisible,
  coin,
}) => {
  const [coinNumber, setCoinNumber] = useState<number>(0);
  const [isNumberCorrect, setIsNumberCorrect] = useState<boolean>(false);

  const handleClose = (
    e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (e.target === e.currentTarget) {
      setCoinNumber(0);
      setVisible(false);
    }
  };

  useEffect(() => {
    if (coinNumber > 0) {
      setIsNumberCorrect(true);
    } else {
      setIsNumberCorrect(false);
    }
  }, [coinNumber]);

  const addToPortfolio = () => {
    const portfolio = localStorage.getItem("portfolio");
    if (portfolio) {
      const newCoin: Portfolio = {
        id: coin.id,
        number: coinNumber,
        oldPrice: parseFloat(coin.priceUsd) * coinNumber,
      };
      const result: Portfolio[] = JSON.parse(portfolio);
      if (
        !result.some((coin) => {
          if (coin.id == newCoin.id) {
            coin.number += newCoin.number;
            coin.oldPrice += newCoin.oldPrice;
            return true;
          }
          return false;
        })
      ) {
        result.push(newCoin);
      }
      localStorage.setItem("portfolio", JSON.stringify(result));
    } else {
      const data: Portfolio[] = [
        {
          id: coin.id,
          number: coinNumber,
          oldPrice: parseFloat(coin.priceUsd) * coinNumber,
        },
      ];
      localStorage.setItem("portfolio", JSON.stringify(data));
    }
    document.dispatchEvent(new Event("storage"));
    setCoinNumber(0);
    setVisible(false);
  };

  return isVisible ? (
    <div className={styles.modal} onClick={handleClose}>
      <div className={styles.content}>
        <div className={styles.number}>
          <div className={styles.info}>
            <div className={styles.coinName}>{coin.name}</div>
            <div className={styles.coinPrice}>
              {formatNumber(parseFloat(coin.priceUsd))}
            </div>
          </div>
          <div
            className={isNumberCorrect ? styles.input : styles.incorrectInput}
          >
            <input
              type={"number"}
              placeholder={"number"}
              onChange={(event) =>
                setCoinNumber(parseFloat(event.target.value))
              }
            />
          </div>
        </div>
        <div className={styles.amount}>
          {isNaN(coinNumber * parseFloat(coin.priceUsd))
            ? "$0.00"
            : formatNumber(coinNumber * parseFloat(coin.priceUsd))}
        </div>
        <div className={styles.buttons}>
          <Button onClick={handleClose} disabled={false} text={"Cancel"} />
          <Button
            onClick={addToPortfolio}
            disabled={!isNumberCorrect}
            text={"Buy"}
          />
        </div>
      </div>
    </div>
  ) : null;
};

export default ModalAddCoin;
