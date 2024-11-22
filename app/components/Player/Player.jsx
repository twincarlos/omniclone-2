import Details from "../Details/Details";

export default function Player({ player }) {
    return (
        <div className="player">
            <Details details={[player.rating]} />
            <div>{player.name}</div>
        </div>
    );
};