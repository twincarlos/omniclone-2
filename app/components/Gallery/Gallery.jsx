import "./Gallery.css";

export default function Gallery({ children }) {
    return (
        <div>
            <div className="gallery">
                {children}
            </div>
        </div>
    );
};