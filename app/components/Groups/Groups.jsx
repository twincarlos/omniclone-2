import "./Groups.css";
import Player from "../Player/Player";
import Section from "../Section/Section";
import Card from "../Card/Card";

export default function Groups({ players }) {
    function groupPlayers(players) {
        // Step 1: Sort players by rating in descending order
        players.sort((a, b) => b.rating - a.rating);

        // Step 2: Calculate number of groups needed
        const totalPlayers = players.length;
        const numGroups = Math.ceil(totalPlayers / 4);

        // Initialize groups array
        const groups = Array.from({ length: numGroups }, () => []);

        // Step 3: Distribute players using the "snake" pattern
        let direction = 1; // 1 for forward, -1 for backward
        let groupIndex = 0;

        players.forEach(player => {
            groups[groupIndex].push(player);

            // Move the groupIndex in the current direction
            groupIndex += direction;

            // Reverse direction if we reach the end or start of the groups
            if (groupIndex === numGroups || groupIndex === -1) {
                direction *= -1;
                groupIndex += direction;
            }
        });

        // Step 4: Return the groups
        return groups;
    };

    const groups = groupPlayers(players);
    return (
        <div className="groups">
            {
                groups.map((group, idx) => (
                    <Card key={idx}>
                        <Section
                            header={`Group ${idx + 1}`}
                            items={group.map((player, idx) => <Player key={idx} player={player} />)}
                        />
                    </Card>
                ))
            }
        </div>
    );
};