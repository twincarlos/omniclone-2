"use client";
import { useState } from "react";
import "./List.css";

export default function List({ children, max, indexed }) {
    const [viewMore, setViewMore] = useState(false);
    return (
        <div className="list-container">
            <div className="list">
                {
                    children.map((child, idx) => ((max && idx < max ) || !max || viewMore) && (<div key={idx} className="list-item padding">{child}{indexed && <span className="index">{idx + 1}</span>}</div>))
                }
            </div>
            { (max && children.length >= 5) && <button className="margin secondary" onClick={() => setViewMore(!viewMore)}>View {viewMore ? "less" : "more"}</button> }
        </div>
    );
};