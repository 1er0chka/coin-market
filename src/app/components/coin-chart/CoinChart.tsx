import React, { useContext } from "react";
import styles from "./CoinChart.module.scss";
import Button from "@/app/components/button/Button";
import dynamic from "next/dynamic";
import { CoinInfoContext } from "@/app/provider/CoinInfoContext";

const ChartComponentWithNoSSR = dynamic(
  () => import("@/app/components/chart/Chart"),
  {
    ssr: false,
  },
);

const CoinChart = () => {
  const { interval, setInterval } = useContext(CoinInfoContext);

  return (
    <div className={styles.body}>
      <div className={styles.modeList}>
        <Button
          onClick={() => setInterval("m1")}
          disabled={interval == "m1"}
          text={"24H"}
        />
        <Button
          onClick={() => setInterval("m15")}
          disabled={interval == "m15"}
          text={"7D"}
        />
        <Button
          onClick={() => setInterval("h1")}
          disabled={interval == "h1"}
          text={"1M"}
        />
      </div>
      <div>
        <ChartComponentWithNoSSR />
      </div>
    </div>
  );
};

export default CoinChart;
