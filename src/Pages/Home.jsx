import React from 'react';
import CoinTable from "../Component/CoinTable";
import { CryptoState } from '../CryptoContext';
import TrandingCoin from '../Component/TrandingCoin';
import { UseCoinList } from '../Hooks/UseCoinList';

const Home = () => {
    const { currency, symbol } = CryptoState();

    //Custom Hook
    const {
        coinList,
        pagination,
        setPagination,
        onSearch,
        handleTableChange,
        trandingCoin,
        loader
    } = UseCoinList();

    return (
        <>
            <h4 className='ml-2 slider-title'>The global cryptocurrency market cap  change in the last 24 hours</h4>
            <TrandingCoin
                trandingCoin={trandingCoin}
                currency={currency}
                symbol={symbol} />
            <div className='container'>
                <div className="page-wrapper">
                    <CoinTable
                        coinList={coinList}
                        pagination={pagination}
                        setPagination={setPagination}
                        handleTableChange={handleTableChange}
                        onSearch={onSearch}
                        loader={loader}
                    />
                </div>
            </div>
        </>
    );
}
export default Home;