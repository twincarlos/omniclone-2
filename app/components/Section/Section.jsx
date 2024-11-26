import "./Section.css";
import List from "../List/List";

export default function Section({ header, items, max, indexed, buttons }) {
    return (
        <div>
            <div className="section-header">
                {header}
                <div className="section-header-buttons">
                    {buttons && buttons.map((button, idx) => <div key={idx}>{button}</div>)}
                </div>
            </div>
            <List indexed={indexed} max={max}>
                {items}
            </List>
        </div>
    )
};