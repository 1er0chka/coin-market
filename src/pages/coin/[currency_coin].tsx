import "../../app/styles/globals.css";
import React, { useContext, useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import CoinPage from "@/app/components/coin-page/CoinPage";
import Header from "@/app/components/header/Header";
import Service from "@/app/service/Service";
import { useRouter } from "next/router";
import { CoinInfoContext } from "@/app/provider/CoinInfoContext";
import Loading from "@/app/components/loading/Loading";
import styles from "@/pages/coin/CurrencyCoinPage.module.scss";
import Link from "next/link";
import { Coin } from "@/app/service/Types";

export type CurrencyCoinProps = {
  slug: string;
};

const CurrencyCoinPage = ({ slug }: CurrencyCoinProps) => {
  const router = useRouter();
  const { coin, setCoin, interval, setTime, setPrice } =
    useContext(CoinInfoContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [isExist, setExist] = useState<boolean>(false);
  const [popularCoins, setPopularCoins] = useState<Coin[]>([]);

  useEffect(() => {
    const getAssets = async () => {
      if (typeof router.query.currency_coin === "string") {
        Service.getAssetsById(router.query.currency_coin)
          .then((data) => {
            setCoin(data);
            setExist(true);
          })
          .catch((err) => {
            console.error(err);
            setExist(false);
            setLoading(false);
          });
      }
    };
    if (slug != undefined) {
      setLoading(true);
      getAssets();
    }
  }, [slug]);

  useEffect(() => {
    const getHistory = async () => {
      Service.getHistoryById(coin.id, interval).then((data) => {
        const x: string[] = [];
        const y: number[] = [];
        switch (interval) {
          case "m1": {
            data.map((time) => {
              x.push(
                new Date(parseInt(time.time)).getUTCHours().toString() +
                  ":" +
                  new Date(parseInt(time.time)).getUTCMinutes().toString(),
              );
              y.push(parseFloat(time.priceUsd));
            });
            break;
          }
          default: {
            data.map((time) => {
              x.push(
                new Date(parseInt(time.time)).getUTCDay().toString() +
                  "." +
                  new Date(parseInt(time.time)).getUTCMonth().toString() +
                  " " +
                  new Date(parseInt(time.time)).getUTCHours().toString() +
                  ":" +
                  new Date(parseInt(time.time)).getUTCMinutes().toString(),
              );
              y.push(parseFloat(time.priceUsd));
            });
            break;
          }
        }
        setTime(x);
        setPrice(y);
        setLoading(false);
      });
    };

    if (coin.id.length > 0) {
      getHistory();
    }
  }, [coin, interval]);

  useEffect(() => {
    setPopularCoins([]);
    const getAssets = async (id: string) => {
      Service.getAssetsById(id)
        .then((coin) => {
          setPopularCoins((prevCoins) => [...prevCoins, coin]);
        })
        .catch((err) => {
          console.error(err);
          setPopularCoins([]);
        });
    };
    getAssets("bitcoin");
    getAssets("ethereum");
    getAssets("tether");
  }, []);

  return (
    <div>
      <Header coins={popularCoins} />
      {loading ? (
        <Loading />
      ) : (
        <div>
          {isExist ? (
            <CoinPage />
          ) : (
            <div className={styles.content}>
              <div className={styles.error}>Page doesn`t exist</div>
              <Link className={styles.back} href={"/"}>
                {" "}
                ← Back to table
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default CurrencyCoinPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<CurrencyCoinProps> = async (
  context,
) => {
  const slug = context.params!.currency_coin as string;
  return {
    props: {
      slug,
    },
  };
};
