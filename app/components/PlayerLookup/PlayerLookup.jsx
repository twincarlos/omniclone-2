"use client";
import "./PlayerLookup.css";
import List from "../List/List";
import { useState, useCallback } from "react";
import Player from "../Player/Player";
import NoData from "../NoData/NoData";
import Loading from "../Loading/Loading";
import { debounce } from "lodash";


export default function PlayerLookup({ onClick }) {
    const [players, setPlayers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const debouncedFetch = useCallback(
        debounce(async keyword => {
            if (keyword) {
                setIsLoading(true);
                const res = await fetch(`https://omniclone-api.vercel.app/api/usatt/player-lookup/${keyword}`);
                const data = await res.json();
                setPlayers(data);
                setIsLoading(false);
            } else {
                setPlayers([]);
            };
        }, 1000), []);
    return (
        <div className="player-lookup">
            <input type="text" placeholder="Search players" onChange={e => debouncedFetch(e.target.value)} />
            {
                isLoading ? <Loading /> : (
                    players.length > 0 ? (
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
                    ) : <NoData icon={<i className="fa-solid fa-magnifying-glass" />} message={"No results"} />
                )
            }
        </div>
    );
};