import { useEffect, useState } from 'react';
import axios from 'axios';
import { CryptoState } from '../CryptoContext';

export const UseCoinList = () => {

    const { currency } = CryptoState();

    const [coinList, setCoinList] = useState([]);
    const [trandingCoin, setTrandingCoin] = useState([]);
    const [loader, setLoader] = useState(true);
    const [pagination, setPagination] = useState({
        pageSize: 5,
        total: 250,
        current: 1,
        order: 'market_cap_desc',
        sparkline: false,
        position: ['bottomCenter']
    })


    //Cryptocurrency Prices by Market Cap
    const getCoinList = async (data) => {
        try {
            setLoader(true)
            const { pageSize, current, order, sparkline } = data;
            const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${order}&per_page=${pageSize}&page=${current}&sparkline=${sparkline}`;
            const res = await axios.get(url);
            setCoinList(res?.data)
        }
        catch (err) {
            console.log("err", err)
        }
        finally {
            setLoader(false)
        }
    }

    //Cryptocurrency Tranding coin
    const getTrandingCoin = async () => {
        try {
            const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h`;

            const res = await axios.get(url);
            setTrandingCoin(res?.data)
        }
        catch (err) {
            console.log("err", err)
        }

    }

    useEffect(() => {
        getCoinList(pagination);
        getTrandingCoin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (currency) {
            getCoinList(pagination);
            getTrandingCoin();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency])


    //Change Page on Table
    const handleTableChange = (value) => {
        setPagination(
            {
                ...pagination,
                pageSize: value.pageSize,
                current: value?.current
            }
        )
        getCoinList(value)
    }

    //Search Coin on Table
    const onSearch = async (e) => {
        if (e) {
            const coinName = e.toLowerCase();
            const { current, order, sparkline } = pagination;
            const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${order}&per_page=250&page=${current}&sparkline=${sparkline}`;
            const res = await axios.get(url);
            const filterCoin = res?.data.filter(
                (coin) =>
                    coin.name.toLowerCase().includes(coinName) ||
                    coin.symbol.toLowerCase().includes(coinName)
            );
            setPagination({
                ...pagination,
                total: filterCoin.length,
            })
            setCoinList(filterCoin)
            console.log("data", filterCoin)
        }
        else {
            setPagination({
                pageSize: 5,
                total: 250,
                current: 1,
                order: 'market_cap_desc',
                sparkline: false,
                position: ['bottomCenter']
            })
            getCoinList({
                pageSize: 5,
                total: 250,
                current: 1,
                order: 'market_cap_desc',
                sparkline: false,
                position: ['bottomCenter']
            })

        }

    }
    return {
        coinList,
        trandingCoin,
        pagination,
        setPagination,
        setCoinList,
        getCoinList,
        loader,
        onSearch,
        handleTableChange
    }
}



