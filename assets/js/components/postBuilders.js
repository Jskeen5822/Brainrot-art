import { pickRandom, randomCount, formatCount } from "../utils/random.js";
import { TEXT_SNIPPETS } from "../data/textSnippets.js";

const ICONS = {
    likes: "&#128165;",
    comments: "&#128172;",
    shares: "&#128257;"
};

export function buildPostBody(context) {
    const highlight = context && context.tag ? "<strong>" + context.tag + "</strong>" : pickRandom(TEXT_SNIPPETS.highlights);
    const paragraph = document.createElement("p");
    paragraph.className = "post-body";

    if (context && Array.isArray(context.bodyLines) && context.bodyLines.length > 0) {
        const line = pickRandom(context.bodyLines);
        paragraph.innerHTML = highlight + " " + line;
        return paragraph;
    }

    const opener = pickRandom(TEXT_SNIPPETS.openers);
    const scenario = pickRandom(TEXT_SNIPPETS.scenarios);
    const closer = pickRandom(TEXT_SNIPPETS.closers);
    paragraph.innerHTML = highlight + " " + opener + " " + scenario + " " + closer + " \u2014 stay tuned.";
    return paragraph;
}

export function buildImageMedia(item, variant) {
    const figure = document.createElement("figure");
    figure.className = "post-media image";

    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.alt;
    figure.appendChild(img);

    const caption = document.createElement("figcaption");
    caption.textContent = variant && variant.caption ? variant.caption : "Transmission incoming";
    figure.appendChild(caption);

    return figure;
}

export function buildAdBody(adCampaign) {
    const body = document.createElement("div");
    body.className = "post-body ad-body";

    const tag = document.createElement("span");
    tag.className = "ad-tag";
    tag.textContent = adCampaign.badge || "Sponsored";
    body.appendChild(tag);

    const headline = document.createElement("h3");
    headline.className = "ad-headline";
    headline.textContent = adCampaign.headline || "Campus Sponsored Spotlight";
    body.appendChild(headline);

    if (adCampaign.subhead) {
        const sub = document.createElement("p");
        sub.className = "ad-subhead";
        sub.textContent = adCampaign.subhead;
        body.appendChild(sub);
    }

    if (Array.isArray(adCampaign.bullets) && adCampaign.bullets.length > 0) {
        const list = document.createElement("ul");
        list.className = "ad-bullets";
        adCampaign.bullets.slice(0, 3).forEach((line) => {
            const li = document.createElement("li");
            li.textContent = line;
            list.appendChild(li);
        });
        body.appendChild(list);
    }

    if (adCampaign.disclaimer) {
        const disclaimer = document.createElement("p");
        disclaimer.className = "ad-disclaimer";
        disclaimer.textContent = adCampaign.disclaimer;
        body.appendChild(disclaimer);
    }

    return body;
}

export function buildAdFooter(adCampaign) {
    const footer = document.createElement("footer");
    footer.className = "post-footer ad-footer";

    const cta = document.createElement("a");
    cta.className = "ad-cta";
    cta.href = adCampaign && adCampaign.url ? adCampaign.url : "#";
    cta.target = "_blank";
    cta.rel = "noopener";
    cta.textContent = adCampaign && adCampaign.cta ? adCampaign.cta : "Learn More";

    const actions = document.createElement("div");
    actions.className = "ad-footer-actions";
    actions.appendChild(cta);

    const hideButton = document.createElement("button");
    hideButton.type = "button";
    hideButton.className = "ad-hide";
    hideButton.setAttribute("aria-label", "Hide this ad");
    hideButton.textContent = "Hide Ad";
    actions.appendChild(hideButton);

    footer.appendChild(actions);

    if (adCampaign && adCampaign.urgency) {
        const urgency = document.createElement("span");
        urgency.className = "ad-urgency";
        urgency.textContent = adCampaign.urgency;
        footer.appendChild(urgency);
    }

    return footer;
}

export function buildFooter() {
    const footer = document.createElement("footer");
    footer.className = "post-footer";

    footer.appendChild(buildMetric(ICONS.likes, formatCount(randomCount(1200, 42000))));
    footer.appendChild(buildMetric(ICONS.comments, formatCount(randomCount(80, 9000))));
    footer.appendChild(buildMetric(ICONS.shares, formatCount(randomCount(20, 5000))));

    return footer;
}

function buildMetric(iconEntity, value) {
    const metric = document.createElement("span");
    metric.className = "metric";

    const icon = document.createElement("span");
    icon.className = "icon";
    icon.innerHTML = iconEntity;

    metric.appendChild(icon);
    metric.appendChild(document.createTextNode(value));
    return metric;
}
