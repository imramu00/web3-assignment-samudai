import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ErrorBoundary } from '../../components';
import {
    userDetails,
    setUserAccount,
    removeUserAccount,
} from '../../store/reducers/userDetails';
declare var window: any;

const HomePage = () => {
    useEffect(() => {
        if (typeof window.ethereum !== 'undefined') {
            setMetamask(true);
        } else {
            setMetamask(false);
        }
    }, []);

    const [metamask, setMetamask] = useState<boolean>(false);
    const dispatch = useDispatch();
    const userDetail = useSelector(userDetails);
    const login = async () => {
        if (!!userDetail) {
            dispatch(removeUserAccount());
            return;
        }
        try {
            const requestResponse = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
            const account = requestResponse[0];
            dispatch(setUserAccount(account));
            await axios.post('https://dev-gcn.samudai.xyz/api/member/signup', {
                walletAddress: account,
                chainId: 1,
                member: {
                    did: '',
                },
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <ErrorBoundary>
            <div className="flex flex-col justify-center items-center h-screen">
                <div>{userDetail}</div>
                {metamask && (
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={login}
                    >
                        {!userDetail ? 'Login with Ethereium' : 'Logout'}
                    </button>
                )}
                {!metamask && <h1>setup and install Metamask</h1>}
            </div>
        </ErrorBoundary>
    );
};

export default HomePage;
