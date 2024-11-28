import "./NoData.css";

export default function NoData({ icon, message }) {
    return (
        <div className="padding-x2 no-data">
            {icon}
            {message}
        </div>
    );
};