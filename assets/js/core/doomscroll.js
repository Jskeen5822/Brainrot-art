import { buildPostBody, buildImageMedia, buildFooter, buildAdBody, buildAdFooter } from "../components/postBuilders.js";
import { pickRandom, relativeTimestamp, shuffleArray } from "../utils/random.js";
import { BADGES, SURVEY_QUESTIONS } from "../data/ads.js";

export class Doomscroll {
    constructor(feedElement, {
        scrollSpeed,
        initialPostCount,
        mediaLibraryLength,
        adFrequency = 6,
        badges = BADGES,
        surveyQuestions = SURVEY_QUESTIONS,
        imageRotator,
        adRotator,
        newsOutletRotator,
        newsOutlets = []
    }) {
        this.feed = feedElement;
        this.translateY = 0;
        this.speed = scrollSpeed;
        this.initialPostCount = initialPostCount;
        this.mediaLibraryLength = mediaLibraryLength;
        this.adFrequency = adFrequency;
        this.badges = Array.isArray(badges) ? badges : [];
        this.surveyQuestions = Array.isArray(surveyQuestions) ? surveyQuestions : [];
        this.imageRotator = imageRotator || null;
        this.adRotator = adRotator || null;
        this.newsOutletRotator = newsOutletRotator || null;
        this.newsOutlets = Array.isArray(newsOutlets) ? newsOutlets : [];

        this.running = false;
        this.frameRequest = null;
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
        this.lastTimestamp = null;
        this.postsSinceAd = 0;
        this.activeSurvey = null;
        this.gap = 32;
    }

    init() {
        if (!this.feed) {
            return;
        }

        const styles = window.getComputedStyle(this.feed);
        const gapValue = parseInt(styles.getPropertyValue("gap"), 10);
        this.gap = Number.isNaN(gapValue) ? 32 : gapValue;

        const initialCount = Math.max(this.mediaLibraryLength || 0, this.initialPostCount || 0);
        for (let index = 0; index < initialCount; index += 1) {
            this.feed.appendChild(this.createPost());
        }

        document.addEventListener("visibilitychange", this.handleVisibilityChange);
        this.running = true;
        this.frameRequest = window.requestAnimationFrame((timestamp) => this.tick(timestamp));
    }

    handleVisibilityChange() {
        if (document.hidden) {
            this.pause();
        } else {
            this.resume();
        }
    }

    pause() {
        this.running = false;
        if (this.frameRequest) {
            window.cancelAnimationFrame(this.frameRequest);
            this.frameRequest = null;
        }
        this.lastTimestamp = null;
    }

    resume() {
        if (this.running) {
            return;
        }
        this.running = true;
        this.lastTimestamp = null;
        this.frameRequest = window.requestAnimationFrame((timestamp) => this.tick(timestamp));
    }

    tick(timestamp) {
        if (!this.running) {
            return;
        }

        if (typeof timestamp !== "number") {
            this.frameRequest = window.requestAnimationFrame((nextTimestamp) => this.tick(nextTimestamp));
            return;
        }

        if (this.lastTimestamp === null) {
            this.lastTimestamp = timestamp;
        }

        const deltaSecondsRaw = (timestamp - this.lastTimestamp) / 1000;
        const deltaSeconds = Math.min(deltaSecondsRaw, 0.2);
        this.lastTimestamp = timestamp;

        const distance = this.speed * deltaSeconds;
        this.translateY -= distance;
        this.feed.style.transform = "translate3d(0, " + this.translateY + "px, 0)";

        let firstPost = this.feed.firstElementChild;
        while (firstPost) {
            const threshold = this.getPostHeight(firstPost) + this.gap;
            if (-this.translateY < threshold) {
                break;
            }

            this.translateY += threshold;
            this.feed.style.transform = "translate3d(0, " + this.translateY + "px, 0)";
            firstPost.remove();
            const newPost = this.createPost();
            this.feed.appendChild(newPost);
            firstPost = this.feed.firstElementChild;
        }

        this.frameRequest = window.requestAnimationFrame((nextTimestamp) => this.tick(nextTimestamp));
    }

    getPostHeight(element) {
        if (!element) {
            return 0;
        }

        const cached = element.dataset.cachedHeight;
        const needsRefresh = element.dataset.needsHeightRefresh === "true";

        if (cached && !needsRefresh) {
            const parsed = Number.parseFloat(cached);
            return Number.isNaN(parsed) ? 0 : parsed;
        }

        const measured = element.getBoundingClientRect().height;
        element.dataset.cachedHeight = String(measured);
        element.dataset.needsHeightRefresh = "false";
        return measured;
    }

    markHeightDirty(element) {
        if (!element) {
            return;
        }
        element.dataset.needsHeightRefresh = "true";
    }

    createPost(selectionOverride) {
        if (this.adRotator && typeof this.adRotator.hasItems === "function" && this.adRotator.hasItems()) {
            this.postsSinceAd += 1;
            if (this.postsSinceAd >= this.adFrequency) {
                this.postsSinceAd = 0;
                const adCampaign = this.adRotator.next();
                if (adCampaign) {
                    return this.buildAdPost(adCampaign);
                }
            }
        }

        const article = document.createElement("article");
        article.className = "post";
        article.dataset.needsHeightRefresh = "true";

        const header = this.buildHeader();
        article.appendChild(header);

        if (this.badges.length > 0 && Math.random() < 0.32) {
            const badge = document.createElement("span");
            badge.className = "badge";
            badge.textContent = pickRandom(this.badges);
            article.appendChild(badge);
        }

        let mediaContext = null;
        let selection = selectionOverride;

        if (!selection && this.imageRotator && typeof this.imageRotator.hasItems === "function" && this.imageRotator.hasItems()) {
            selection = this.imageRotator.next();
        }

        if (selection && selection.item) {
            const mediaElement = buildImageMedia(selection.item, selection.variant);
            const mediaImages = mediaElement.querySelectorAll("img");
            mediaImages.forEach((img) => {
                img.addEventListener("load", () => {
                    this.markHeightDirty(article);
                });
            });
            article.appendChild(mediaElement);
            mediaContext = selection.variant || null;
        }

        const body = buildPostBody(mediaContext);
        article.appendChild(body);

        const footer = buildFooter();
        article.appendChild(footer);

        return article;
    }

    buildHeader(override) {
        const header = document.createElement("header");
        header.className = "post-header";

        const avatar = document.createElement("div");
        avatar.className = "avatar";

        let outlet = override && override.outlet ? override.outlet : null;
        if (!outlet && this.newsOutletRotator && typeof this.newsOutletRotator.next === "function") {
            outlet = this.newsOutletRotator.next();
        }
        if (!outlet && this.newsOutlets.length > 0) {
            outlet = pickRandom(this.newsOutlets);
        }
        if (!outlet) {
            outlet = { handle: "@BrainrotNews", label: "Brainrot News" };
        }

        const handle = outlet.handle;

        if (outlet.avatar) {
            const avatarImg = document.createElement("img");
            avatarImg.src = outlet.avatar;
            avatarImg.alt = (outlet.label || handle.replace(/^@/, "")) + " avatar";
            avatarImg.className = "avatar-image";
            avatar.appendChild(avatarImg);
        } else {
            avatar.textContent = initialsFromHandle(handle);
        }

        const identity = document.createElement("div");
        identity.className = "identity";

        const handleElement = document.createElement("span");
        handleElement.className = "handle";
        handleElement.textContent = handle;

        if (outlet.label) {
            handleElement.setAttribute("data-network", outlet.label);
            handleElement.title = outlet.label + " official feed";
        }

        const timestamp = document.createElement("span");
        timestamp.className = "timestamp";
        timestamp.textContent = relativeTimestamp();

        identity.appendChild(handleElement);
        identity.appendChild(timestamp);

        header.appendChild(avatar);
        header.appendChild(identity);

        return header;
    }

    buildAdPost(adCampaign) {
        const article = document.createElement("article");
        article.className = "post ad-post";
        article.dataset.needsHeightRefresh = "true";

        const overrideOutlet = {
            handle: adCampaign.handle || "@CampusSponsored",
            label: adCampaign.label || "Sponsored",
            avatar: adCampaign.avatar || null
        };

        const header = this.buildHeader({ outlet: overrideOutlet });
        article.appendChild(header);

        const badge = document.createElement("span");
        badge.className = "badge";
        badge.textContent = adCampaign.badge || "Sponsored";
        article.appendChild(badge);

        const body = buildAdBody(adCampaign);
        article.appendChild(body);

        const footer = buildAdFooter(adCampaign);
        article.appendChild(footer);

        this.bindAdInteractions(article, adCampaign, footer);

        return article;
    }

    bindAdInteractions(article, adCampaign, footer) {
        if (!footer || !article) {
            return;
        }

        const hideButton = footer.querySelector(".ad-hide");
        if (!hideButton) {
            return;
        }

        hideButton.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            this.launchAdSurvey(article, adCampaign);
        });
    }

    teardownSurvey() {
        if (!this.activeSurvey || typeof this.activeSurvey.finish !== "function") {
            return;
        }
        this.activeSurvey.finish(true);
    }

    launchAdSurvey(article, adCampaign) {
        if (!article) {
            return;
        }

        if (article.dataset.surveyRunning === "true") {
            return;
        }

        this.teardownSurvey();

        const overlay = document.createElement("div");
        overlay.className = "ad-survey-overlay";

        const dialog = document.createElement("div");
        dialog.className = "ad-survey";
        overlay.appendChild(dialog);

        const title = document.createElement("p");
        title.className = "ad-survey-title";
        const headline = adCampaign && adCampaign.headline ? adCampaign.headline : "this ad";
        title.textContent = "Before we hide " + headline + "...";
        dialog.appendChild(title);

        const tagline = document.createElement("p");
        tagline.className = "ad-survey-tagline";
        tagline.textContent = "Marketing would love a micro-feedback vibe check:";
        dialog.appendChild(tagline);

        const questionElement = document.createElement("p");
        questionElement.className = "ad-survey-question";
        dialog.appendChild(questionElement);

        const progress = document.createElement("span");
        progress.className = "ad-survey-progress";
        dialog.appendChild(progress);

        const hint = document.createElement("span");
        hint.className = "ad-survey-hint";
        hint.textContent = "Tap anywhere when you are done (spoiler: it will still return).";
        dialog.appendChild(hint);

        const targetBody = document.body;
        if (targetBody) {
            targetBody.appendChild(overlay);
            targetBody.classList.add("ad-survey-active");
        }

        article.dataset.surveyRunning = "true";
        article.classList.add("ad-muted");
        this.markHeightDirty(article);

        const questionsSource = this.surveyQuestions.length > 0 ? this.surveyQuestions : [
            "Would you miss this sponsored content if it vanished forever?"
        ];
        const questions = shuffleArray(questionsSource).slice(0, 3);
        if (questions.length === 0) {
            questions.push("Would you miss this sponsored content if it vanished forever?");
        }

        let finished = false;
        const timeouts = [];

        const finish = (immediate) => {
            if (finished) {
                return;
            }
            finished = true;

            while (timeouts.length) {
                window.clearTimeout(timeouts.pop());
            }

            if (targetBody) {
                targetBody.classList.remove("ad-survey-active");
            }

            const removeOverlay = () => {
                overlay.remove();
            };

            if (immediate) {
                removeOverlay();
            } else {
                overlay.classList.add("closing");
                timeouts.push(window.setTimeout(removeOverlay, 260));
            }

            article.classList.remove("ad-muted");
            article.dataset.surveyRunning = "false";
            article.classList.add("ad-respawn");
            this.markHeightDirty(article);

            timeouts.push(window.setTimeout(() => {
                article.classList.remove("ad-respawn");
                this.markHeightDirty(article);
            }, 900));

            this.activeSurvey = null;
        };

        const showQuestion = (index) => {
            if (index >= questions.length) {
                finish(false);
                return;
            }

            questionElement.textContent = questions[index];
            progress.textContent = "Question " + (index + 1) + " of " + questions.length;

            const nextIndex = index + 1;
            const timeout = window.setTimeout(() => {
                showQuestion(nextIndex);
            }, 1500);
            timeouts.push(timeout);
        };

        overlay.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            finish(false);
        });

        this.activeSurvey = { finish };
        showQuestion(0);
    }
}

function initialsFromHandle(handle) {
    const cleaned = (handle || "@BN").replace(/^@/, "");
    const parts = cleaned.split("_").join(" ").split(/[.\-]/);
    const initials = parts
        .join(" ")
        .split(" ")
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase())
        .slice(0, 2)
        .join("");
    return initials || "BN";
}
