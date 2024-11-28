"use client";
import { createContext, useState, useContext, useEffect } from 'react';

const PlayerContext = createContext();

const PlayerProvider = ({ children }) => {
    const [playerId, setPlayerId] = useState(null);

    useEffect(() => {
        const savedPlayerId = localStorage.getItem("playerId");
        if (savePlayerId) setPlayerId(JSON.parse(savedPlayerId));
    }, []);

    function savePlayerId(newPlayerId) {
        localStorage.setItem("playerId", JSON.stringify(newPlayerId));
        setPlayerId(newPlayerId);
    };

    function removePlayerId() {
        localStorage.removeItem("playerId");
    };

    return (
        <PlayerContext.Provider value={{ playerId, savePlayerId, removePlayerId }}>
            {children}
        </PlayerContext.Provider>
    );
};

export default PlayerProvider;
export const usePlayer = () => useContext(PlayerContext);