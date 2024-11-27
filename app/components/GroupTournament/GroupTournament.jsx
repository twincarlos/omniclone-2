import "./GroupTournament.css";
import Details from "../Details/Details";
import Link from "next/link";

export default function GroupTournament({ tournament }) {
    return (
        <div className="group-tournament">
            <Details details={[
                tournament.status,
                tournament.city,
                tournament.date
            ]} />
            <Link href={`/tournament/${tournament.id}`} className="group-tournament-name">
                {tournament.name}
            </Link>
        </div>
    );
};