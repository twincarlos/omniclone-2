import "./Draw.css";
import { generateDraw } from "./generateDraw";
import Player from "../Player/Player";
import List from "../List/List";

export default function Draw({ players }) {
    function groupPlayers(players) {
        // Step 1: Sort players by rating in descending order
        players.sort((a, b) => b.rating - a.rating);

        // Step 2: Calculate number of groups needed
        const totalPlayers = players.length;
        const numGroups = Math.ceil(totalPlayers / 4);

        // Step 3: Distribute players using the "snake" pattern
        let direction = 1; // 1 for forward, -1 for backward
        let groupIndex = 0;
        let round = 1;

        const firstSeeds = [];
        const secondSeeds = [];

        for (const player of players) {
            if (round === 1) {
                firstSeeds.push(player);
            } else if (round === 2) {
                secondSeeds.push(player);
            } else {
                break;
            };

            groupIndex += direction;

            // Reverse direction if we reach the end or start of the groups
            if (groupIndex === numGroups || groupIndex === -1) {
                direction *= -1;
                groupIndex += direction;
                round++;
            }
        };

        return [...firstSeeds, ...secondSeeds];
    };
    const groupedPlayers = groupPlayers(players);
    const { round, draw } = generateDraw(groupedPlayers);
    return (
        <div className="draw-container">
            <span>{round}</span>
            <div className="draw">
                {
                    draw.map((match, idx) => (
                        <div className="draw-match" key={idx}>
                            <List reverseStyle={idx % 2 === 0}>
                                { match[0] ? <Player key={1} player={match[0]} /> : <span key={2}>BYE</span> }
                                { match[1] ? <Player key={3} player={match[1]} /> : <span key={4}>BYE</span> }
                            </List>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};