export const BASE_SCROLL_SPEED = 0.45;
export const BASE_INITIAL_POST_COUNT = 18;
export const BASE_TICKER_INTERVAL_MS = 7000;
export const LOW_POWER_SCROLL_SPEED = 0.62;
export const LOW_POWER_INITIAL_POST_COUNT = 12;
export const LOW_POWER_INTERVAL_SCALE = 1.45;

export function detectLowPowerMode() {
    if (typeof navigator === "undefined") {
        return false;
    }
    const userAgent = navigator.userAgent ? navigator.userAgent.toLowerCase() : "";
    const hardwareCores = typeof navigator.hardwareConcurrency === "number" ? navigator.hardwareConcurrency : 8;
    const deviceMemory = typeof navigator.deviceMemory === "number" ? navigator.deviceMemory : 8;

    if (userAgent.includes("raspberry") || userAgent.includes(" pi")) {
        return true;
    }

    if (userAgent.includes("linux") && (userAgent.includes("arm") || userAgent.includes("aarch"))) {
        return true;
    }

    if (hardwareCores <= 4 && deviceMemory <= 4) {
        return true;
    }

    return false;
}

export const LOW_POWER_MODE = detectLowPowerMode();
export const INTERVAL_SCALE = LOW_POWER_MODE ? LOW_POWER_INTERVAL_SCALE : 1;
export const SCROLL_SPEED = (LOW_POWER_MODE ? LOW_POWER_SCROLL_SPEED : BASE_SCROLL_SPEED) * 60;
export const INITIAL_POST_COUNT = LOW_POWER_MODE ? LOW_POWER_INITIAL_POST_COUNT : BASE_INITIAL_POST_COUNT;
export const TICKER_INTERVAL_MS = LOW_POWER_MODE ? Math.round(BASE_TICKER_INTERVAL_MS * INTERVAL_SCALE) : BASE_TICKER_INTERVAL_MS;
