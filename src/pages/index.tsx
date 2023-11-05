import styles from "./index.module.scss"
import Table from "@/app/components/table/Table"
import '../app/styles/globals.css'
import Header from "@/app/components/header/Header";
import {ModalCoinProvider} from "@/app/provider/ModalCoinContext";
import ModalAddCoin from "@/app/components/modal-add-coin/ModalAddCoin";
import React from "react";
import {ModalPortfolioProvider} from "@/app/provider/ModalPortfolioContext";
import ModalPortfolio from "@/app/components/modal-portfolio/ModalPartfolio";

export default function Home() {
    return (
        <ModalCoinProvider>
            <ModalPortfolioProvider>
                <main className={styles.main}>
                    <Header/>
                    <div className={styles.content}>
                        <Table/>
                    </div>
                </main>
                <ModalAddCoin/>
                <ModalPortfolio/>
            </ModalPortfolioProvider>
        </ModalCoinProvider>
    )
}
