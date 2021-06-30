import {Client} from "tmi.js";
import commands from "./commands";
import Participant from "./participant";

const client = new Client({
	channels: [ 'webdevalex' ]
});

client.connect();

let fightModeActive = false;
let participants = [];
let cards = [];

const participantsContainer = document.getElementById("participants");

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
            setParticipantsContainerInnerHtml("Arena is open. Waiting for some brave warriors!");
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
        if (1==1 || participants.filter(item => item.username === tags.username).length === 0) {
            if(participants.length === 0) {
                setParticipantsContainerInnerHtml("");
            }
            const participant = new Participant(tags.username, getRandomMagicCard());
            participants.push(participant);
            participantsContainer.appendChild(participant.getWaitingElement());
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
            participant.setWinner();
        }
        return participant;
    });

    setParticipantsContainerInnerHtml("");

    // Add the participants to the dom
    participants.forEach(participant => {
        participantsContainer.appendChild(participant.getCardElement());
    });
}

const setParticipantsContainerInnerHtml = (content) => {
    participantsContainer.innerHTML = content;
}