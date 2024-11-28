"use client";
import "./PlayerWidget.css";
import { useModal } from "@/app/context/ModalContext";
import { usePlayer } from "@/app/context/PlayerContext";
import { useRatingCalculator } from "@/app/context/RatingCalculatorContext";
import PlayerLookup from "../PlayerLookup/PlayerLookup";

export default function PlayerWidget() {
    const { setContent } = useModal();
    const { player, savePlayer, removePlayer } = usePlayer();
    const { updateMyRating } = useRatingCalculator();

    if (player) {
        return (
            <div className="player-widget">
                    <button onClick={removePlayer} style={{ fontSize: 16 }}><i className="fa-regular fa-circle-xmark" /></button>
                <img className="player-widget-img" alt="player-img" src={player.img} />
                <div className="player-widget-details">
                    <span>{player.name}</span>
                    <div className="player-widget-rating">
                        <span className="player-widget-current-rating">
                            {player.currentRating}
                        </span>
                        {/* <span className={`player-widget-previous-rating ${player.ratingDifference > 0 ? "went-up" : "went-down"}`}>
                            {player.ratingDifference}
                        </span> */}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <button onClick={() => {
            setContent(<PlayerLookup onClick={player => {
                savePlayer(player.id);
                updateMyRating(player.rating);
                setContent(null);
            }} />);
        }}>
            <i className="fa-solid fa-link" /> Sync USATT
        </button>
    );
};