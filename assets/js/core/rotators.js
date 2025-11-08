import { shuffleArray } from "../utils/random.js";

export class NewsOutletRotator {
    constructor(outlets) {
        this.items = outlets.slice();
        this.queue = [];
        this.previousHandle = null;
    }

    hasItems() {
        return this.items.length > 0;
    }

    next() {
        if (!this.hasItems()) {
            return null;
        }

        if (this.queue.length === 0) {
            this.queue = shuffleArray(this.items);
        }

        if (this.queue.length > 1 && this.queue[0].handle === this.previousHandle) {
            const first = this.queue.shift();
            this.queue.push(first);
        }

        const outlet = this.queue.shift();
        this.previousHandle = outlet.handle;
        return outlet;
    }
}

export class ImageRotator {
    constructor(items) {
        this.items = items.slice();
        this.queue = [];
        this.lastId = null;
    }

    hasItems() {
        return this.items.length > 0;
    }

    next() {
        if (!this.hasItems()) {
            return null;
        }

        if (this.queue.length === 0) {
            this.queue = shuffleArray(this.items);
            if (this.queue.length > 1 && this.lastId && this.queue[0].id === this.lastId) {
                const first = this.queue.shift();
                this.queue.push(first);
            }
        }

        if (this.queue.length === 0) {
            return null;
        }

        const item = this.queue.shift();
        this.lastId = item.id;

        if (!item.variants || item.variants.length === 0) {
            return { item, variant: null };
        }

        if (typeof item.variantIndex !== "number") {
            item.variantIndex = 0;
        }

        const variant = item.variants[item.variantIndex % item.variants.length];
        item.variantIndex = (item.variantIndex + 1) % item.variants.length;
        return { item, variant };
    }
}

export class AdRotator {
    constructor(items) {
        this.items = items.slice();
        this.queue = [];
        this.previousId = null;
    }

    hasItems() {
        return this.items.length > 0;
    }

    next() {
        if (!this.hasItems()) {
            return null;
        }

        if (this.queue.length === 0) {
            this.queue = shuffleArray(this.items);
        }

        if (this.queue.length > 1 && this.queue[0].id === this.previousId) {
            const first = this.queue.shift();
            this.queue.push(first);
        }

        const ad = this.queue.shift();
        this.previousId = ad.id;
        return ad;
    }
}
