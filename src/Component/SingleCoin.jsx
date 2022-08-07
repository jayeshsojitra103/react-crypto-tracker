/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { CryptoState } from '../CryptoContext';
import { numberWithCommas } from '../Utils/commonFunction';
import { chartDays } from '../Utils/Constant';

const SingleCoin = ({
    coinDetails,
    id,
    setDays,
    days
}) => {
    const { currency, symbol } = CryptoState();
    const current_currency = currency?.toLowerCase();
    const profit = coinDetails?.market_data?.price_change_percentage_24h > 0;
    return (
        <div className='chart-details'>
            <div className="media">
                <div className="media-body">
                    <div className="row row-sm">
                        <div className="media-icon">
                            <img src={coinDetails?.image?.small} alt={id} />
                        </div>
                        <div className="col">
                            <label>Symbol</label>
                            <p>{coinDetails?.symbol || ""}</p>
                        </div>
                        <div className="col-3">
                            <label>Currency</label>
                            <p>{currency}</p>
                        </div>
                        <div className="col">
                            <label>Price (USD)</label>
                            <p>{symbol + numberWithCommas(coinDetails?.market_data?.current_price?.[current_currency].toFixed(2)) || ""}</p>
                        </div>
                        <div className="col">
                            <label>Change (24H)</label>
                            <p className={profit ? 'text-success' : 'text-danger'}>
                                {numberWithCommas(coinDetails?.market_data?.price_change_percentage_24h?.toFixed(2)) || ""} %</p>
                        </div>
                        <div className="col">
                            <label>Market Cap</label>
                            <p>{symbol + numberWithCommas(coinDetails?.market_data?.market_cap?.[current_currency].toFixed(2)) || ""}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="right-col">
                <nav className="coin-filter-tab ">
                    {
                        chartDays?.map((filter) => {
                            return (
                                <span
                                    onClick={() => { setDays(filter?.value) }}
                                    className={days === filter?.value ? 'nav-link  active' : 'nav-link '}
                                    key={filter?.value}>{filter?.label}</span>
                            )
                        })
                    }


                </nav>
            </div>
        </div>
    );
}

export default SingleCoin;