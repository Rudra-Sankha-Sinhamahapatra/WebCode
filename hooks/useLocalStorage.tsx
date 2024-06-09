import { useState, useEffect } from "react";

const PREFIX = 'webcode-';

export default function useLocalStorage(key: string, initialValue: any) {
    const prefixedKey = PREFIX + key;

    const [value, setValue] = useState(() => {
        if (typeof window === "undefined") {
            return initialValue;
        }

        const jsonValue = localStorage.getItem(prefixedKey);
        if (jsonValue != null) {
            return JSON.parse(jsonValue);
        }
        if (typeof initialValue === 'function') {
            return initialValue();
        } else {
            return initialValue;
        }
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem(prefixedKey, JSON.stringify(value));
        }
    }, [prefixedKey, value]);

    return [value, setValue];
}
