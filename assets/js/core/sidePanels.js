import { pickRandom, shuffleArray, relativeTimestamp } from "../utils/random.js";

export class SidePanels {
    constructor(elements, {
        intervalScale,
        chaosLevels,
        loreLines,
        briefingLines,
        forecastEntries,
        chatLines,
        maxChatLines
    }) {
        this.chaosBar = elements.chaosBar;
        this.chaosLabel = elements.chaosLabel;
        this.loreList = elements.loreList;
        this.briefingList = elements.briefingList;
        this.forecastList = elements.forecastList;
        this.chatStream = elements.chatStream;

        this.intervalScale = intervalScale;
        this.chaosLevels = chaosLevels;
        this.loreLines = loreLines;
        this.briefingLines = briefingLines;
        this.forecastEntries = forecastEntries;
        this.chatLines = chatLines;
        this.maxChatLines = maxChatLines;

        this.chatTimer = null;
        this.previousChatHandle = null;
    }

    init() {
        const hasAny = Boolean(
            this.chaosBar ||
            this.loreList ||
            this.briefingList ||
            this.forecastList ||
            this.chatStream
        );

        if (!hasAny) {
            return;
        }

        const scale = this.intervalScale || 1;

        if (this.chaosBar && this.chaosLabel && this.chaosLevels && this.chaosLevels.length > 0) {
            this.updateChaos();
            window.setInterval(() => this.updateChaos(), Math.round(9000 * scale));
        }

        if (this.loreList && this.loreLines && this.loreLines.length > 0) {
            this.updateLore();
            window.setInterval(() => this.updateLore(), Math.round(16000 * scale));
        }

        if (this.briefingList && this.briefingLines && this.briefingLines.length > 0) {
            this.updateBriefings();
            window.setInterval(() => this.updateBriefings(), Math.round(20000 * scale));
        }

        if (this.forecastList && this.forecastEntries && this.forecastEntries.length > 0) {
            this.updateForecast();
            window.setInterval(() => this.updateForecast(), Math.round(18000 * scale));
        }

        if (this.chatStream && this.chatLines && this.chatLines.length > 0) {
            this.seedChat();
            const chatInterval = Math.round(5000 * scale);
            this.chatTimer = window.setInterval(() => this.pushChat(false), chatInterval);
        }
    }

    updateChaos() {
        if (!this.chaosBar || !this.chaosLabel || !this.chaosLevels || this.chaosLevels.length === 0) {
            return;
        }
        const entry = pickRandom(this.chaosLevels);
        this.chaosBar.style.width = entry.level + "%";
        this.chaosLabel.textContent = entry.label;
    }

    updateLore() {
        if (!this.loreList || !this.loreLines || this.loreLines.length === 0) {
            return;
        }
        const items = shuffleArray(this.loreLines).slice(0, 4);
        this.renderList(this.loreList, items);
    }

    updateBriefings() {
        if (!this.briefingList || !this.briefingLines || this.briefingLines.length === 0) {
            return;
        }
        const items = shuffleArray(this.briefingLines).slice(0, 4);
        this.renderList(this.briefingList, items);
    }

    updateForecast() {
        if (!this.forecastList || !this.forecastEntries || this.forecastEntries.length === 0) {
            return;
        }
        this.forecastList.innerHTML = "";
        const items = shuffleArray(this.forecastEntries).slice(0, 2);
        items.forEach((entry) => {
            const li = document.createElement("li");
            const label = document.createElement("span");
            label.className = "label";
            label.textContent = entry.heading;
            li.appendChild(label);

            const details = document.createElement("span");
            details.className = "details";
            details.textContent = entry.description;
            li.appendChild(details);

            this.forecastList.appendChild(li);
        });
    }

    seedChat() {
        this.chatStream.innerHTML = "";
        for (let index = 0; index < 2; index += 1) {
            this.pushChat(true);
        }
    }

    pushChat(initial) {
        if (!this.chatStream || !this.chatLines || this.chatLines.length === 0) {
            return;
        }
        const entry = this.pickChat();
        if (!entry) {
            return;
        }

        const line = this.buildChatLine(entry);
        if (!initial) {
            line.classList.add("recent");
            window.setTimeout(() => line.classList.remove("recent"), 1400);
        }

        this.chatStream.insertBefore(line, this.chatStream.firstChild);
        while (this.chatStream.childElementCount > (this.maxChatLines || 2)) {
            const lastChild = this.chatStream.lastElementChild;
            if (lastChild) {
                lastChild.remove();
            } else {
                break;
            }
        }
    }

    pickChat() {
        if (!this.chatLines || this.chatLines.length === 0) {
            return null;
        }
        let choice = pickRandom(this.chatLines);
        let attempts = 0;
        while (choice.handle === this.previousChatHandle && attempts < 4) {
            choice = pickRandom(this.chatLines);
            attempts += 1;
        }
        this.previousChatHandle = choice.handle;
        return choice;
    }

    buildChatLine(entry) {
        const line = document.createElement("div");
        line.className = "chat-line";

        const handle = document.createElement("span");
        handle.className = "handle";
        handle.textContent = entry.handle;
        line.appendChild(handle);

        const message = document.createElement("span");
        message.className = "message";
        message.textContent = entry.message;
        line.appendChild(message);

        const timestamp = document.createElement("span");
        timestamp.className = "timestamp";
        timestamp.textContent = relativeTimestamp();
        line.appendChild(timestamp);

        return line;
    }

    renderList(target, items) {
        target.innerHTML = "";
        items.forEach((text) => {
            const li = document.createElement("li");
            li.textContent = text;
            target.appendChild(li);
        });
    }
}
