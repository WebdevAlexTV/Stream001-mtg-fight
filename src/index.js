import {Client} from "tmi.js";
import commands from "./commands";

const client = new Client({
	channels: [ 'webdevalex' ]
});

client.connect();

let fightModeActive = false;
let participants = [];
let cards = [];

client.on('message', (channel, tags, message, self) => {

    // Check if the broadcaster or mod is sending a message
    const isBroadcaster = channel.replace('#', '') === tags.username;
    const isMod = tags.mod;

    if(isBroadcaster || isMod) {
        // Start fight
        if(message === commands.start) {
            console.log("Start the fight");
            fightModeActive = true; 
            participants = [];
            loadMagicCards();
        }

        // End fight
        if(message === commands.end) {
            console.log("End the fight");
            fightModeActive = false;
            handleFight();
        }
    }

    // Participate
    if(fightModeActive && message === commands.participate) {
        if (participants.filter(item => item.username === tags.username).length === 0) {
            participants.push({
                username: tags.username,
                card: getRandomMagicCard()
            });
            console.log(tags.username, "participated");
        } else {
            console.log(tags.username, "tried to participate but is already in the fight!");
        }
    }
});
	
/**
 * Get a random magic card from our card collection,
 * 
 * @returns A random card
 */
const getRandomMagicCard = () => {
    const randomIndex = Math.floor(Math.random() * cards.length);

    if(cards[randomIndex].image === undefined) {
        return getRandomMagicCard();
    }

    return cards[randomIndex];
}

/**
 * Load the random magic cards.
 */
const loadMagicCards = async () => {
    const response = await fetch("https://api.magicthegathering.io/v1/cards?random=true");
    const data = await response.json();
    cards = [];

    data.cards.map(card => {
        cards.push({
            name: card.name,
            cmc: card.cmc,
            image: card.imageUrl
        });
    })
}

/**
 * Handles the fight.
 * 
 * @returns nothing man!
 */
const handleFight = () => {
    if(participants.length <= 1) {
        console.log("Too few participants. Try later man!")
        return;
    }

    let highstestCmc = 0;

    // Determine the highest cmc
    participants.forEach(participant => {
        if(participant.card.cmc > highstestCmc) {
            highstestCmc = participant.card.cmc;
        }
    });

    // Mark the winner users
    participants = participants.map(participant => {
        if(participant.card.cmc === highstestCmc) {
            participant.winner = true;
        }
        return participant;
    });

    const participantsElement = document.getElementById("participants");
    participantsElement.innerHTML = "";

    // Add the participants to the dom
    participants.forEach(participant => {
        const participantElement = document.createElement("div");
        participantElement.classList.add("participant");

        const nameElement = document.createElement("div");
        nameElement.classList.add("participant-name");
        nameElement.innerText = participant.username;
        participantElement.appendChild(nameElement);

        if(participant.winner) {
            const winnerElement = document.createElement("div");
            winnerElement.classList.add("participant-winner");
            winnerElement.innerText = "👑";
            participantElement.appendChild(winnerElement);
        }

        const cmcElement = document.createElement("div");
        cmcElement.classList.add("participant-cmc");
        cmcElement.innerText = participant.card.cmc;
        participantElement.appendChild(cmcElement);

        const imageElement = document.createElement("img");
        imageElement.classList.add("participant-image")
        imageElement.src = participant.card.image;
        participantElement.appendChild(imageElement);

        participantsElement.appendChild(participantElement);
    });

}