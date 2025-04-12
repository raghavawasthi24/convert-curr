import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRates } from "../redux/slices/exchangeSlice";

const ConverterForm = () => {
    const dispatch = useDispatch();
    const { rates, base } = useSelector((state) => state.exchange);
    const [amount, setAmount] = useState(1);
    const [from, setFrom] = useState("USD");
    const [to, setTo] = useState("EUR");
    const [result, setResult] = useState(0);

    useEffect(() => {
        // console.log("Fetching rates...");
        dispatch(getRates());

        console.log("Fetched rates:", rates, base);
    }, [dispatch]);

    useEffect(() => {
        if (rates && rates[to] && rates[from]) {
            const converted = (amount / rates[from]) * rates[to];
            setResult(converted.toFixed(2));
        }
    }, [amount, from, to, rates]);

    const currencyOptions = Object.keys(rates);

    return (
    
        <div className="w-full flex items-center justify-between">
            <div className="border-1 py-2 px-4 rounded">
                <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="border-0 outline-none mr-1"
                />
                <select value={from} onChange={(e) => setFrom(e.target.value)} className="border-0 outline-none">
                    {currencyOptions.map((code) => (
                        <option key={code} value={code}>
                            {code}
                        </option>
                    ))}
                </select>
            </div>

            <span>---</span>

            <div className="border-1 py-2 px-4 rounded">
                <input
                    value={result}
                    // onChange={(e) => setAmount(e.target.value)}
                    className="border-0 outline-none mr-1"
                />
                <select value={to} onChange={(e) => setTo(e.target.value)} className="border-0 outline-none">
                    {currencyOptions.map((code) => (
                        <option key={code} value={code}>
                            {code}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default ConverterForm;
