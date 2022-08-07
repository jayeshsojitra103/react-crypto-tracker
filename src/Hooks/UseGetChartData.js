import { useEffect, useState } from 'react';
import axios from 'axios';
import { CryptoState } from '../CryptoContext';

export const UseGetChartData = (id, days) => {
    const [historicData, setHistoricData] = useState([]);
    const [coinDetails, setCoinDetails] = useState([]);

    const { currency } = CryptoState();
    useEffect(() => {
        getCoinChart();
        getCoinDetails()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getCoinChart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [days]);

    const getCoinChart = async () => {
        try {
            const url = `https://api.coingecko.com/api/v3/coins/${id.toLowerCase()}/market_chart?vs_currency=${currency}&days=${days}`;
            const res = await axios.get(url);
            setHistoricData(res?.data?.prices);
        }
        catch (err) {
            console.log("err", err)
        }
    }
    const getCoinDetails = async () => {
        try {
            const url = `https://api.coingecko.com/api/v3/coins/${id?.toLowerCase()}?days=${days}/`;
            const res = await axios.get(url);
            setCoinDetails(res?.data);
        }
        catch (err) {
            console.log("err", err)
        }
    }
    return {
        historicData,
        coinDetails
    }
}
