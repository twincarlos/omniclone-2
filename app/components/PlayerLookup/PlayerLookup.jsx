"use client";
import "./PlayerLookup.css";
import List from "../List/List";
import { useState } from "react";
import Player from "../Player/Player";

export default function PlayerLookup({ onClick }) {
    const [players, setPlayers] = useState([]);
    async function fetchPlayers(keyword) {
        if (keyword) {
            const res = await fetch(`https://omniclone-api.vercel.app/api/usatt/player-lookup/${keyword}/test`);
            const data = await res.json();
            setPlayers(data);
        } else {
            setPlayers([]);
        };
    };
    return (
        <div className="player-lookup">
            <input type="text" placeholder="Search players" onChange={e => fetchPlayers(e.target.value)} />
            <List>
                {
                    players.map(player =>
                    (
                        <div key={player.id} onClick={() => onClick(player)}>
                            <Player player={player} />
                        </div>
                    ))
                }
            </List>
        </div>
    );
};