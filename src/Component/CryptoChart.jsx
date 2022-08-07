import React from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
} from 'chart.js';
import { Line } from 'react-chartjs-2';

const CryptoChart = ({ historicData, days, id, symbol }) => {
    ChartJS.register(
        ArcElement,
        LineElement,
        BarElement,
        PointElement,
        BarController,
        BubbleController,
        DoughnutController,
        LineController,
        PieController,
        PolarAreaController,
        RadarController,
        ScatterController,
        CategoryScale,
        LinearScale,
        LogarithmicScale,
        RadialLinearScale,
        TimeScale,
        TimeSeriesScale,
        Decimation,
        Filler,
        Legend,
        Title,
        Tooltip,
        SubTitle
    );

    return (
        <div className='crypto-chart' style={{ width: '100%', height: '500px' }}>
            {historicData.length > 0
                ? (
                    <Line options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: true,
                                labels: {
                                    color: 'rgb(0, 0, 0)',
                                }
                            }
                        },
                    }} data={{
                        labels: historicData.map((coin) => {
                            let date = new Date(coin[0]);
                            let time =
                                date.getHours() > 12
                                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                    : `${date.getHours()}:${date.getMinutes()} AM`;
                            return days === 1 ? time : date.toLocaleDateString();
                        }),
                        datasets: [
                            {
                                label: symbol?.toUpperCase(),
                                data: historicData.map((coin) => coin[1]),
                                fill: true,
                                backgroundColor: "rgba(89,101,249,0.2)",
                                borderColor: "#5965f9",
                                pointRadius: 0,
                                borderJoinStyle: 'round'
                            },
                        ],
                    }} />
                ) : ""}
        </div>
    );
}


export default CryptoChart;