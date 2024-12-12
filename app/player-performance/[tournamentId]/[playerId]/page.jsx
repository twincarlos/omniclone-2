"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Loading from "@/app/components/Loading/Loading";
import Gallery from "@/app/components/Gallery/Gallery";
import Match from "@/app/components/Match/Match";
import Card from "@/app/components/Card/Card";

export default function PlayerPerformance() {
    const [data, setData] = useState(null);
    const { tournamentId, playerId } = useParams();

    async function fetchPlayerPerformance() {
        const res = await fetch(`https://omniclone-api.vercel.app/api/usatt/player-performance/${tournamentId}-${playerId}`);
        const data = await res.json();
        setData(data);
    };

    useEffect(() => {
        fetchPlayerPerformance();
    }, []);

    if (!data) return <Loading />;

    const { player, tournament, matches } = data;

    return (
        <main>
            <div className="margin-top-bottom">
                <Card>
                    <div>
                        <span>{tournament.date} - {tournament.name}</span>
                    </div>
                    <div className="margin-top-bottom">
                        <h1>{player.name}</h1>
                        <div>
                            {
                                player.adjustedRating ?
                                    <span>{player.preTournamentRating} <i className="fa-solid fa-arrow-right" /> {player.adjustedRating} <i className="fa-solid fa-arrow-right" /> {player.postTournamentRating}</span> :
                                    <span>{player.preTournamentRating} <i className="fa-solid fa-arrow-right" /> {player.postTournamentRating}</span>
                            }
                        </div>
                    </div>
                </Card>
            </div>
            <div>
                {
                    <Gallery>
                        {
                            matches.map((match, idx) => (
                                <Card styleClass={match.winner.id == playerId ? "winner" : "loser"} key={idx}>
                                    <Match match={match} />
                                </Card>
                            ))
                        }
                    </Gallery>
                }
            </div>
        </main>
    );
};