"use client";
import Link from "next/link";
import Card from "./components/Card/Card";
import { useState, useEffect } from "react";
import Section from "./components/Section/Section";
import Loading from "./components/Loading/Loading";
import Gallery from "./components/Gallery/Gallery";
import GroupTournament from "./components/GroupTournament/GroupTournament";

export default function Home() {
  const [groups, setGroups] = useState([]);
  const [keyword, setKeyword] = useState("");

  async function fetchGroups() {
    const res = await fetch("https://omniclone-api.vercel.app/api/omnipong/tournaments");
    const data = await res.json();
    setGroups(data);
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  if (groups.length === 0) return <Loading />;

  return (
    <main>
      <input className="search-bar" type="text" placeholder="Search tournaments" value={keyword} onChange={e => setKeyword(e.target.value)} />
      <Gallery>
        {
          groups.map((group, idx) => {
            const filteredTournaments = group.tournaments.filter(tournament =>
            (
              tournament.name.toLowerCase().includes(keyword.toLowerCase()) ||
              tournament.state.toLowerCase().includes(keyword.toLowerCase()) ||
              tournament.city.toLowerCase().includes(keyword.toLowerCase())
            ));

            if (filteredTournaments.length || !keyword) {
              return (
                <Card key={idx}>
                  <Section
                    max={5}
                    header={group.group}
                    items={group.tournaments.filter(tournament =>
                    (
                      tournament.name.toLowerCase().includes(keyword.toLowerCase()) ||
                      tournament.state.toLowerCase().includes(keyword.toLowerCase()) ||
                      tournament.city.toLowerCase().includes(keyword.toLowerCase())
                    )).map(tournament => (
                      <Link key={tournament.id} href={`/tournament/${tournament.id}`}>
                        <GroupTournament tournament={tournament} />
                      </Link>
                    ))} />
                </Card>
              );
            };

            return null;
          })
        }
      </Gallery>
    </main>
  );
};