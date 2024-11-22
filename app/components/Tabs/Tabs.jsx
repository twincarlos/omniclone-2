import "./Tabs.css";

export default function Tabs({ tabs }) {
    return (
        <div className="tabs">
            {
                tabs.map((tab, idx) => <button className="tab" key={idx} onClick={tab.onClickFunction}>{tab.name}</button>)
            }
        </div>
    );
};