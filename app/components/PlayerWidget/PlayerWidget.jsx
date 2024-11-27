"use client";
import "./PlayerWidget.css";
import { useEffect, useState } from "react";
import { useModal } from "@/app/context/ModalContext";
import { usePlayer } from "@/app/context/PlayerContext";
import { useRatingCalculator } from "@/app/context/RatingCalculatorContext";
import PlayerLookup from "../PlayerLookup/PlayerLookup";

export default function PlayerWidget() {
    const { setContent } = useModal();
    const { playerId, savePlayerId } = usePlayer();
    const { updateMyRating } = useRatingCalculator();
    const [player, setPlayer] = useState(null);

    async function fetchPlayer() {
        if (playerId) {
            const res = await fetch(`https://omniclone-api.vercel.app/api/usatt/player-profile/${playerId}/test`);
            const data = await res.json();
            setPlayer(data);
        };
    };

    useEffect(() => {
        fetchPlayer();
    }, [playerId]);

    if (player) {
        return (
            <div className="player-widget">
                <img className="player-widget-img" alt="player-img" src={player.img} />
                <div className="player-widget-details">
                    <span>{player.name}</span>
                    <div className="player-widget-rating">
                        <span className="player-widget-current-rating">
                            {player.currentRating}
                        </span>
                        <span className={`player-widget-previous-rating ${player.ratingDifference > 0 ? "went-up" : "went-down"}`}>
                            {player.ratingDifference}
                        </span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <button onClick={() => {
            setContent(<PlayerLookup onClick={player => {
                savePlayerId(player.id);
                updateMyRating(player.rating);
                setContent(null);
            }} />);
        }}>
            <i className="fa-solid fa-link" /> Sync USATT
        </button>
    );
};