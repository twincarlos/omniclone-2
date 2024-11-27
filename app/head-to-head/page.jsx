"use client";
import "./HeadToHead.css";
import { useState } from "react";
import Card from "../components/Card/Card";
import Match from "../components/Match/Match";
import Gallery from "../components/Gallery/Gallery";
import Player from "../components/Player/Player";
import { useModal } from "../context/ModalContext";
import PlayerLookup from "../components/PlayerLookup/PlayerLookup";

export default function HeadToHead() {
    const { setContent } = useModal();
    const [players, setPlayers] = useState({
        p1: null,
        p2: null
    });
    const [headToHeadData, setHeadToHeadData] = useState(null);
    async function fetchHeadToHeadData(p1Id, p2Id) {
        const res = await fetch(`https://omniclone-api.vercel.app/api/usatt/head-to-head/${p1Id}-${p2Id}`);
        const data = await res.json();
        setHeadToHeadData(data);
    };
    return (
        <main className="head-to-head">
            <Card>
                <div className="head-to-head-players">
                    <div className="head-to-head-player">
                        <button onClick={() => setContent(<PlayerLookup onClick={async player => {
                            setPlayers({ ...players, p1: player });
                            if (players.p2) fetchHeadToHeadData(player.id, players.p2.id);
                            setContent(null);
                        }} />)} className="primary">
                            <i className="fa-regular fa-user" /> Player 1
                        </button>
                        {players.p1 && <Player player={players.p1} />}
                    </div>
                    <div className="head-to-head-player">
                        <button onClick={() => setContent(<PlayerLookup onClick={player => {
                            setPlayers({ ...players, p2: player });
                            if (players.p1) fetchHeadToHeadData(players.p1.id, player.id);
                            setContent(null);
                        }} />)} className="primary">
                            <i className="fa-regular fa-user" /> Player 2
                        </button>
                        {players.p2 && <Player player={players.p2} />}
                    </div>
                </div>
                {
                    headToHeadData && (
                        <div className="margin-top-bottom head-to-head-score">
                            <span>{headToHeadData.p1.wins}</span>
                            -
                            <span>{headToHeadData.p2.wins}</span>
                        </div>
                    )
                }
            </Card>
            {
                headToHeadData && (
                    <Gallery>
                        {
                            headToHeadData.matches.map((match, idx) => (
                                <Card key={idx}>
                                    <Match  match={match} />
                                </Card>
                            ))
                        }
                    </Gallery>
                )
            }
        </main>
    );
};