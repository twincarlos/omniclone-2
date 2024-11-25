import "./Player.css";
import Details from "../Details/Details";

export default function Player({ player }) {
    return (
        <div className="player">
            <Details details={[player.rating]} />
            <div className="player-name">{player.name}</div>
        </div>
    );
};