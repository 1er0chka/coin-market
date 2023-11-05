import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import styles from './ModalPortfolio.module.scss';
import Button from "@/app/components/button/Button";
import {ModalPortfolioContext} from "@/app/provider/ModalPortfolioContext";
import PortfolioCoin from "@/app/components/modal-portfolio/portfolio-coin/PortfolioCoin";
import {Coin, Portfolio} from "@/app/service/Types";
import {json} from "stream/consumers";
import {formatNumber} from "@/app/service/Formats";
import Service from "@/app/service/Service";

const ModalPortfolio: FunctionComponent = () => {
    const modalContext = useContext(ModalPortfolioContext);
    const {isVisible, setVisible} = modalContext;
    const [portfolio, setPortfolio] = useState<Portfolio[]>([])

    if (!modalContext) {
        throw new Error('ModalAddCoin must be used within a ModalProvider');
    }

    const handleClose = (e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>) => {
        if (e.target === e.currentTarget) {
            setVisible(false)
        }
    };

    useEffect(() => {
        window.addEventListener("storage", getPortfolio)
        getPortfolio()
        return ()=> window.removeEventListener("storage", getPortfolio)
    }, [])

    const getPortfolio = () => {
        const data  = localStorage.getItem('portfolio')
        if (data) {
            const object : Portfolio[] = JSON.parse(data)
            setPortfolio(object)
        } else {
            setPortfolio([])
        }
    }

    return isVisible ? (
        <div className={styles.modal} onClick={handleClose}>
            <div className={styles.content}>
                <div className={styles.title}> Portfolio</div>
                {
                    portfolio.map((coin, id) => <PortfolioCoin key={coin.id} coin={coin}/>)
                }
            </div>
        </div>
    ) : null;
};

export default ModalPortfolio;
