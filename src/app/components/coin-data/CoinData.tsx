import React, { FunctionComponent } from "react";
import styles from "./CoinData.module.scss";

interface ICoinDataProps {
  primaryInfo: string;
  secondaryInfo: string;
}

const CoinData: FunctionComponent<ICoinDataProps> = ({
  primaryInfo,
  secondaryInfo,
}) => {
  return (
    <div>
      {secondaryInfo != "$NaN" && secondaryInfo != "&0.00" ? (
        <div className={styles.title}>
          <div className={styles.primaryInfo}>{primaryInfo}</div>
          <div className={styles.secondaryInfo}>{secondaryInfo}</div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default CoinData;
