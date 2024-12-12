import "./Card.css";

export default function Card({ children, styleClass }) {
    return (
        <div className={`card ${styleClass || ""}`}>
            {children}
        </div>
    );
};