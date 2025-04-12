import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRates } from "../redux/slices/exchangeSlice";

const ConverterForm = () => {
    const dispatch = useDispatch();
    const { rates } = useSelector((state) => state.exchange);
    const [amountFrom, setAmountFrom] = useState(1);
    const [amountTo, setAmountTo] = useState(0);
    const [from, setFrom] = useState("USD");
    const [to, setTo] = useState("INR");
    const [lastEdited, setLastEdited] = useState("from");

    useEffect(() => {
        dispatch(getRates());
    }, [dispatch]);

    useEffect(() => {
        if (!rates[from] || !rates[to]) return;

        if (lastEdited === "from") {
            const converted = (amountFrom / rates[from]) * rates[to];
            setAmountTo(converted.toFixed(2));
        } else {
            const converted = (amountTo / rates[to]) * rates[from];
            setAmountFrom(converted.toFixed(2));
        }
    }, [amountFrom, amountTo, from, to, rates, lastEdited]);

    const currencyOptions = Object.keys(rates);

    return (
        <div className="w-full flex items-center justify-between">
            {/* From Currency */}
            <div className="border-1 py-2 px-4 rounded flex items-center gap-2">
                <input
                    value={amountFrom}
                    onChange={(e) => {
                        setAmountFrom(e.target.value);
                        setLastEdited("from");
                    }}
                    className="border-0 outline-none mr-1"
                />
                <select
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="border-0 outline-none"
                >
                    {currencyOptions.map((code) => (
                        <option key={code} value={code}>
                            {code}
                        </option>
                    ))}
                </select>
            </div>

            <span className="mx-4">⇄</span>

            {/* To Currency */}
            <div className="border-1 py-2 px-4 rounded flex items-center gap-2">
                <input
                    value={amountTo}
                    onChange={(e) => {
                        setAmountTo(e.target.value);
                        setLastEdited("to");
                    }}
                    className="border-0 outline-none mr-1"
                />
                <select
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="border-0 outline-none"
                >
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
