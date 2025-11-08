import { LOW_POWER_MODE, SCROLL_SPEED, INITIAL_POST_COUNT, INTERVAL_SCALE, TICKER_INTERVAL_MS } from "../config/constants.js";
import { MEDIA_LIBRARY } from "../data/mediaLibrary.js";
import { BADGES, AD_LIBRARY, SURVEY_QUESTIONS } from "../data/ads.js";
import { NEWS_OUTLETS } from "../data/newsOutlets.js";
import { CHAOS_LEVELS, DORM_LORE_HOTLINE, BRIEFING_LINES, ATMOSPHERIC_FORECASTS, LIVE_CHATTER_LINES, MAX_CHAT_LINES } from "../data/panelData.js";
import { buildTickerLines } from "../data/tickerLines.js";
import { Doomscroll } from "./doomscroll.js";
import { PulseTicker } from "./pulseTicker.js";
import { SidePanels } from "./sidePanels.js";
import { NewsOutletRotator, ImageRotator, AdRotator } from "./rotators.js";

export function initApp() {
    if (LOW_POWER_MODE) {
        document.body.classList.add("low-power");
    }

    const newsOutletRotator = new NewsOutletRotator(NEWS_OUTLETS);
    const imageRotator = new ImageRotator(MEDIA_LIBRARY);
    const adRotator = new AdRotator(AD_LIBRARY);

    const feedElement = document.getElementById("feed");
    const doomscroll = new Doomscroll(feedElement, {
        scrollSpeed: SCROLL_SPEED,
        initialPostCount: INITIAL_POST_COUNT,
        mediaLibraryLength: MEDIA_LIBRARY.length,
        adFrequency: 6,
        badges: BADGES,
        surveyQuestions: SURVEY_QUESTIONS,
        imageRotator,
        adRotator,
        newsOutletRotator,
        newsOutlets: NEWS_OUTLETS
    });
    doomscroll.init();

    const tickerElement = document.getElementById("ticker");
    const tickerLines = buildTickerLines(MEDIA_LIBRARY);
    const ticker = new PulseTicker(tickerElement, {
        lines: tickerLines,
        intervalMs: TICKER_INTERVAL_MS
    });
    ticker.start();

    const clockElement = document.getElementById("clock");
    startClock(clockElement);

    const sidePanels = new SidePanels({
        chaosBar: document.getElementById("chaos-meter"),
        chaosLabel: document.getElementById("chaos-label"),
        loreList: document.getElementById("lore-list"),
        briefingList: document.getElementById("briefing-list"),
        forecastList: document.getElementById("forecast-list"),
        chatStream: document.getElementById("chat-stream")
    }, {
        intervalScale: INTERVAL_SCALE,
        chaosLevels: CHAOS_LEVELS,
        loreLines: DORM_LORE_HOTLINE,
        briefingLines: BRIEFING_LINES,
        forecastEntries: ATMOSPHERIC_FORECASTS,
        chatLines: LIVE_CHATTER_LINES,
        maxChatLines: MAX_CHAT_LINES
    });
    sidePanels.init();
}

function startClock(clockElement) {
    if (!clockElement) {
        return;
    }

    const update = () => {
        const now = new Date();
        let hours = now.getHours();
        const suffix = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        if (hours === 0) {
            hours = 12;
        }
        const hourText = hours.toString();
        const minutes = now.getMinutes().toString().padStart(2, "0");
        clockElement.textContent = hourText + ":" + minutes + " " + suffix;
    };

    update();
    window.setInterval(update, 15000);
}
