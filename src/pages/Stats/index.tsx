import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { userDetails } from '../../store/reducers/userDetails';
import { useNavigate } from 'react-router-dom';

function stats() {
    let navigate = useNavigate();
    const userDetail = useSelector(userDetails);
    const [list, setList] = useState<string[]>([]);
    const [height, setHeight] = useState<number>(0);
    const transactionHash: string[] = [];

    const fetchTrasaction = async (address: string) => {
        axios
            .get(
                `https://api.etherscan.io/api?module=logs&action=getLogs&address=${userDetail}&fromBlock=12878196&toBlock=12878196&page=1&offset=1000&apikey=JGX7DR34N62IH85918WUP1K7EY8UTZYPDP`
            )
            .then((response) => {
                response?.data?.result?.map((val: { transactionHash: any }) =>
                    transactionHash.push(val.transactionHash)
                );
                if (transactionHash.length > 10) transactionHash.length = 10;
                setList([...transactionHash]);
            })
            .catch((err) => console.error(err));
    };

    const fetchHeight = async () => {
        const response = await axios.get(
            'https://api.covalenthq.com/v1/11297108109/block_v2/latest/?key=ckey_df4f3f58ddb4424a807a0fd6241'
        );
        response.data && setHeight(response?.data?.data?.items[0].height);
    };

    useEffect(() => {
        if (!userDetail) {
            return navigate('/');
        }
    }, []);

    useEffect(() => {
        fetchTrasaction(userDetail);
    }, [userDetail]);

    useEffect(() => {
        setInterval(() => {
            fetchHeight();
        }, 10000);
    }, [userDetail]);

    return (
        <>
            <div className="flex flex-col h-[90vh]">
                <div className="flex grow">
                    <div className="ml-2.5 mt-2.5 block p-6 max-w-sm bg-gray-400 rounded-lg border border-gray-200 shadow-md hover:bg-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Transaction Widget
                        </h5>
                        <div className="font-normal text-gray-700 dark:text-gray-400 justify-left">
                            <table className="table-auto">
                                {list.length > 0 ? (
                                    <>
                                        <thead>
                                            <tr>
                                                <th>Transaction Hash</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {list.map((val) => {
                                                return (
                                                    <tr>
                                                        <td>{val}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </>
                                ) : (
                                    <p> No recent transactions</p>
                                )}
                            </table>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row-reverse grow">
                    <div className="mr-2.5 mb-2.5 block p-6 max-w-sm bg-gray-400 rounded-lg border border-gray-200 shadow-md hover:bg-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Latest Etherium Block Height
                        </h5>
                        <div className="font-normal text-gray-700 dark:text-gray-400 justify-left">
                            <table className="table-auto">
                                <thead>
                                    <tr>
                                        <th>
                                            {!!height ? height : 'Loading...'}
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default stats;
