import React, { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import axios from "axios";

const TrendChart = () => {
    const [data, setData] = useState([]);
    const currency = "EUR";

    useEffect(() => {
        const fetchData = async () => {
            const API_KEY = import.meta.env.VITE_EXCHANGE_API_KEY;
            const today = new Date();
            const dates = [...Array(7).keys()]
                .map((i) => {
                    const d = new Date();
                    d.setDate(today.getDate() - i);
                    const yyyy = d.getFullYear();
                    const mm = String(d.getMonth() + 1).padStart(2, "0");
                    const dd = String(d.getDate()).padStart(2, "0");
                    return `${yyyy}/${mm}/${dd}`;
                })
                .reverse();

            const result = await Promise.all(
                dates.map(async (formattedDate, index) => {
                    const d = new Date();
                    d.setDate(today.getDate() - (6 - index));
                    const isoDate = d
                        .toISOString()
                        .split("T")[0]
                        .split("-")
                        .join("/");
                    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/history/USD/${isoDate}`;
                    try {
                        const res = await axios.get(url);
                        return {
                            date: formattedDate,
                            rate: res.data.conversion_rates[currency],
                        };
                    } catch {
                        return { date: formattedDate, rate: null };
                    }
                })
            );

            setData(result);
        };

        fetchData();
    }, []);

    return (
        <div className="bg-white mt-4 p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">
                7-Day Trend (USD to {currency})
            </h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={["auto", "auto"]} />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="rate"
                        stroke="#8884d8"
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TrendChart;
