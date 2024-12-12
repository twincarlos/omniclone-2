import "./Match.css";
import Details from "../Details/Details";
import Link from "next/link";

export default function Match({ match, hrefs }) {
    return (
        <div className="match">
            <Details
                details={[
                    match.tournamentName,
                    match.eventName,
                    match.tournamentDate
                ]}
            />
            <div className="match-body">
                <div className="match-player match-winner">
                    {
                        hrefs ?
                        <Link href={hrefs.winner} className="margin-top-bottom match-player-name"><i className="fa-solid fa-trophy" /> {match.winner.name} <span className="player-rating">{match.winner.rating}</span></Link> :
                        <div className="margin-top-bottom match-player-name"><i className="fa-solid fa-trophy" /> {match.winner.name} <span className="player-rating">{match.winner.rating}</span></div>
                    }
                    <div className="match-scores">
                        {
                            match.winner.scores.map((score, idx) => (
                                <span className={`match-score ${match.loser.scores[idx] > score ? "loser-score" : "winner-score"}`} key={idx}>{score}</span>
                            ))
                        }
                    </div>
                </div>
                <div className="match-player match-loser">
                    <div className="match-scores">
                        {
                            match.loser.scores.map((score, idx) => (
                                <span className={`match-score ${match.winner.scores[idx] > score ? "loser-score" : "winner-score"}`} key={idx}>{score}</span>
                            ))
                        }
                    </div>
                    {
                        hrefs ?
                        <Link href={hrefs.loser} className="margin-top-bottom match-player-name">{match.loser.name} <span className="player-rating">{match.loser.rating}</span></Link> :
                        <span className="margin-top-bottom match-player-name">{match.loser.name} <span className="player-rating">{match.loser.rating}</span></span>
                        
                    }
                </div>
            </div>
        </div>
    );
};