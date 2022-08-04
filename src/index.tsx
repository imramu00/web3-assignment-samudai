import './styles/index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';

import configureAppStore, { getPreloadedState } from './store/configureStore';

import AppContextProvider from './contexts/AppContextProvider';

import { DemoPage, HomePage, Dashboard, Stats, NavBar } from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
(async () => {
    const preloadedState = getPreloadedState();

    const root = createRoot(document.getElementById('root'));

    root.render(
        <React.StrictMode>
            <ReduxProvider store={configureAppStore(preloadedState)}>
                <AppContextProvider>
                    <BrowserRouter>
                        <NavBar />
                        <Routes>
                            <Route path="/" element={<HomePage />}></Route>
                            <Route
                                path="/dashboard"
                                element={<Dashboard />}
                            ></Route>
                            <Route path="stats" element={<Stats />}></Route>
                        </Routes>
                    </BrowserRouter>
                </AppContextProvider>
            </ReduxProvider>
        </React.StrictMode>
    );
})();
