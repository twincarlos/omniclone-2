"use client";
import "./Tournament.css";
import Loading from "@/app/components/Loading/Loading";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Tabs from "@/app/components/Tabs/Tabs";
import Card from "@/app/components/Card/Card";
import List from "@/app/components/List/List";
import Draw from "@/app/components/Draw/Draw";
import Player from "@/app/components/Player/Player";
import Groups from "@/app/components/Groups/Groups";
import { useModal } from "@/app/context/ModalContext";
import Gallery from "@/app/components/Gallery/Gallery";
import Section from "@/app/components/Section/Section";
import { useRatingCalculator } from "@/app/context/RatingCalculatorContext";
import RatingCalculatorWidget from "@/app/components/RatingCalculatorWidget/RatingCalculatorWidget";

export default function Tournament() {
    const { id } = useParams();
    const { setContent } = useModal();
    const { addMatchResult } = useRatingCalculator();
    const [tournament, setTournament] = useState(null);
    const [activeTab, setActiveTab] = useState("Players");
    const [eventsKeyword, setEventsKeyword] = useState("");
    const [playersKeyword, setPlayersKeyword] = useState("");
    const [enableRatingCalculator, setEnableRatingCalculator] = useState(false);

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
                    <Section indexed={true} max={10} header={event.name} buttons={event.players.length >= 6 && [
                        <button key={1} onClick={() => setContent(<Groups players={event.players} />)}>Groups</button>,
                        <button key={2} onClick={() => setContent(<Draw players={event.players} />)}>Draw</button>
                    ]} items={filteredPlayers.map((player, idx) => (
                        <div key={idx} className="rating-calculator-player">
                            <Player player={player} />
                            {renderRatingCalculatorButtons(player)}
                        </div>
                    ))} />
                </Card>
            );
        } else {
            return null;
        };
    };

    function renderRatingCalculatorButtons(player) {
        if (enableRatingCalculator) {
            return (
                <div className="rating-calculator-buttons">
                    <button onClick={() => addMatchResult({
                        name: player.name,
                        rating: player.rating,
                        outcome: "W"
                    })} className="win">W</button>
                    <button onClick={() => addMatchResult({
                        name: player.name,
                        rating: player.rating,
                        outcome: "L"
                    })} className="loss">L</button>
                </div>
            );
        } else {
            return null;
        };
    };

    useEffect(() => {
        fetchTournament();
    }, []);

    if (!tournament) return <Loading />;

    return (
        <main>
            <h1>
                {tournament.name}
            </h1>
            <div className="margin-top-bottom">
                <Tabs tabs={[
                    {
                        name: "Players",
                        activeTab: activeTab,
                        onClickFunction: () => {
                            setActiveTab("Players");
                            setPlayersKeyword("");
                            setEventsKeyword("");
                        }
                    },
                    {
                        name: "Events",
                        activeTab: activeTab,
                        onClickFunction: () => {
                            setActiveTab("Events");
                            setPlayersKeyword("");
                            setEventsKeyword("");
                        }
                    }
                ]} />
            </div>
            <div>
                <label className="margin-top-bottom">
                    <input type="checkbox" value={enableRatingCalculator} onChange={e => setEnableRatingCalculator(!enableRatingCalculator)} checked={enableRatingCalculator} />
                    Enable rating calculator <i className="fa-solid fa-square-root-variable" />
                </label>
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
                                        return (
                                            <div className="rating-calculator-player" key={idx}>
                                                <Player player={player} />
                                                {renderRatingCalculatorButtons(player)}
                                            </div>
                                        );
                                    } else {
                                        return null;
                                    };
                                } else {
                                    return (
                                        <div className="rating-calculator-player" key={idx}>
                                            <Player player={player} />
                                            {renderRatingCalculatorButtons(player)}
                                        </div>
                                    );
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
            {enableRatingCalculator && <RatingCalculatorWidget />}
        </main>
    );
};