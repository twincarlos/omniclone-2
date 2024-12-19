"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Loading from "@/app/components/Loading/Loading";
import Gallery from "@/app/components/Gallery/Gallery";
import Match from "@/app/components/Match/Match";
import Card from "@/app/components/Card/Card";
import Player from "@/app/components/Player/Player";
import Stats from "@/app/components/Stats/Stats";

export default function PlayerPerformance() {
    const [data, setData] = useState(null);
    const [showMatches, setShowMatches] = useState(false);
    const [keyword, setKeyword] = useState("");
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

    const { player, tournament, matches, stats } = data;

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
            <div className="margin-top-bottom">
                <h1>Stats</h1>
                <Stats data={[
                    {
                        data: [{ value: stats.matchesWon }, { value: stats.matchesLost }],
                        name: "Matches W/L",
                        colors: ["green", "red"],
                        label: true
                    },
                    {
                        data: [{ value: stats.gamesWon }, { value: stats.gamesLost }],
                        name: "Games W/L",
                        colors: ["green", "red"],
                        label: true
                    },
                    {
                        data: [{ value: stats.pointsWon }, { value: stats.pointsLost }],
                        name: "Points W/L",
                        colors: ["green", "red"],
                        label: true
                    },
                    {
                        data: [{ value: stats.averageOpponentRating }],
                        name: `Avg Opp Rating: ${stats.averageOpponentRating}`,
                        colors: ["lightblue"],
                        label: false
                    }
                ]} />
                <Gallery>
                    {
                        stats.bestWin &&
                        <div>
                            <span>Best win</span>
                            <Card styleClass={"winner"}>
                                <Match hrefs={{
                                    winner: `/player-performance/${tournamentId}/${stats.bestWin.winner.id}`,
                                    loser: `/player-performance/${tournamentId}/${stats.bestWin.loser.id}`
                                }} match={stats.bestWin} />
                            </Card>
                        </div>
                    }
                    {
                        stats.worstLoss &&
                        <div>
                            <span>Worst loss</span>
                            <Card styleClass={"loser"}>
                                <Match hrefs={{
                                    winner: `/player-performance/${tournamentId}/${stats.worstLoss.winner.id}`,
                                    loser: `/player-performance/${tournamentId}/${stats.worstLoss.loser.id}`
                                }} match={stats.worstLoss} />
                            </Card>
                        </div>
                    }
                    <div>
                        <span>Closest match</span>
                        <Card styleClass={stats.closestMatch.match.winner.id == playerId ? "winner" : "loser"}>
                            <Match hrefs={{
                                winner: `/player-performance/${tournamentId}/${stats.closestMatch.match.winner.id}`,
                                loser: `/player-performance/${tournamentId}/${stats.closestMatch.match.loser.id}`
                            }} match={stats.closestMatch.match} />
                        </Card>
                    </div>
                    {
                        stats.mostFrequentPlayer && (
                            <div>
                                <span>Most frequent player</span>
                                <Card>
                                    <div>
                                        <Player player={stats.mostFrequentPlayer.player} />
                                        <span><b>W:</b> {stats.mostFrequentPlayer.wins} - <b>L:</b> {stats.mostFrequentPlayer.losses}</span>
                                    </div>
                                    <button onClick={() => setShowMatches(!showMatches)}><i className={`fa-regular fa-eye${showMatches ? "-slash" : ""}`} /> {showMatches ? "Hide" : "Show"} matches</button>
                                    <div className="margin-top-bottom">
                                        {showMatches && stats.mostFrequentPlayer.matches.map((match, idx) => <Card key={idx} styleClass={match.winner.id == playerId ? "winner" : "loser"}><Match hrefs={{
                                            winner: `/player-performance/${tournamentId}/${match.winner.id}`,
                                            loser: `/player-performance/${tournamentId}/${match.loser.id}`
                                        }} match={match} /></Card>)}
                                    </div>
                                </Card>
                            </div>
                        )
                    }
                </Gallery>
            </div>
            <div>
                <h1>Matches</h1>
                <input className="search-bar margin-top-bottom" type="text" placeholder="Search matches" value={keyword} onChange={e => setKeyword(e.target.value)} />
                {
                    <Gallery>
                        {
                            matches.filter(match => {
                                if (keyword) {
                                    if (match.eventName.toLowerCase().includes(keyword.toLowerCase())) return true;
                                    if (match.winner.id == playerId) {
                                        if (match.loser.name.toLowerCase().includes(keyword.toLowerCase())) return true;
                                    } else {
                                        if (match.winner.name.toLowerCase().includes(keyword.toLowerCase())) return true;
                                    };
                                    return false;
                                } else {
                                    return true;
                                };
                            }).map((match, idx) => (
                                <Card styleClass={match.winner.id == playerId ? "winner" : "loser"} key={idx}>
                                    <Match hrefs={{
                                        winner: `/player-performance/${tournamentId}/${match.winner.id}`,
                                        loser: `/player-performance/${tournamentId}/${match.loser.id}`
                                    }} match={match} />
                                </Card>
                            ))
                        }
                    </Gallery>
                }
            </div>
        </main>
    );
};