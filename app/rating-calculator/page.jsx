"use client";
import "./RatingCalculator.css";
import { useModal } from "../context/ModalContext";
import PlayerLookup from "../components/PlayerLookup/PlayerLookup";
import { useRatingCalculator } from "../context/RatingCalculatorContext";
import RatingCalculator from "../components/RatingCalculator/RatingCalculator";
import RatingCalculatorWidget from "../components/RatingCalculatorWidget/RatingCalculatorWidget";

export default function RatingCalculatorHome() {
    const { setContent } = useModal();
    const { addMatchResult } = useRatingCalculator();
    return (
        <main>
            <button className="primary margin-top-bottom" onClick={() => {
                setContent(
                    <PlayerLookup onClick={player => {
                        addMatchResult({ name: player.name, rating: player.rating });
                        setContent(null);
                    }} />
                );
            }}><i className="fa-solid fa-plus" /> Add match result
            </button>
            <RatingCalculator />
            <RatingCalculatorWidget />
        </main>
    );
};