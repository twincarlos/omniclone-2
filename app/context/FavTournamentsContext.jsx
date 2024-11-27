"use client";
import { createContext, useState, useContext, useEffect } from 'react';

const FavTournamentsContext = createContext();

const FavTournamentsProvider = ({ children }) => {
    const [favTournaments, setFavTournaments] = useState({});

    useEffect(() => {
        const savedFavTournaments = localStorage.getItem("favTournaments");
        if (savedFavTournaments) setFavTournaments(JSON.parse(savedFavTournaments));
    }, []);

    function saveFavTournament(tournament) {
        const savedFavTournaments = localStorage.getItem("favTournaments");
        const newSavedFavTournaments = savedFavTournaments ? { ...JSON.parse(savedFavTournaments) } : {};
        newSavedFavTournaments[tournament.id] = tournament;
        localStorage.setItem("favTournaments", JSON.stringify(newSavedFavTournaments));
        setFavTournaments(newSavedFavTournaments);
    };

    function removeFavTournament(tournament) {
        const savedFavTournaments = localStorage.getItem("favTournaments");
        const newSavedFavTournaments = savedFavTournaments ? { ...JSON.parse(savedFavTournaments) } : {};
        delete newSavedFavTournaments[tournament.id];
        localStorage.setItem("favTournaments", JSON.stringify(newSavedFavTournaments));
        setFavTournaments(newSavedFavTournaments);
    };

    return (
        <FavTournamentsContext.Provider value={{ favTournaments, saveFavTournament, removeFavTournament }}>
            {children}
        </FavTournamentsContext.Provider>
    );
};

export default FavTournamentsProvider;
export const useFavTournaments = () => useContext(FavTournamentsContext);