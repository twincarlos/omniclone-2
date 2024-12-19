"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Loading from "@/app/components/Loading/Loading";
import Player from "@/app/components/Player/Player";
import Card from "@/app/components/Card/Card";
import List from "@/app/components/List/List";
import Details from "@/app/components/Details/Details";
import Link from "next/link";

export default function PlayerProfile() {
    const { id } = useParams();
    const [keyword, setKeyword] = useState("");
    const [data, setData] = useState(null);

    async function fetchPlayer() {
        const res = await fetch(`https://omniclone-api.vercel.app/api/usatt/player-tournaments/${id}`, {
            cache: "force-cache",
            next: { revalidate: 900 }
        });
        const data = await res.json();
        setData(data);
    };

    useEffect(() => {
        fetchPlayer();
    }, []);

    if (!data) return <Loading />;

    const { player, tournaments } = data;

    return (
        <main>
            <Card>
                <Player player={{ name: player.name, rating: tournaments[0].finalRating }} />
            </Card>
            <input className="search-bar margin-top-bottom" type="text" placeholder="Search tournaments" value={keyword} onChange={e => setKeyword(e.target.value)} />
            <List>
                {
                    tournaments.filter(tournament => keyword ? tournament.name.toLowerCase().includes(keyword.toLowerCase()) : true).map(tournament => (
                        <div key={tournament.id}>
                            <Details details={[tournament.date, tournament.initialRating, tournament.finalRating]} />
                            <Link href={`/player-performance/${tournament.id}/${id}`}>{tournament.name}</Link>
                        </div>
                    ))
                }
            </List>
        </main>
    );
};