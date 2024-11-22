import "./Details.css";

export default function Details({ details }) {
    if (!details) return null;
    return (
        <div className="details">
            { details.map((detail, idx) => <span key={idx}>{detail}</span>) }
        </div>
    );
};