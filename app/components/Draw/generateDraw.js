export function generateDraw(players) {
    let L = players.length;
    let round = "";

    if (L > 32) {
        L = 64;
        round = "Round of 32";
    }
    else if (L > 16) {
        L = 32;
        round = "Round of 16";
    }
    else if (L > 8) {
        L = 16;
        round = "Round of 8";
    }
    else if (L > 4) {
        L = 8;
        round = "Quarter-finals";
    }
    else if (L > 2) {
        L = 4;
        round = "Semi-finals";
    }
    else if (L > 1) {
        L = 2;
        round = "Finals";
    }

    const perfectDraw = players.length === L;

    const isEven = n => n % 2 === 0;

    const indeces = [
        1,
        L / 2,
        (L / 4) + 1,
        L / 4,
        (L / 8) + 1,
        (L / (8 / 3)),
        (L / (8 / 3)) + 1,
        L / 8,
        (L / 16) + 1,
        (L / (16 / 7)),
        (L / (16 / 5)) + 1,
        (L / (16 / 3)),
        (L / (16 / 3)) + 1,
        (L / (16 / 5)),
        (L / (16 / 7)) + 1,
        L / 16,
        // HARD CODED
        3,
        30,
        19,
        14,
        11,
        22,
        27,
        6,
        7,
        26,
        23,
        10,
        15,
        18,
        31,
        2
    ];

    const draw = [];
    let flag = true;

    for (let i = 0; i < L / 2; i++) {
        const idx = indeces[i];
        const p1 = players[idx - 1];
        const p2 = players[(perfectDraw ? (isEven(idx) ? L - idx + 2 : L - idx) : L - idx + 1) - 1];
        draw.push(flag ? [p1,p2] : [p2, p1]);
        flag = !flag;
    };

    return { round, draw };
};