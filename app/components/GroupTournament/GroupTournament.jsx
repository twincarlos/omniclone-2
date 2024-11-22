import "./GroupTournament.css";
import Details from "../Details/Details";

export default function GroupTournament({ tournament }) {
    return (
        <div className="group-tournament">
            <Details details={[
                tournament.status,
                tournament.city,
                tournament.date
            ]} />
            <div className="group-tournament-name">
                {tournament.name}
            </div>
        </div>
    );
};