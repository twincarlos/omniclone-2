"use client";
import { createContext, useState, useContext, useEffect } from 'react';

const RatingCalculatorContext = createContext();

const RatingCalculatorProvider = ({ children }) => {
    const [matchResults, setMatchResults] = useState({});
    const [myRating, setMyRating] = useState({
        preTournamentRating: 0,
        postTournamentRating: 0
    });

    useEffect(() => {
        const savedPlayer = localStorage.getItem("player");
        const savedRating = localStorage.getItem("myRating");
        const savedMatchResults = localStorage.getItem("matchResults");

        if (savedRating) setMyRating(JSON.parse(savedRating));
        if (savedMatchResults) setMatchResults(JSON.parse(savedMatchResults));
        else if (savedPlayer) setMyRating({
            preTournamentRating: JSON.parse(savedPlayer.rating),
            postTournamentRating: JSON.parse(savedPlayer.rating)
        });
    }, []);

    function determinePointWinLoss(myRating, playerRating, outcome) {
        const pointsDifference = Math.abs((myRating || 0) - playerRating);
        if (outcome === "W") {
            if ((myRating || 0) >= playerRating) {
                if (pointsDifference >= 0 && pointsDifference <= 12) {
                    return 8;
                }
                else if (pointsDifference >= 13 && pointsDifference <= 37) {
                    return 7;
                }
                else if (pointsDifference >= 38 && pointsDifference <= 62) {
                    return 6;
                }
                else if (pointsDifference >= 63 && pointsDifference <= 87) {
                    return 5;
                }
                else if (pointsDifference >= 88 && pointsDifference <= 112) {
                    return 4;
                }
                else if (pointsDifference >= 113 && pointsDifference <= 137) {
                    return 3;
                }
                else if (pointsDifference >= 138 && pointsDifference <= 162) {
                    return 2;
                }
                else if (pointsDifference >= 163 && pointsDifference <= 187) {
                    return 2;
                }
                else if (pointsDifference >= 188 && pointsDifference <= 212) {
                    return 1;
                }
                else if (pointsDifference >= 213 && pointsDifference <= 237) {
                    return 1;
                }
                else {
                    return 0;
                }
            }
            else {
                if (pointsDifference >= 0 && pointsDifference <= 12) {
                    return 8;
                }
                else if (pointsDifference >= 13 && pointsDifference <= 37) {
                    return 10;
                }
                else if (pointsDifference >= 38 && pointsDifference <= 62) {
                    return 13;
                }
                else if (pointsDifference >= 63 && pointsDifference <= 87) {
                    return 16;
                }
                else if (pointsDifference >= 88 && pointsDifference <= 112) {
                    return 20;
                }
                else if (pointsDifference >= 113 && pointsDifference <= 137) {
                    return 25;
                }
                else if (pointsDifference >= 138 && pointsDifference <= 162) {
                    return 30;
                }
                else if (pointsDifference >= 163 && pointsDifference <= 187) {
                    return 35;
                }
                else if (pointsDifference >= 188 && pointsDifference <= 212) {
                    return 40;
                }
                else if (pointsDifference >= 213 && pointsDifference <= 237) {
                    return 45;
                }
                else {
                    return 50;
                }
            };
        }
        else if (outcome === "L") {
            if ((myRating || 0) >= playerRating) {
                if (pointsDifference >= 0 && pointsDifference <= 12) {
                    return -8;
                }
                else if (pointsDifference >= 13 && pointsDifference <= 37) {
                    return -10;
                }
                else if (pointsDifference >= 38 && pointsDifference <= 62) {
                    return -13;
                }
                else if (pointsDifference >= 63 && pointsDifference <= 87) {
                    return -16;
                }
                else if (pointsDifference >= 88 && pointsDifference <= 112) {
                    return -20;
                }
                else if (pointsDifference >= 113 && pointsDifference <= 137) {
                    return -25;
                }
                else if (pointsDifference >= 138 && pointsDifference <= 162) {
                    return -30;
                }
                else if (pointsDifference >= 163 && pointsDifference <= 187) {
                    return -35;
                }
                else if (pointsDifference >= 188 && pointsDifference <= 212) {
                    return -40;
                }
                else if (pointsDifference >= 213 && pointsDifference <= 237) {
                    return -45;
                }
                else {
                    return -50;
                }
            }
            else {
                if (pointsDifference >= 0 && pointsDifference <= 12) {
                    return -8;
                }
                else if (pointsDifference >= 13 && pointsDifference <= 37) {
                    return -7;
                }
                else if (pointsDifference >= 38 && pointsDifference <= 62) {
                    return -6;
                }
                else if (pointsDifference >= 63 && pointsDifference <= 87) {
                    return -5;
                }
                else if (pointsDifference >= 88 && pointsDifference <= 112) {
                    return -4;
                }
                else if (pointsDifference >= 113 && pointsDifference <= 137) {
                    return -3;
                }
                else if (pointsDifference >= 138 && pointsDifference <= 162) {
                    return -2;
                }
                else if (pointsDifference >= 163 && pointsDifference <= 187) {
                    return -2;
                }
                else if (pointsDifference >= 188 && pointsDifference <= 212) {
                    return -1;
                }
                else if (pointsDifference >= 213 && pointsDifference <= 237) {
                    return -1;
                }
                else {
                    return 0;
                }
            };
        };
        return 0;
    };
    function calculateRating(rating, newMatchResults) {
        const matchResultsArr = Object.values(newMatchResults || matchResults);
        let total = rating || myRating.preTournamentRating;
        matchResultsArr.forEach(player => total += determinePointWinLoss(rating || myRating.preTournamentRating, player.rating, player.outcome));
        const newRating = {
            preTournamentRating: rating || myRating.preTournamentRating,
            postTournamentRating: matchResultsArr.length ? total : (rating || myRating.preTournamentRating)
        };
        setMyRating(newRating);
        localStorage.setItem("myRating", JSON.stringify(newRating));
    };
    function addMatchResult(newMatchResult) {
        const id = Math.ceil(Math.random() * 1000);
        const newMatchResults = {
            ...matchResults,
            [id]: {
                ...newMatchResult,
                id
            }
        };
        localStorage.setItem("matchResults", JSON.stringify(newMatchResults));
        setMatchResults(newMatchResults);
        calculateRating(null, newMatchResults);
    };
    function updateMatchResult(matchResult) {
        const newMatchResults = {
            ...matchResults,
            [matchResult.id]: {
                ...matchResult
            }
        };
        localStorage.setItem("matchResults", JSON.stringify(newMatchResults));
        setMatchResults(newMatchResults);
        calculateRating(null, newMatchResults);
    };
    function deleteMatchResult(matchResult) {
        const newMatchResults = {
            ...matchResults
        };
        delete newMatchResults[matchResult.id];
        localStorage.setItem("matchResults", JSON.stringify(newMatchResults));
        setMatchResults(newMatchResults);
        calculateRating(null, newMatchResults);
    };
    function updateMyRating(newRating) {
        calculateRating(newRating, null);
    };

    return (
        <RatingCalculatorContext.Provider value={{ matchResults, myRating, addMatchResult, updateMatchResult, deleteMatchResult, updateMyRating, determinePointWinLoss }}>
            {children}
        </RatingCalculatorContext.Provider>
    );
};

export default RatingCalculatorProvider;
export const useRatingCalculator = () => useContext(RatingCalculatorContext);