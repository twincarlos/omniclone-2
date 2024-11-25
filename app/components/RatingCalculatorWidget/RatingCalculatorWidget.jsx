"use client";
import "./RatingCalculatorWidget.css";
import { useModal } from "@/app/context/ModalContext";
import { useRatingCalculator } from "@/app/context/RatingCalculatorContext";
import RatingCalculatorModal from "../RatingCalculator/RatingCalculator";

export default function RatingCalculatorWidget() {
    const { setContent } = useModal();
    const { myRating, updateMyRating } = useRatingCalculator();
    return (
        <div className="rating-calculator-widget">
            <button onClick={() => setContent(<RatingCalculatorModal />)}><i className="fa-solid fa-expand" /></button>
            <div className="rating-calculator-widget-details">
                <label>
                    <input type="number" value={myRating.preTournamentRating} onChange={e => updateMyRating(Number(e.target.value))} />
                    Initial Rating
                </label>
                <label><i className="fa-solid fa-arrow-right" /></label>
                <label>
                    <span>{myRating.postTournamentRating}</span>
                    Final Rating
                </label>
            </div>
        </div>
    );
};