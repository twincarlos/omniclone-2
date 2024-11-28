"use client";
import { createContext, useState, useContext, useEffect } from 'react';

const PlayerContext = createContext();

const PlayerProvider = ({ children }) => {
    const [player, setPlayer] = useState(null);

    async function fetchPlayer(playerId) {
        if (playerId) {
            const res = await fetch(`https://omniclone-api.vercel.app/api/usatt/player-profile/${JSON.parse(playerId)}`);
            const data = await res.json();
            setPlayer(data);
        } else {
            setPlayer(null);
        };
    };

    useEffect(() => {
        const savedPlayerId = localStorage.getItem("playerId");
        fetchPlayer(savedPlayerId);
    }, []);

    function savePlayer(newPlayerId) {
        localStorage.setItem("playerId", JSON.stringify(newPlayerId));
        fetchPlayer(newPlayerId);
    };

    function removePlayer() {
        localStorage.removeItem("playerId");
        fetchPlayer(null);
    };

    return (
        <PlayerContext.Provider value={{ player, savePlayer, removePlayer }}>
            {children}
        </PlayerContext.Provider>
    );
};

export default PlayerProvider;
export const usePlayer = () => useContext(PlayerContext);