import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import Loading from "@/app/components/loading/Loading";
import styles from "@/pages/coin/CurrencyCoinPage.module.scss";
import CoinElem from "@/app/components/coin-elem/CoinElem";
import CoinChart from "@/app/components/coin-chart/CoinChart";
import Link from "next/link";
import {formatNumber} from "@/app/service/Formats";
import CoinData from "@/app/components/coin-data/CoinData";
import {Coin} from "@/app/service/Types";
import {useRouter} from "next/router";
import {ModalCoinContext} from "@/app/provider/ModalCoinContext";
import Service from "@/app/service/Service";
import {CurrencyCoinProps} from "@/pages/coin/[currency_coin]";

const CoinPage:FunctionComponent<{slug: CurrencyCoinProps}> = ({slug}) => {
    const router = useRouter();
    const [currencyCoin, setCurrencyCoin] = useState<Coin | undefined>(undefined)
    const [isExists, setIsExists] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(true)
    const {setCoin} = useContext(ModalCoinContext)

    useEffect(() => {
        const getAssets = async () => {
            if (typeof router.query.currency_coin === "string") {
                Service.getAssetsById(router.query.currency_coin).then((data) => {
                    setCurrencyCoin(data);
                    setIsExists(typeof data !== "undefined")
                });
            }
        }
        if (slug) {
            getAssets()
        }
    }, [slug])

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [isExists])

    return (
        <div>
            {loading ? <Loading/> :
                <div>
                    {isExists ?
                        <div className={styles.content}>
                            <CoinElem coin={currencyCoin}/>
                            <div className={styles.info}>
                                <div className={styles.infoLeft}>
                                    <CoinChart coinId={currencyCoin?.id as string}/>
                                    <Link className={styles.back} href={'/'}> ← Back to table</Link>
                                </div>
                                <div className={styles.infoRight}>
                                    <div className={styles.coinPrice}>
                                        {formatNumber(parseFloat(currencyCoin?.priceUsd as string))}
                                    </div>
                                    <CoinData primaryInfo={'Market Cap'}
                                              secondaryInfo={formatNumber(parseFloat(currencyCoin?.marketCapUsd as string))}/>
                                    <CoinData primaryInfo={'Supply'}
                                              secondaryInfo={formatNumber(parseFloat(currencyCoin?.supply as string))}/>
                                    <CoinData primaryInfo={'Max Supply'}
                                              secondaryInfo={formatNumber(parseFloat(currencyCoin?.maxSupply as string))}/>
                                    <button onClick={() => setCoin(currencyCoin as Coin)}
                                            className={styles.addButton}>Add To Basket
                                    </button>
                                </div>
                            </div>
                        </div>
                        :
                        <div className={styles.content}>
                            <div className={styles.error}>Page doesn`t exist</div>
                            <Link className={styles.back} href={'/'}> ← Back to table</Link>
                        </div>
                    }
                </div>
            }
        </div>
    );
};

export default CoinPage;