export function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

export function shuffleArray(source) {
    const array = source.slice();
    for (let index = array.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        const temp = array[index];
        array[index] = array[swapIndex];
        array[swapIndex] = temp;
    }
    return array;
}

export function randomCount(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function formatCount(value) {
    if (value >= 1000000) {
        return (value / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (value >= 1000) {
        return (value / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return String(value);
}

export function relativeTimestamp() {
    const minutes = randomCount(1, 180);
    if (minutes < 60) {
        return minutes + "m ago";
    }
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return hours + "h ago";
    }
    const days = Math.max(1, Math.floor(hours / 24));
    return days + "d ago";
}
