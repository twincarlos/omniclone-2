"use client";
import "./List.css";
import { useState } from "react";

export default function List({ children, max, indexed, reverseStyle }) {
    const [viewMore, setViewMore] = useState(false);
    return (
        <div className="list-container">
            <div className={`list ${reverseStyle ? "reversed" : ""}`}>
                {
                    children.map((child, idx) => ((max && idx < max ) || !max || viewMore) && (<div key={idx} className="list-item padding">{child}{indexed && <span className="index">{idx + 1}</span>}</div>))
                }
            </div>
            { (max && children.length > max) && <button className="margin secondary" onClick={() => setViewMore(!viewMore)}>View {viewMore ? "less" : "more"}</button> }
        </div>
    );
};