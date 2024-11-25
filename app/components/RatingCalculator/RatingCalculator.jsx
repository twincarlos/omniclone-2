"use client";
import List from "../List/List";
import "./RatingCalculator.css";
import Player from "../Player/Player";
import NoData from "../NoData/NoData";
import { useRatingCalculator } from "@/app/context/RatingCalculatorContext";

export default function RatingCalculator() {
    const { matchResults, updateMatchResult, deleteMatchResult } = useRatingCalculator();
    const matchResultsArr = Object.values(matchResults);
    return (
        <div className="rating-calculator">
            {
                matchResultsArr.length > 0 ? (
                    <List>
                        {
                            Object.values(matchResults).map(matchResult => (
                                <div className="match-result" key={matchResult.id}>
                                    <Player player={matchResult} />
                                    <div className="rating-calculator-buttons">
                                        <button onClick={() => updateMatchResult({
                                            ...matchResult,
                                            outcome: "W"
                                        })} className={`${matchResult.outcome === "W" ? "active" : "inactive"} win`}>W</button>
                                        <button onClick={() => updateMatchResult({
                                            ...matchResult,
                                            outcome: "L"
                                        })} className={`${matchResult.outcome === "L" ? "active" : "inactive"} loss`}>L</button>
                                        <button onClick={() => deleteMatchResult(matchResult)}><i className="fa-solid fa-delete-left" /></button>
                                    </div>
                                </div>
                            ))
                        }
                    </List>
                ) : <NoData icon={<i className="fa-solid fa-magnifying-glass" />} message={"No match results"} />
            }
        </div>
    );
};