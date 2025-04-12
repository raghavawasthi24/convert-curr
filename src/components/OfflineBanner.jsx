import React from "react";

const OfflineBanner = () => {
    return !navigator.onLine ? (
        <div className="bg-red-300 text-black p-2 mb-4 rounded text-center">
            You are offline. Showing last known rates.
        </div>
    ) : null;
};

export default OfflineBanner;
