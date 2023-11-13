"use client";
import React, { FunctionComponent } from "react";
import { Coin } from "@/app/service/Types";
import styles from "./TableRow.module.scss";
import { formatNumber } from "@/app/service/Formats";
import { useRouter } from "next/router";
import Image from "next/image";

interface ITableRowProps {
  rowContent: Coin;
  setCoin: React.Dispatch<React.SetStateAction<Coin>>;
}

const TableRow: FunctionComponent<ITableRowProps> = ({
  rowContent,
  setCoin,
}) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(
      "/coin/[currency_coin]",
      "/coin/" + rowContent.id.toLowerCase(),
    );
  };

  return (
    <tr className={styles.tableRow}>
      <td onClick={handleClick}>{rowContent.rank}</td>
      <td onClick={handleClick}>
        <div className={styles.nameRow}>
          <div className={styles.nameRow_logo}>
            <Image
              width={140}
              height={140}
              layout={"responsive"}
              src={
                "https://assets.coincap.io/assets/icons/" +
                rowContent.symbol.toLowerCase() +
                "@2x.png"
              }
              alt={""}
            />
          </div>
          <div>{rowContent.name}</div>
          <div className={styles.nameRow_symbol}>{rowContent.symbol}</div>
        </div>
      </td>
      <td onClick={handleClick}>
        {formatNumber(parseFloat(rowContent.priceUsd))}
      </td>
      <td
        onClick={handleClick}
        className={
          parseFloat(rowContent.changePercent24Hr) < 0
            ? styles.negativeSum
            : styles.positiveSum
        }
      >
        {parseFloat(rowContent.changePercent24Hr).toFixed(2)}%
      </td>
      <td onClick={handleClick}>
        {formatNumber(parseFloat(rowContent.marketCapUsd))}
      </td>
      <td
        onClick={() => {
          setCoin(rowContent);
        }}
      >
        <div className={styles.addButton}>
          <div className={styles.image}>
            <Image
              width={125}
              height={125}
              layout={"responsive"}
              src={"/resources/images/add-cart.png"}
              alt={"Buy"}
            />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
