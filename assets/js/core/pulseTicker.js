import { pickRandom } from "../utils/random.js";

export class PulseTicker {
    constructor(element, { lines, intervalMs }) {
        this.element = element;
        this.lines = Array.isArray(lines) ? lines.slice() : [];
        this.intervalMs = typeof intervalMs === "number" ? intervalMs : 7000;
        this.timer = null;
    }

    start() {
        if (!this.element || this.lines.length === 0) {
            return;
        }
        this.update();
        this.timer = window.setInterval(() => this.update(), this.intervalMs);
    }

    update() {
        const phrase = pickRandom(this.lines);
        this.element.textContent = phrase;
    }
}
