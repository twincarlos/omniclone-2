import "./NoData.css";

export default function NoData({ icon, message }) {
    return (
        <div className="no-data">
            {icon}
            {message}
        </div>
    );
};