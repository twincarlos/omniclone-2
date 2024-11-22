import "./Section.css";
import List from "../List/List";

export default function Section({ header, items, max, indexed }) {
    return (
        <div>
            <div className="section-header">{header}</div>
            <List indexed={indexed} max={max}>
                {items}
            </List>
        </div>
    )
};