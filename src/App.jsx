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

    //REACt APP

    //document.addEventListener("ENABLE NOTIFIVATION")-->

    //bachground.js

    //CHROME EXTENSION

    //document.getEventLIstener("NABLE NOTIFIVATION", {

    // })

    return (
        <div className="w-full">
            <ConverterForm />
        </div>
    );
}

export default App;
