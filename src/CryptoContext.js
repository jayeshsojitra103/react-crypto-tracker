import React, { createContext, useContext, useEffect, useState } from "react";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
    const [currency, setCurrency] = useState("INR");
    const [symbol, setSymbol] = useState("₹");

    useEffect(() => {
        if (currency === "INR") {
            setSymbol("₹");
        }

        if (currency === "USD") {
            setSymbol("$");
        }
        console.log("currency", currency, symbol)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency]);


    return (
        <Crypto.Provider value={{ currency, setCurrency, symbol }}>
            {children}
        </Crypto.Provider>
    );
};

export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto);
};