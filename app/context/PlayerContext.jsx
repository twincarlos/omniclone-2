"use client";
import { createContext, useState, useContext } from 'react';

const PlayerContext = createContext();

const PlayerProvider = ({ children }) => {
    const savedPlayerId = localStorage.getItem("playerId");
    const [playerId, setPlayerId] = useState(savedPlayerId);
    function savePlayerId(newPlayerId) {
        localStorage.setItem("playerId", JSON.stringify(newPlayerId));
        setPlayerId(newPlayerId);
    };

    return (
        <PlayerContext.Provider value={{ playerId, savePlayerId }}>
            {children}
        </PlayerContext.Provider>
    );
};

export default PlayerProvider;
export const usePlayer = () => useContext(PlayerContext);