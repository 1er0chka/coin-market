import React, {useEffect, useState} from 'react';
import styles from "./CoinChart.module.scss";
import Button from "@/app/components/button/Button";
import dynamic from "next/dynamic";

const ChartComponentWithNoSSR = dynamic(() => import('@/app/components/chart/Chart'), {
    ssr: false
});
const CoinChart = () => {
    const [mode, setMode] = useState<string>("24H")

    useEffect(() => {
        // переделать график под новый mode
    }, [mode])

    return (
        <div>
            <div className={styles.modeList}>
                <Button onClick={() => setMode('24H')} disabled={mode == '24H'} text={'24H'}/>
                <Button onClick={() => setMode('7D')} disabled={mode == '7D'} text={'7D'}/>
                <Button onClick={() => setMode('1M')} disabled={mode == '1M'} text={'1M'}/>
            </div>
            <div>
                <ChartComponentWithNoSSR/>
            </div>
        </div>
    );
};

export default CoinChart;