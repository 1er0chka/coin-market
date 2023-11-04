import {useRouter} from "next/router";
import styles from './CurrencyCoinPage.module.scss'
import '../../app/styles/globals.css'
import CoinChart from "@/pages/coin/coin-chart/CoinChart";
import CoinData from "@/pages/coin/data/CoinData";
import {useEffect, useState} from "react";
import {Coin} from "@/app/service/Types";
import Service from "@/app/service/Service";
import {GetStaticPaths, GetStaticProps} from "next";
import {formatNumber} from "@/app/service/Formats";
import Link from "next/link";
import Loading from "@/app/components/loading/Loading";
import ButtonAddToBasket from "@/app/components/button-add-to-basket/ButtonAddToBasket";

type CurrencyCoinProps = {
    slug: string;
}

const CurrencyCoinPage = ({slug}: CurrencyCoinProps) => {
    const router = useRouter();
    const [coin, setCoin] = useState<Coin | undefined>(undefined)
    const [isExists, setIsExists] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const getAssets = async () => {
            if (typeof router.query.currency_coin === "string") {
                Service.getAssetsById(router.query.currency_coin).then((data) => {
                    setIsExists(typeof data !== "undefined")
                    setCoin(data);
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
                            <div className={styles.title}>
                                <div className={styles.coinRank}>{coin?.rank}.</div>
                                <img
                                    src={"https://assets.coincap.io/assets/icons/" + coin?.symbol.toLowerCase() + "@2x.png"}
                                    className={styles.coinImage}></img>
                                <div className={styles.coinName}>{coin?.name}</div>
                                <div className={styles.coinSymbol}>{coin?.symbol}</div>
                            </div>
                            <div className={styles.info}>
                                <div className={styles.infoLeft}>
                                    <CoinChart coinId={coin?.id as string}/>
                                    <Link className={styles.back} href={'/'}> ← Back to table</Link>
                                </div>
                                <div className={styles.infoRight}>
                                    <div className={styles.coinPrice}>
                                        {formatNumber(parseFloat(coin?.priceUsd as string))}
                                    </div>
                                    <CoinData primaryInfo={'Market Cap'}
                                              secondaryInfo={formatNumber(parseFloat(coin?.marketCapUsd as string))}/>
                                    <CoinData primaryInfo={'Supply'}
                                              secondaryInfo={formatNumber(parseFloat(coin?.supply as string))}/>
                                    <CoinData primaryInfo={'Max Supply'}
                                              secondaryInfo={formatNumber(parseFloat(coin?.maxSupply as string))}/>
                                    <ButtonAddToBasket/>
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
}

export default CurrencyCoinPage

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true
    };
}

export const getStaticProps: GetStaticProps<CurrencyCoinProps> = async (context) => {
    const slug = context.params!.currency_coin as string;
    return {
        props: {
            slug
        }
    }
}
