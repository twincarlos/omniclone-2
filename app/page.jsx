"use client";
import "./page.css";
import List from "./components/List/List";
import Card from "./components/Card/Card";
import { useState, useEffect } from "react";
import Section from "./components/Section/Section";
import Loading from "./components/Loading/Loading";
import Gallery from "./components/Gallery/Gallery";
import NoData from "./components/NoData/NoData";
import { useFavTournaments } from "./context/FavTournamentsContext";
import GroupTournament from "./components/GroupTournament/GroupTournament";

export default function Home() {
  const [groups, setGroups] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [viewFavTournaments, setViewFavTournaments] = useState(true);
  const { favTournaments, saveFavTournament, removeFavTournament } = useFavTournaments();

  async function fetchGroups() {
    const res = await fetch("https://omniclone-api.vercel.app/api/omnipong/tournaments");
    const data = await res.json();
    setGroups(data);
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  if (groups.length === 0) return <Loading />;

  const favTournamentsArr = Object.values(favTournaments);

  return (
    <main>
      <div className="favorite-tournaments margin-top-bottom">
        <Card>
          <button onClick={() => setViewFavTournaments(!viewFavTournaments)} className="margin-top-bottom">
            <i className={`fa-regular ${viewFavTournaments ? "fa-eye-slash" : "fa-eye"}`} /> {viewFavTournaments ? "Hide" : "View"} favorite tournaments
          </button>
          {
            viewFavTournaments && (
              favTournamentsArr.length > 0 ? (
                <List>
                  {favTournamentsArr.map(tournament => (
                    <div className="favorite-tournament" key={tournament.id}>
                      <button onClick={() => {
                        if (tournament.id in favTournaments) removeFavTournament(tournament);
                        else saveFavTournament(tournament);
                      }}>
                        <i className={`fa-solid fa-heart`} />
                      </button>
                      <GroupTournament tournament={tournament} />
                    </div>
                  ))}
                </List>
              ) : <NoData icon={<i className="fa-regular fa-heart" />} message={"No favorite tournaments"} />
            )
          }
        </Card>
      </div>
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
                      <div className="tournament" key={tournament.id}>
                        <GroupTournament tournament={tournament} />
                        <button onClick={() => {
                          if (tournament.id in favTournaments) removeFavTournament(tournament);
                          else saveFavTournament(tournament);
                        }}>
                          <i className={`fa-${tournament.id in favTournaments ? "solid" : "regular"} fa-heart`} />
                        </button>
                      </div>
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