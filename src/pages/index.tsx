import styles from "./index.module.scss";
import Table from "@/app/components/table/Table";
import "../app/styles/globals.css";
import Header from "@/app/components/header/Header";
import React, { useEffect, useState } from "react";
import { Coin } from "@/app/service/Types";
import Service from "@/app/service/Service";
import Loading from "@/app/components/loading/Loading";
import Search from "@/app/components/table/search/Search";

export default function Home() {
  const [popularCoins, setPopularCoins] = useState<Coin[]>([]);
  const [coinsNumber, setCoinsNumber] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchInfo, setSearchInfo] = useState<string>("");
  const [objects, setObjects] = useState<Coin[]>([]);

  const search = async () => {
    Service.getSearchResult(searchInfo).then((data) => {
      setObjects(data);
    });
  };

  const getTableData = async (offset: number = 0) => {
    Service.getAssets(offset).then((data) => {
      setObjects(data);
    });
  };

  const getCoinsNumber = async () => {
    Service.getCoinsNumber().then((data) => {
      setCoinsNumber(data);
    });
  };

  useEffect(() => {
    setPopularCoins([]);
    const getAssets = async (id: string) => {
      Service.getAssetsById(id)
        .then((coin) => {
          setPopularCoins((prevCoins) => [...prevCoins, coin]);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    getAssets("bitcoin");
    getAssets("ethereum");
    getAssets("tether");

    setLoading(true);
    getCoinsNumber();
    getTableData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [objects]);

  useEffect(() => {
    search();
  }, [searchInfo]);

  return (
    <main className={styles.main}>
      <Header coins={popularCoins} />
      <div className={styles.content}>
        <div className={styles.aboveTableArea}>
          <div className={styles.title}>Today`s Cryptocurrency Prices</div>
          <Search
            onClick={search}
            searchInfo={searchInfo}
            setSearchInfo={setSearchInfo}
          />
        </div>
        {loading ? (
          <Loading />
        ) : (
          <Table
            itemsNumber={coinsNumber}
            objects={objects}
            setObjects={setObjects}
            refreshTable={getTableData}
          />
        )}
      </div>
    </main>
  );
}
