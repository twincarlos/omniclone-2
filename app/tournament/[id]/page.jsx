"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Tabs from "@/app/components/Tabs/Tabs";
import Card from "@/app/components/Card/Card";
import List from "@/app/components/List/List";
import Player from "@/app/components/Player/Player";
import Gallery from "@/app/components/Gallery/Gallery";
import Section from "@/app/components/Section/Section";

export default function Tournament() {
    const { id } = useParams();
    const [tournament, setTournament] = useState(null);
    const [activeTab, setActiveTab] = useState("Players");
    const [playersKeyword, setPlayersKeyword] = useState("");
    const [eventsKeyword, setEventsKeyword] = useState("");

    async function fetchTournament() {
        const res = await fetch(`https://omniclone-api.vercel.app/api/omnipong/tournament/${id}`);
        const data = await res.json();
        setTournament(data);
    };

    function renderEvent(event, idx) {
        const filteredPlayers = playersKeyword ? event.players.filter(player => player.name.toLowerCase().includes(playersKeyword.toLowerCase())) : event.players;
        if (filteredPlayers.length > 0) {
            return (
                <Card key={idx}>
                    <Section indexed={true} header={event.name} items={filteredPlayers.map((player, idx) => <Player key={idx} player={player} />)} />
                </Card>
            );
        } else {
            return null;
        };
    };

    useEffect(() => {
        fetchTournament();
    }, []);

    if (!tournament) return <p>Loading...</p>;

    return (
        <main>
            <div>
                {tournament.name}
            </div>
            <div className="margin-top-bottom">
                <Tabs tabs={[
                    {
                        name: "Players",
                        onClickFunction: () => {
                            setActiveTab("Players");
                            setPlayersKeyword("");
                            setEventsKeyword("");
                        }
                    },
                    {
                        name: "Events",
                        onClickFunction: () => {
                            setActiveTab("Events");
                            setPlayersKeyword("");
                            setEventsKeyword("");
                        }
                    }
                ]} />
            </div>
            {
                activeTab === "Players" &&
                <div>
                    <input className="search-bar" type="text" placeholder="Search players" value={playersKeyword} onChange={e => setPlayersKeyword(e.target.value)} />
                    <List indexed={true}>
                        {
                            tournament.players.map((player, idx) => {
                                if (playersKeyword) {
                                    if (player.name.toLowerCase().includes(playersKeyword.toLowerCase())) {
                                        return <Player key={idx} player={player} />;
                                    } else {
                                        return null;
                                    };
                                } else {
                                    return <Player key={idx} player={player} />;
                                };
                            }).filter(Boolean)
                        }
                    </List>
                </div>
            }
            {
                activeTab === "Events" &&
                <div>
                    <div>
                        <input className="search-bar" type="text" placeholder="Search events" value={eventsKeyword} onChange={e => setEventsKeyword(e.target.value)} />
                        <input className="search-bar" type="text" placeholder="Search players" value={playersKeyword} onChange={e => setPlayersKeyword(e.target.value)} />
                    </div>
                    <Gallery>
                        {
                            tournament.events.map((event, idx) => {
                                if (eventsKeyword) {
                                    if (event.name.toLowerCase().includes(eventsKeyword.toLowerCase())) {
                                        return renderEvent(event, idx);
                                    } else {
                                        return null;
                                    };
                                } else {
                                    return renderEvent(event, idx);
                                };
                            })
                        }
                    </Gallery>
                </div>
            }
        </main>
    );
};