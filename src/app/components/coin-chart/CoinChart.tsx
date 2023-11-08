import React, {FunctionComponent, useEffect, useState} from 'react';
import styles from "./CoinChart.module.scss";
import Button from "@/app/components/button/Button";
import dynamic from "next/dynamic";
import Service from "@/app/service/Service";

const ChartComponentWithNoSSR = dynamic(() => import('@/app/components/chart/Chart'), {
    ssr: false
});
const CoinChart: FunctionComponent<{ coinId: string }> = ({coinId}) => {
    const [interval, setInterval] = useState<string>("m1")
    const [time, setTime] = useState<string[]>([])
    const [price, setPrice] = useState<number[]>([])

    useEffect(() => {
        const getHistory = async () => {
            Service.getHistoryById(coinId, interval).then((data) => {
                const x: string[] = []
                const y: number[] = []
                switch (interval) {
                    case 'm1': {
                        data.map((time => {
                            x.push(new Date(parseInt(time.time)).getUTCHours().toString() + ':' + new Date(parseInt(time.time)).getUTCMinutes().toString())
                            y.push(parseFloat(time.priceUsd))
                        }))
                        break
                    }
                    default : {
                        data.map((time => {
                            x.push(new Date(parseInt(time.time)).getUTCDay().toString() + '.' + new Date(parseInt(time.time)).getUTCMonth().toString() + ' ' + new Date(parseInt(time.time)).getUTCHours().toString() + ':' + new Date(parseInt(time.time)).getUTCMinutes().toString())
                            y.push(parseFloat(time.priceUsd))
                        }))
                        break
                    }
                }
                setTime(x)
                setPrice(y)
            });
        }
        if (typeof coinId !== 'undefined') {
            getHistory()
        }
    }, [coinId, interval])

    return (
        <div className={styles.body}>
            <div className={styles.modeList}>
                <Button onClick={() => setInterval('m1')} disabled={interval == 'm1'} text={'24H'}/>
                <Button onClick={() => setInterval('m15')} disabled={interval == 'm15'} text={'7D'}/>
                <Button onClick={() => setInterval('h1')} disabled={interval == 'h1'} text={'1M'}/>
            </div>
            <div>
                <ChartComponentWithNoSSR time={time} price={price}/>
            </div>
        </div>
    );
};

export default CoinChart;