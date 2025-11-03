export const BASE_TICKER_LINES = [
    "Tap now: campus capybara hydration kit promises finals immunity",
    "Limited drop: banana-backed crypto claims to waive late fees",
    "Advertorial: frog-tire shuttle paying triple work-study in loyalty points",
    "Promoted story: LeBron poster whispers motivational coupon codes",
    "Sponsored thread: dorm geese launch subscription-based vibe checks",
    "Flash alert: vending machine guru sells guaranteed A-minus templates",
    "Viral ad: emotional support brick now bundled with mindfulness app trial",
    "Clickbait: laundry room scent claims to hack your GPA in eight minutes",
    "Promo leak: basement DJ streaming rizz playlist behind paywall",
    "Sponsored scoop: Walter cheeseburger offers proprietary hunger firewall",
    "Campus commerce: ape professor touts banana mic masterclass",
    "Influencer drop: donkey professor selling office hour fast passes",
    "Advertorial: possum streaming service promises unlimited vibe resets",
    "Limited seats: bathroom wizard firewall workshop includes free sage bundle",
    "Swipeworthy: koi pond optics guarantee algorithm love on first post",
    "Paid placement: therapy dog cape rental skyrockets before midterms",
    "Campus ad: croc footwear sponsor launching unstoppable hallway tour",
    "Buzz alert: confession vending machine adds premium backlog upgrade",
    "Promo push: study goblin service claims ninety percent group project compliance",
    "Boosted clip: campus shuttle DJ selling exclusive remix tokens tonight"
];

export function buildTickerLines(mediaLibrary) {
    return mediaLibrary.reduce((lines, item) => {
        if (Array.isArray(item.variants)) {
            item.variants.forEach((variant) => {
                if (variant && variant.ticker) {
                    lines.push("Sponsored: " + variant.ticker);
                }
            });
        }
        return lines;
    }, BASE_TICKER_LINES.slice());
}
