const readline = require("readline/promises").createInterface({
    input: process.stdin,
    output: process.stdout,
});

const characters = [
    { NOME: "Mario", VELOCIDADE: 4, MANOBRABILIDADE: 3, PODER: 3, PONTOS: 0 },
    { NOME: "Peach", VELOCIDADE: 3, MANOBRABILIDADE: 4, PODER: 2, PONTOS: 0 },
    { NOME: "Yoshi", VELOCIDADE: 2, MANOBRABILIDADE: 4, PODER: 3, PONTOS: 0 },
    { NOME: "Bowser", VELOCIDADE: 5, MANOBRABILIDADE: 2, PODER: 5, PONTOS: 0 },
    { NOME: "Luigi", VELOCIDADE: 3, MANOBRABILIDADE: 4, PODER: 4, PONTOS: 0 },
    { NOME: "Donkey Kong", VELOCIDADE: 2, MANOBRABILIDADE: 2, PODER: 5, PONTOS: 0 },
];

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random();
    return random < 0.33 ? "RETA" : random < 0.66 ? "CURVA" : "CONFRONTO";
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block}: ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function choosePlayerCharacter() {
    console.log("Escolha o seu personagem:");
    characters.forEach((char, index) => {
        console.log(`${index + 1}. ${char.NOME}`);
    });
    const choice = parseInt(await readline.question("Digite o número do personagem desejado: "));
    if (choice < 1 || choice > characters.length) {
        console.log("Escolha inválida. Tente novamente.");
        return choosePlayerCharacter();
    }
    return characters.splice(choice - 1, 1)[0];
}

async function chooseRandomCharacters(count) {
    return characters.sort(() => 0.5 - Math.random()).slice(0, count);
}

async function applyPenalty(player) {
    const penalties = [
        { name: "Bomba", points: -3 },
        { name: "Casco", points: -2 },
        { name: "Banana", points: -1 },
    ];
    const penalty = penalties[Math.floor(Math.random() * penalties.length)];
    player.PONTOS += penalty.points;
    console.log(`⚠️ ${player.NOME} sofreu uma penalidade: ${penalty.name} (${penalty.points} pontos)`);
}

async function handleConfrontBlock(players) {
    console.log("🔴 Bloco de Confronto! Todos competidores vão batalhar!");

    const results = players.map(async player => {
        const diceResult = await rollDice();
        const total = diceResult + player.PODER;
        console.log(`${player.NOME} 🎲 rolou no Confronto: ${diceResult} + ${player.PODER} = ${total}`);
        return { player, total };
    });

    const resolvedResults = await Promise.all(results);
    resolvedResults.sort((a, b) => b.total - a.total);

    const winner = resolvedResults[0];
    console.log(`\n⭐ ${winner.player.NOME} venceu o Confronto! ⭐`);

    for (const result of resolvedResults) {
        if (result.player !== winner.player) {
            if (Math.random() < 0.3) {
                await applyPenalty(result.player);
            }
        } else {
            result.player.PONTOS += 5; // Bonus para o vencedor
        }
    }
}

async function playRaceEngine(players, laps, isAutomatic) {
    for (let round = 1; round <= laps; round++) {
        if (!isAutomatic) {
            await readline.question(`Pressione Enter para iniciar a rodada ${round}: `);
        }

        console.log(`🏁 Rodada ${round}`);
        const block = await getRandomBlock();
        console.log(`Bloco: ${block}`);

        for (const player of players) {
            const diceResult = await rollDice();
            let totalTestSkill = 0;

            if (block === "RETA") {
                totalTestSkill = diceResult + player.VELOCIDADE;
                await logRollResult(player.NOME, "velocidade", diceResult, player.VELOCIDADE);
            } else if (block === "CURVA") {
                totalTestSkill = diceResult + player.MANOBRABILIDADE;
                await logRollResult(player.NOME, "manobrabilidade", diceResult, player.MANOBRABILIDADE);
            }
            player.PONTOS += totalTestSkill;

            // Chance de encontrar Turbo
            if (Math.random() < 0.2) {
                player.PONTOS += 5;
                console.log(`🚀 ${player.NOME} encontrou um TURBO e ganhou +5 pontos!`);
            }
        }

        if (block === "CONFRONTO") {
            await handleConfrontBlock(players);
        }

        console.log("-----------------------------");
    }
}

async function declareWinner(players, playerCharacter) {
    console.log("Resultado final:");
    players.forEach(player => {
        console.log(`${player.NOME}: ${player.PONTOS} ponto(s)`);
    });

    const winner = players.reduce((prev, curr) => (curr.PONTOS > prev.PONTOS ? curr : prev));
    console.log(`\n⭐ ${winner.NOME} venceu a corrida! 🏆`);

    if (winner === playerCharacter) {
        console.log("🎉 Parabéns, você venceu a corrida! 🎉");
    }
}

(async function main() {
    console.log("🏎️ Bem-vindo à corrida Mario Kart!\n");

    const numPlayers = parseInt(await readline.question("Quantos competidores irão participar? (2-6): "));
    if (numPlayers < 2 || numPlayers > 6) {
        console.log("Número de competidores inválido. Deve ser entre 2 e 6.");
        return main();
    }

    const playerCharacter = await choosePlayerCharacter();
    const randomCharacters = await chooseRandomCharacters(numPlayers - 1);

    const players = [playerCharacter, ...randomCharacters];
    console.log("Os competidores são:");
    players.forEach(player => console.log(`- ${player.NOME}`));

    const laps = parseInt(await readline.question("Escolha o número de voltas: "));
    const mode = await readline.question("Escolha o modo (1: Automático, 2: Semi-automático): ");

    await playRaceEngine(players, laps, mode === "1");
    await declareWinner(players, playerCharacter);

    readline.close();
})();
