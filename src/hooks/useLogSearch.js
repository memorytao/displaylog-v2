import { useState, useCallback } from "react";
import { fetchLogs } from "../services/logService";

const TIMEOUT_DURATION = 60000; // 60 sec

export const useLogSearch = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchLogs = useCallback(async (params) => {
        setIsLoading(true);
        setError(null);
        setData(null); // clear previous data

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_DURATION);

        try {
            
            const result = await fetchLogs(params, controller.signal);
            setData(result);
        } catch (err) {
            if (err.name === 'AbortError') {
                alert("Connection Timed Out! Please try again.");
            } else {
                console.error("API error:", err);
                setError(err.message);
                alert(`Something went wrong: ${err.message}`);
            }
        } finally {
            clearTimeout(timeoutId);
            setIsLoading(false);
        }
    }, []);

    const clearData = () => {
        setData(null);
        setError(null);
    };

    return { data, isLoading, error, searchLogs, clearData };
};