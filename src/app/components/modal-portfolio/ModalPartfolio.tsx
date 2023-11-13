import React, { FunctionComponent, useEffect, useState } from "react";
import styles from "./ModalPortfolio.module.scss";
import Button from "@/app/components/button/Button";
import PortfolioCoin from "@/app/components/modal-portfolio/portfolio-coin/PortfolioCoin";
import { Portfolio } from "@/app/service/Types";

interface IModalPortfolioProps {
  isVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalPortfolio: FunctionComponent<IModalPortfolioProps> = ({
  isVisible,
  setVisible,
}) => {
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);

  useEffect(() => document.addEventListener("storage", getPortfolio), []);

  const handleClose = (
    e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (e.target === e.currentTarget) {
      setVisible(false);
    }
  };

  const getPortfolio = () => {
    const data = localStorage.getItem("portfolio");
    if (data) {
      const object: Portfolio[] = JSON.parse(data);
      setPortfolio(object);
    } else {
      setPortfolio([]);
    }
  };

  useEffect(() => {
    if (isVisible) {
      getPortfolio();
    }
  }, [isVisible]);

  return isVisible ? (
    <div className={styles.modal} onClick={handleClose}>
      <div className={styles.content}>
        <div className={styles.title}> Portfolio</div>
        {portfolio.map((coin) => (
          <PortfolioCoin key={coin.id} coin={coin} />
        ))}
        <Button
          onClick={() => setVisible(false)}
          disabled={false}
          text={"Close"}
        />
      </div>
    </div>
  ) : null;
};

export default ModalPortfolio;
