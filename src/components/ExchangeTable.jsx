import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRates } from "../redux/slices/exchangeSlice";

const ExchangeTable = () => {
    const dispatch = useDispatch();
    const { rates, base } = useSelector((state) => state.exchange);
    const topCurrencies = [
        "USD",
        "EUR",
        "GBP",
        "JPY",
        "CAD",
        "AUD",
        "CHF",
        "CNY",
        "INR",
        "NZD",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(getRates());
        }, 60000);
        return () => clearInterval(interval);
    }, [dispatch]);

    return (
        <table className="w-1/4 border p-4">
            <thead>
                <tr className="bg-gray-200 text-black">
                    <th className="p-2 text-left">Currency</th>
                    <th className="p-2 text-left">Rate (Base: {base})</th>
                </tr>
            </thead>
            <tbody>
                {topCurrencies.map((code) => (
                    <tr key={code} className="border-t">
                        <td className="p-2">{code}</td>
                        <td className="p-2">
                            {rates[code] ? rates[code].toFixed(2) : "..."}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ExchangeTable;
