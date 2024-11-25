import "./Match.css";
import Details from "../Details/Details";

export default function Match({ match }) {
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
                    <span className="margin-top-bottom match-player-name"><i className="fa-solid fa-trophy" /> {match.winner.name}</span>
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
                    <span className="margin-top-bottom match-player-name">{match.loser.name}</span>
                </div>
            </div>
        </div>
    );
};