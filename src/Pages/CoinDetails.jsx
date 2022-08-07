import React, { useState } from 'react';
import { useParams } from "react-router-dom";

import { UseGetChartData } from '../Hooks';
import CryptoChart from '../Component/CryptoChart';

import SingleCoin from '../Component/SingleCoin';
import Loader from '../Component/Loader';

const CoinDetails = () => {
    //Local State
    const [days, setDays] = useState(1);

    const { id } = useParams();
    const { historicData, coinDetails } = UseGetChartData(id, days);
    console.log()
    return (
        historicData.length > 0 && coinDetails ?
            <div className='card m-50'>
                <div className='card-body'>
                    <div className='details-wrapper'>
                        <SingleCoin
                            coinDetails={coinDetails}
                            id={id}
                            setDays={setDays}
                            days={days}
                        />
                        <div className='chart-container'>
                            <CryptoChart
                                historicData={historicData}
                                symbol={coinDetails?.symbol}
                                days={days} />
                        </div>
                    </div>
                </div>
            </div>
            :
            <div className='card m-50'>
                <div className='card-body crypto-chart'>
                    <Loader />
                </div>
            </div>

    );
}


export default CoinDetails;