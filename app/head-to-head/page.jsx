"use client";
import "./HeadToHead.css";
import { useState } from "react";
import Card from "../components/Card/Card";
import List from "../components/List/List";
import Gallery from "../components/Gallery/Gallery";
import Player from "../components/Player/Player";
import { useModal } from "../context/ModalContext";
import Details from "../components/Details/Details";
import PlayerLookup from "../components/PlayerLookup/PlayerLookup";

export default function HeadToHead() {
    const { setContent } = useModal();
    const [players, setPlayers] = useState({
        p1: null,
        p2: null
    });
    const [headToHeadData, setHeadToHeadData] = useState(null);
    async function fetchHeadToHeadData(p1Id, p2Id) {
        const res = await fetch(`https://omniclone-api.vercel.app/api/usatt/head-to-head/${p1Id}-${p2Id}/test`);
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
                                    <div className="match">
                                        <Details
                                            details={[
                                                match.tournamentName,
                                                match.eventName,
                                                match.tournamentDate
                                            ]}
                                        />
                                        <div className="match-body">
                                            <div className="match-player match-winner">
                                                <span className="margin-top-bottom match-player-name"><i className="fa-solid fa-trophy" /> {match.winner.name}</span>
                                                <div className="match-scores">
                                                    {
                                                        match.winner.scores.map((score, idx) => (
                                                            <span className="match-score" key={idx}>{score}</span>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                            <div className="match-player match-loser">
                                                <div className="match-scores">
                                                    {
                                                        match.loser.scores.map((score, idx) => (
                                                            <span className="match-score" key={idx}>{score}</span>
                                                        ))
                                                    }
                                                </div>
                                                <span className="margin-top-bottom match-player-name">{match.loser.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))
                        }
                    </Gallery>
                )
            }
        </main>
    );
};