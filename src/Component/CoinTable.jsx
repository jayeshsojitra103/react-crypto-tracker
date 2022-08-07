import React from 'react';
import { Table, Input, Select } from 'antd';
import { CryptoState } from '../CryptoContext';
import { Link } from 'react-router-dom';
import { numberWithCommas } from '../Utils/commonFunction';
const { Search } = Input;
const { Option } = Select;

const CoinTable = ({
    coinList,
    pagination,
    handleTableChange,
    onSearch,
    loader
}) => {
    const { currency, symbol, setCurrency } = CryptoState();
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_req, record) => {
                return (
                    <Link to={`/coin-details/${record?.id}`}>
                        <div className='name-wrapper'>
                            <div className='coin-img'>
                                <img src={record.image} alt="" />
                            </div>
                            <div className='coin-name'>
                                <b>{record?.symbol}</b>
                                <span>{record?.name}</span>
                            </div>
                        </div>
                    </Link>
                )
            },
        },
        {
            title: 'Price',
            dataIndex: 'current_price',
            key: 'current_price',
            render: (_req, record) => {
                return (
                    <div>
                        {symbol + numberWithCommas(record?.current_price?.toFixed(2))}
                    </div>
                )
            }
        },
        {
            title: '24h Change',
            dataIndex: 'current_price',
            key: 'current_price',
            render: (_req, record) => {
                const profit = record?.price_change_percentage_24h > 0;
                return (
                    <div
                        className={profit ? 'text-success d-flex' : 'text-danger d-flex'}
                    >
                        {profit ? <p className='indicator'>&#8673;</p> : <p className='indicator'>&#8675;</p>} {numberWithCommas(record?.price_change_percentage_24h?.toFixed(2))} %
                    </div >
                )
            }
        },
        {
            title: 'Market Cap',
            dataIndex: 'current_price',
            key: 'current_price',
            render: (_req, record) => {

                return (
                    <div >
                        {symbol}{" "}
                        {numberWithCommas(
                            record.market_cap?.toString().slice(0, -6)
                        )}M
                    </div>
                )
            }
        }



    ];
    return (
        <div>
            <div className='card'>
                <div className='card-body'>
                    <div className='filter-wrapper'>
                        <div className='search-box'>
                            <Search
                                placeholder="Search Coin"
                                allowClear
                                enterButton="Search"
                                size="large"
                                onSearch={onSearch}
                            />
                        </div>
                        <div className='currency-select'>
                            <Select
                                defaultValue={currency}
                                style={{ width: '100%' }}
                                className='currency-dropdown'
                                onChange={(e) => { setCurrency(e) }}
                            >
                                <Option value="INR">INR</Option>
                                <Option value="USD">USD</Option>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>

            <div className='card'>
                <div className='card-body'>
                    <Table
                        dataSource={coinList}
                        columns={columns}
                        onChange={handleTableChange}
                        pagination={pagination}
                        loading={loader}
                    />
                </div>
            </div>
        </div>


    );
}

export default CoinTable;