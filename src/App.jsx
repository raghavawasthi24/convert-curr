import React, { useEffect } from "react";

import OfflineBanner from "./components/OfflineBanner";
import ConverterForm from "./components/ConverterForm";
import TrendChart from "./components/TrendChart";
import ExchangeTable from "./components/ExchangeTable";

function App() {
    useEffect(() => {
        const handleOnline = () => alert("Back online!");
        const handleOffline = () =>
            alert("You are offline. Showing cached data.");

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    return (
        <div className="w-full">
            <OfflineBanner />
            <h1 className="text-6xl font-bold text-center m-12">
                Currency Converter
            </h1>

            <div className="flex gap-4 mt-22">
                <div className="flex flex-col gap-8 w-3/4 p-4">
                    <ConverterForm />
                    <TrendChart />
                </div>
                <ExchangeTable />
            </div>
        </div>
    );
}

export default App;
