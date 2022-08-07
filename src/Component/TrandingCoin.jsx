import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import { numberWithCommas } from '../Utils/commonFunction';

const TrandingCoin = ({ trandingCoin, currency, symbol }) => {

    //Reder Coin List
    const renderCoin = () => {
        return trandingCoin.map((coin => {
            const profit = coin?.price_change_percentage_24h && coin?.price_change_percentage_24h > 0;
            return (
                <div key={coin?.symbol}>
                    <Link to={`/coin-details/${coin?.id}`} >
                        <div className="crypto-card">
                            <div className="d-flex">
                                <div className="">
                                    <img
                                        className='w-6 h-6 mt-0'
                                        src={coin?.image}
                                        alt="" />
                                </div>
                                <div className="ml-3">
                                    <p className="mb-1 tx-13 text-uppercase coin_name">{coin?.symbol} / {currency}</p>
                                    <div className="m-0 tx-13 text-warning">{symbol}{
                                        numberWithCommas(coin?.current_price && coin?.current_price?.toFixed(2))
                                    }<span
                                        className={profit ? 'text-success ml-2' : 'text-danger ml-2'}
                                    >{
                                                `${numberWithCommas(coin?.price_change_percentage_24h && coin?.price_change_percentage_24h?.toFixed(2))} %`
                                            }</span></div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            )
        }))
    }
    const responsive = {
        0: {
            items: 1
        },
        600: {
            items: 4
        },
        1024: {
            items: 8
        }
    };

    return (
        <div className='tranding-coin-wrapper'>
            <div>
                <AliceCarousel
                    duration={10}
                    autoPlay={true}
                    startIndex={1}
                    fadeOutAnimation={true}
                    mouseDragEnabled={true}
                    playButtonEnabled={true}
                    responsive={responsive}
                    autoPlayInterval={2000}
                    autoPlayDirection="ltr"
                    autoPlayActionDisabled={true}
                >
                    {renderCoin()}

                </AliceCarousel>
            </div>
        </div >
    );
}


export default TrandingCoin;