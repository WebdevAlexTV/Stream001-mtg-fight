import {getRandomEmoji} from "./emojis";

class Participant {
    constructor(username, card) {
        this.username = username;
        this.card = card;
        this.winner = false;
    }

    setWinner() {
        this.winner = true;
    }

    /**
     * Create the participant dom element.
     * 
     * @returns A dom element that represents a participant.
     */
    getCardElement() {
        const participantElement = document.createElement("div");
        participantElement.classList.add("participant");

        participantElement.appendChild(this.getNameElement());

        if(this.winner === true) {
            const winnerElement = document.createElement("div");
            winnerElement.classList.add("participant-winner");
            winnerElement.innerText = "👑";
            participantElement.appendChild(winnerElement);
        }

        const cmcElement = document.createElement("div");
        cmcElement.classList.add("participant-cmc");
        cmcElement.innerText = this.card.cmc;
        participantElement.appendChild(cmcElement);

        const imageElement = document.createElement("img");
        imageElement.classList.add("participant-image")
        imageElement.src = this.card.image;
        participantElement.appendChild(imageElement);

        return participantElement;
    }

    /**
     * Returns a waiting participant dom element.
     * @returns A dom element that represents a waiting participant.
     */
    getWaitingElement() {
        const participantElement = document.createElement("div");
        participantElement.classList.add("participant", "preview");

        participantElement.appendChild(this.getNameElement());

        const spinnerWrapper = document.createElement("div");
        spinnerWrapper.classList.add("spinner");

        const spinnerIconElement = document.createElement("div");
        spinnerIconElement.classList.add("spinner-icon");
        spinnerIconElement.innerHTML = getRandomEmoji();
        spinnerWrapper.appendChild(spinnerIconElement);

        participantElement.appendChild(spinnerWrapper);

        return participantElement;
    }

    /**
     * Returns a name dom element.
     * @returns A dom element which represents the username.
     */
    getNameElement() {
        const nameElement = document.createElement("div");
        nameElement.classList.add("participant-name");
        nameElement.innerText = this.username;

        return nameElement;
    }
}

export default Participant;