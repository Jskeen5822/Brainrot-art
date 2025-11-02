(function () {
    "use strict";

    const BASE_SCROLL_SPEED = 0.45;
    const BASE_INITIAL_POST_COUNT = 18;
    const BASE_TICKER_INTERVAL_MS = 7000;
    const LOW_POWER_SCROLL_SPEED = 0.62;
    const LOW_POWER_INITIAL_POST_COUNT = 12;
    const LOW_POWER_INTERVAL_SCALE = 1.45;

    function detectLowPowerMode() {
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

    const LOW_POWER_MODE = detectLowPowerMode();
    const INTERVAL_SCALE = LOW_POWER_MODE ? LOW_POWER_INTERVAL_SCALE : 1;
    const SCROLL_SPEED = (LOW_POWER_MODE ? LOW_POWER_SCROLL_SPEED : BASE_SCROLL_SPEED) * 60;
    const INITIAL_POST_COUNT = LOW_POWER_MODE ? LOW_POWER_INITIAL_POST_COUNT : BASE_INITIAL_POST_COUNT;
    const TICKER_INTERVAL_MS = LOW_POWER_MODE ? Math.round(BASE_TICKER_INTERVAL_MS * INTERVAL_SCALE) : BASE_TICKER_INTERVAL_MS;

    const TEXT_SNIPPETS = {
        openers: [
            "POV:",
            "Live footage of",
            "Only in Ohio:",
            "Campus alert:",
            "No one:",
            "Breaking:",
            "Witness the",
            "Someone said",
            "Ohio weather be like",
            "Meanwhile in Alden:"
        ],
        scenarios: [
            "study group turning into a lore drop",
            "the printer initiating a boss fight",
            "mascot speed-running the rizz meta",
            "cafeteria releasing limited edition Skibidi",
            "professor unlocking secret NPC dialogue",
            "frat house launching a side quest",
            "quad transforming into a sigma training arc",
            "dorm hallway summoning ambient chaos",
            "late-night diner channeling ohio core energy",
            "geese union announcing another vibecession"
        ],
        closers: [
            "and I fear it is canon now",
            "screenshots were taken, no respawns",
            "send help this is not a drill",
            "fr fr trust",
            "we are so back",
            "nah because this cooked",
            "campus is not ready",
            "somebody clip that",
            "Ohio NPCs stay winning",
            "mods asleep post more brainrot"
        ],
        highlights: [
            "<strong>Only in Ohio</strong>",
            "<strong>Certified Brainrot</strong>",
            "<strong>Sigma Intel Drop</strong>",
            "<strong>NPC Transmission</strong>",
            "<strong>Rizz Alert</strong>",
            "<strong>Chaos Advisory</strong>",
            "<strong>Campus Lore Drop</strong>",
            "<strong>Brainwave Bulletin</strong>",
            "<strong>NPC Alert</strong>",
            "<strong>Doomscroll Dispatch</strong>"
        ]
    };

    const MEDIA_LIBRARY = [
        {
            id: "ape-banana",
            variantIndex: 0,
            src: "assets/media/ape banana.png",
            alt: "Thoughtful ape gripping a banana like a microphone",
            variants: [
                {
                    caption: "Ape professor delivers banana TED talk",
                    tag: "Banana Symposium",
                    bodyLines: [
                        "Lecture hall sold out after word spread that the syllabus includes potassium-powered lore drops.",
                        "Students furiously taking notes claim the banana predicted midterm curve chaos.",
                        "Legend says anyone who peels along gets an automatic bump in participation grade."
                    ],
                    ticker: "Ape-led banana colloquium trends harder than finals week"
                },
                {
                    caption: "Banana mic press conference goes feral",
                    tag: "Fruit Briefing",
                    bodyLines: [
                        "Campus media scrambled when the ape started quoting sigma gurus between snack breaks.",
                        "First question from the crowd: 'Do we clap or peel?' — answer remains unclear.",
                        "Rumor says the banana doubles as security detail whenever the ape drops hot gossip."
                    ],
                    ticker: "Fruit briefing interrupts regular doomscroll with potassium PSA"
                },
                {
                    caption: "Ape hosts midnight potassium power hour",
                    tag: "Potassium Prophet",
                    bodyLines: [
                        "Lecture hall packed once rumors spread he hands out honorary doctorates in banana science.",
                        "Bio majors filming the glow up for a documentary titled 'We Are So Back (Again)'.",
                        "Legend says peeling along in sync unlocks premium rizz multipliers for finals week."
                    ],
                    ticker: "Potassium prophet ape sells out midnight amphitheater session"
                },
                {
                    caption: "Banana host mediates group project ceasefire",
                    tag: "Appeasement Peel",
                    bodyLines: [
                        "Three rival teams finally agreed on slide aesthetics after the fruit lowered the vibe index.",
                        "Marketing majors swear the banana's keynote outclassed every guest speaker this semester.",
                        "Rumor says placing the banana on your laptop prevents all Canvas crashes for 24 hours."
                    ],
                    ticker: "Appeasement peel summit resolves sixty percent of campus beef overnight"
                },
                {
                    caption: "Ape debuts banana-powered wellness retreat",
                    tag: "Zen Peel",
                    bodyLines: [
                        "Participants chanted 'potassium peace' while slow-peeling for maximum aura alignment.",
                        "Wellness center now outsourcing half their mindfulness classes to this fruit-based guru.",
                        "Legend says snagging a peel scrap grants immunity from passive-aggressive group chats."
                    ],
                    ticker: "Zen peel retreat books out Court Street studio for the month"
                },
                {
                    caption: "Banana beats professor in campus rap battle",
                    tag: "Syllabars",
                    bodyLines: [
                        "Crowd lost it when the peel rhymed 'midterm' with 'curveball brainworm' flawlessly.",
                        "English department issued a press release acknowledging the fruit as adjunct faculty now.",
                        "Rumor says the ape's mic drop caused the projector to auto-download hype playlists."
                    ],
                    ticker: "Syllabars banana bars trend harder than syllabus week rants"
                },
                {
                    caption: "Potassium think tank invades the quad",
                    tag: "Banana Braintrust",
                    bodyLines: [
                        "Whiteboards everywhere filled with diagrams proving bananas the optimal study partner.",
                        "Economics majors calculating the peel-to-grade ROI like it is a Fortune 500 case study.",
                        "Legend says joining the brainstorm unlocks unlimited snack access from vending machine 7A."
                    ],
                    ticker: "Banana braintrust publishes 43-page manifesto on campus hustle hydration"
                },
                {
                    caption: "Ape launches banana-backed cryptocurrency",
                    tag: "ApeX Coin",
                    bodyLines: [
                        "Business college packed the lecture hall to hear about the world's first potassium-backed token.",
                        "Compliance office begged them to stop calling it 'proof-of-peel' but nobody listened.",
                        "Rumor says staking five bananas grants access to an exclusive hype discord hidden in Alden."
                    ],
                    ticker: "ApeX coin peel paper sparks frenzy among finance minors"
                }
            ]
        },
        {
            id: "bird-tennisball",
            variantIndex: 0,
            src: "assets/media/bird tennisball.png",
            alt: "Tiny bird perched proudly on an oversized tennis ball",
            variants: [
                {
                    caption: "Bird claims tennis ball as emotional support planet",
                    tag: "Court Keeper",
                    bodyLines: [
                        "Intramural tennis suspended after the mascot refused to vacate the baseline.",
                        "Coaches now list 'bird tax' in equipment budgets thanks to weekly seed demands.",
                        "Witnesses swear the bird keeps yelling 'love-love' like it's running the scoreboard."
                    ],
                    ticker: "Court keeper bird files for honorary varsity status"
                },
                {
                    caption: "Featherweight serves certified brainrot",
                    tag: "Rally Gremlin",
                    bodyLines: [
                        "Practice devolved into a vibe session once the bird started doing victory laps.",
                        "Athletic trainers added 'miniature hype coach' to the official roster.",
                        "Rumor says the bird only leaves if offered a courtside latte with extra sunflower foam."
                    ],
                    ticker: "Rally gremlin bird commandeers the campus tennis schedule"
                },
                {
                    caption: "Bird announces racket-free tennis philosophy",
                    tag: "Zen Volley",
                    bodyLines: [
                        "Sports psych majors now citing the tiny coach in dissertations about flow state chirping.",
                        "Equipment room released a memo titled 'please stop bringing gifts to the bird'.",
                        "Legend says mimicking its stance during exams boosts focus by 15 percent."
                    ],
                    ticker: "Zen volley bird hosts mindfulness warmups on court three"
                },
                {
                    caption: "Campus tennis ball crowned new mascot",
                    tag: "Sphere Regent",
                    bodyLines: [
                        "Cheer squad choreographed an entire routine praising the orb and its feathered sovereign.",
                        "Facilities now tracks the ball's location with AirTags labeled 'do not pet'.",
                        "Rumor says kissing the felt grants the ability to dodge every pop quiz."
                    ],
                    ticker: "Sphere regent coronation livestream crashes student portal"
                },
                {
                    caption: "Bird opens courtside consulting booth",
                    tag: "Baseline Coach",
                    bodyLines: [
                        "Athletes booking thirty-minute pep chirps before matches improved morale instantly.",
                        "Finance club offered seed funding; the bird asked for literal seeds instead.",
                        "Legend says any handshake with the bird transfers perfect bracket predictions to your brain."
                    ],
                    ticker: "Baseline coach bird inks deal with athletics for hype management"
                },
                {
                    caption: "Tennis ball turned dorm afterparty venue",
                    tag: "Orb Lounge",
                    bodyLines: [
                        "Students RSVP'd within seconds once they heard the bird DJs deep-cut chirp remixes.",
                        "Residence life baffled by noise complaints reading 'tweetcore too loud 1AM'.",
                        "Rumor says the orb glows neon when a midterm curve hits absolute chaos levels."
                    ],
                    ticker: "Orb lounge bird throws the most exclusive micro-rave on campus"
                },
                {
                    caption: "Bird starts intramural dodgeball dynasty",
                    tag: "Seed Slinger",
                    bodyLines: [
                        "Opposing teams surrendered after the bird's warmup alone caused existential dread.",
                        "Recreation center now requires protective eyewear when the mascot takes the court.",
                        "Rumor says offering birdseed grants immunity from being targeted first."
                    ],
                    ticker: "Seed slinger bird sweeps intramural finals with zero feathers ruffled"
                },
                {
                    caption: "Feathered referee hands out vibe violations",
                    tag: "Chirp Official",
                    bodyLines: [
                        "Players received tiny yellow sunflower cards for unsportsmanlike aura.",
                        "Rulebook quietly updated to include 'listen when the bird chirps, actually'.",
                        "Legend says accepting the bird's penalty grants a mysterious stat buff later."
                    ],
                    ticker: "Chirp official bird enforces first-ever campus vibe rulebook"
                }
            ]
        },
        {
            id: "cat-goldfish",
            variantIndex: 0,
            src: "assets/media/cat goldfish.png",
            alt: "Orange cat hugging a giant goldfish plush with feral devotion",
            variants: [
                {
                    caption: "Cat cuddles limited edition aquatic plushie",
                    tag: "Goldfish Gatekeeper",
                    bodyLines: [
                        "Residence hall banned roommates from borrowing the plush after three near-heists.",
                        "Floor group chat now includes hourly updates on the cat's vibe level.",
                        "Legend says petting the fish grants +10 feral energy and +5 GPA resilience."
                    ],
                    ticker: "Goldfish gatekeeper cat now offering cuddle waitlist sign-ups"
                },
                {
                    caption: "Snack time or soulmate?",
                    tag: "Plush Bond",
                    bodyLines: [
                        "RA reports the cat purrs in lo-fi beats whenever the fish playlist hits.",
                        "Students started a betting pool on when the cat will finally let go. Answer: never.",
                        "Rumor says the duo streams ASMR office hours for stressed-out freshmen."
                    ],
                    ticker: "Plush bond livestream emerges as finals-week comfort staple"
                },
                {
                    caption: "Cat registers goldfish for domestic partnership benefits",
                    tag: "Cuddle Clause",
                    bodyLines: [
                        "Housing had to invent a new form called 'cohabitating plush agreement'.",
                        "Law majors debating if the fish counts as emotional support or spiritual advisor.",
                        "Legend says signing their guestbook grants permission to skip at least one lab."
                    ],
                    ticker: "Cuddle clause paperwork clogs student center help desk"
                },
                {
                    caption: "Goldfish drops debut ambient album",
                    tag: "Gills & Chill",
                    bodyLines: [
                        "Cat provides backup purrs while the fish swims in sync with synthwave beats.",
                        "Campus radio replaced their night shift with the duo's underwater vibes.",
                        "Rumor says listening during study sessions increases focus and feline envy."
                    ],
                    ticker: "Gills & chill collab tops finals week streaming charts"
                },
                {
                    caption: "Cat opens boutique cuddle consultancy",
                    tag: "Plush Strategist",
                    bodyLines: [
                        "Clients leave with personalized cuddle schedules and glow-in-the-dark stickers.",
                        "Business minors jealous the waitlist now rivals campus counseling.",
                        "Legend says completing the cuddle quiz unlocks premium nap spots in Alden."
                    ],
                    ticker: "Plush strategist cat announces sold-out cuddle strategy bootcamp"
                },
                {
                    caption: "Fish and cat host joint TED talk",
                    tag: "Aquatic Affection",
                    bodyLines: [
                        "Slides included pie charts about serotonin spikes and catnip economics.",
                        "Student questions ranged from 'how?' to 'can I RSVP for cuddle labs?'.",
                        "Rumor says attending the talk gives you telepathic access to the fish's playlist."
                    ],
                    ticker: "Aquatic affection TED talk trends harder than homecoming"
                },
                {
                    caption: "Cat petitions for fish-themed dining hall menu",
                    tag: "Plush Advocate",
                    bodyLines: [
                        "Petition signatures triple once students learn dessert is gummy koi.",
                        "Dining manager negotiating to prevent full-scale fish-themed takeover.",
                        "Legend says submitting a recipe idea earns a private cuddle consultation."
                    ],
                    ticker: "Plush advocate cat turns dining suggestion box into fan mail bin"
                },
                {
                    caption: "Goldfish accepted into honors program",
                    tag: "Dean's Fin",
                    bodyLines: [
                        "Faculty cited its unwavering dedication to being adored as 'stellar leadership'.",
                        "Cat insisted on matching academic regalia for photo ops on the library steps.",
                        "Rumor says touching the tassel grants +5 resilience to 8AM labs."
                    ],
                    ticker: "Dean's fin ceremony causes rush on limited edition fish mortarboards"
                }
            ]
        },
        {
            id: "creepy-patrick",
            variantIndex: 0,
            src: "assets/media/creepy patrick.png",
            alt: "Grotesque Patrick Star staring straight into your soul",
            variants: [
                {
                    caption: "Patrick Star enters uncanny sigma era",
                    tag: "Patrick.exe",
                    bodyLines: [
                        "Dining hall replaced salad bar mirrors after this face manifested mid-lunch rush.",
                        "Campus therapists recommend averting gaze or reciting SpongeBob quotes for protection.",
                        "Legend says the stare knows every late-night Krabby Patty run you've ever made."
                    ],
                    ticker: "Patrick.exe declared unofficial campus hazard level orange"
                },
                {
                    caption: "We are so back... or not?",
                    tag: "Bikini Bottom Glitch",
                    bodyLines: [
                        "Study rooms reported sudden seawater ambiance and distant maniacal laughter.",
                        "Art majors call it performance art; everyone else calls campus security.",
                        "Rumor says offering a jar of mayo appeases the entity for 24 hours."
                    ],
                    ticker: "Bikini Bottom glitch triggers emergency mayonnaise drive"
                },
                {
                    caption: "Patrick stare triggers mass syllabus audit",
                    tag: "Starfish Scrutiny",
                    bodyLines: [
                        "Professors triple-check their slides whenever the stare enters lecture hall B.",
                        "Campus rumor claims the gaze can see every unsubmitted discussion post.",
                        "Legend says flashing a Krabby Patty wrapper grants safe passage for 48 hours."
                    ],
                    ticker: "Starfish scrutiny patrol reviews 87 syllabi overnight"
                },
                {
                    caption: "Cursed Patrick hosts resilience workshop",
                    tag: "Void Coach",
                    bodyLines: [
                        "Counseling center reluctantly lists the session as 'exposure therapy but with glitter'.",
                        "Students report emerging stronger, albeit slightly saltwater scented.",
                        "Rumor says completing the workshop grants immunity to cringe presentations."
                    ],
                    ticker: "Void coach Patrick sells out emotional armor class in minutes"
                },
                {
                    caption: "Patrick screensaver infiltrates campus computers",
                    tag: "Stareware",
                    bodyLines: [
                        "IT issued a memo: 'if your monitor blinks first, you owe it a Baja Blast'.",
                        "Library staff caught three students negotiating with the wallpaper after midnight.",
                        "Legend says entering the Konami code frees your desktop from the glare."
                    ],
                    ticker: "Stareware outbreak causes mass keyboard unplugging event"
                },
                {
                    caption: "Patrick cameo interrupts student film festival",
                    tag: "Sponge Noir",
                    bodyLines: [
                        "Directors insist the stare improved their cinematography via pure fear factor.",
                        "Audience poll labeled the vibe 'unsettling yet camp', which is apparently a win.",
                        "Rumor says applauding too long summons Squidward with critique cards."
                    ],
                    ticker: "Sponge noir cameo sweeps best jump scare at campus awards"
                },
                {
                    caption: "Patrick runs for student government",
                    tag: "Chaos Campaign",
                    bodyLines: [
                        "Campaign promise #1: mandatory jellyfishing breaks between labs.",
                        "Debate opponents refused to maintain eye contact longer than three seconds.",
                        "Legend says his platform includes a very detailed mayonnaise subsidy plan."
                    ],
                    ticker: "Chaos campaign rally draws record turnout of confused voters"
                },
                {
                    caption: "Patrick moonlights as campus nightlight",
                    tag: "Glow Guardian",
                    bodyLines: [
                        "Facilities measured the lumens and just shrugged, calling it 'ambient dread'.",
                        "Late-night walkers report feeling watched yet protected from group project ghosts.",
                        "Rumor says whispering 'we ball' dims the glow long enough to sneak snacks."
                    ],
                    ticker: "Glow guardian Patrick reduces after-dark geese confrontations by 8%"
                }
            ]
        },
        {
            id: "dog-human-face",
            variantIndex: 0,
            src: "assets/media/dog with human face.png",
            alt: "Golden retriever sporting uncanny human facial features",
            variants: [
                {
                    caption: "Emotional support roommate files taxes for you",
                    tag: "Dogman Liaison",
                    bodyLines: [
                        "Campus accountants confirm the dog submitted 400 accurate FAFSA forms overnight.",
                        "Roommates report the dog nods knowingly whenever someone says 'we ball'.",
                        "Legend says high-fiving him grants temporary immunity from cringe tweets."
                    ],
                    ticker: "Dogman liaison now offering pop-up life coaching behind Baker Center"
                },
                {
                    caption: "Resident advisor? emotional support? yes",
                    tag: "Canine Consultant",
                    bodyLines: [
                        "Hall meetings now include him opening with 'team, let's debrief our aura'.",
                        "The dog keeps assigning everyone mindfulness homework written in Comic Sans.",
                        "Rumor says giving him a puppuccino unlocks the good vending machine."
                    ],
                    ticker: "Canine consultant releases weekly vibe audit newsletter"
                },
                {
                    caption: "Dog files motion to replace syllabus with cuddle agenda",
                    tag: "Dean of Paws",
                    bodyLines: [
                        "Faculty senate baffled yet intrigued by the proposal's 40-page appendix of head pats.",
                        "Students voted unanimously to approve 'office hour belly rub exemptions'.",
                        "Legend says submitting a woof-form grants deadline extensions instantly."
                    ],
                    ticker: "Dean of paws petition becomes fastest-growing campus referendum"
                },
                {
                    caption: "Career center hires dog as resume whisperer",
                    tag: "Recruiter Ruff",
                    bodyLines: [
                        "He stares at your bullet points until they transform into power verbs out of fear.",
                        "Interview prep now includes practicing your zoom background with the dog nodding sagely.",
                        "Rumor says a single bark translates to 'leverage your strengths' in corporate speak."
                    ],
                    ticker: "Recruiter ruff appointments book out through graduation weekend"
                },
                {
                    caption: "Dog leads seminar on impostor syndrome",
                    tag: "Validation Good Boy",
                    bodyLines: [
                        "Participants receive certificates reading 'You, in fact, do be that student'.",
                        "Therapy department lists him as adjunct for emotional reinforcement 101.",
                        "Legend says his approval head tilt adds +20 confidence to presentations."
                    ],
                    ticker: "Validation good boy seminar sparks record self-love streak"
                },
                {
                    caption: "Dog mediates roommate contract summit",
                    tag: "Pawsitive Arbitrator",
                    bodyLines: [
                        "Conflicts resolved after he slid treat-based compromise charts across the table.",
                        "Residence life now issuing chew toy signatures for official agreements.",
                        "Rumor says he can sniff out passive-aggressive subtext from three doors away."
                    ],
                    ticker: "Pawsitive arbitrator settles 14 roommate disputes before lunch"
                },
                {
                    caption: "Dog livestreams late-night productivity check-ins",
                    tag: "Study Buddy Bark",
                    bodyLines: [
                        "Chat floods with 'woof if you're still grinding' prompting mass accountability.",
                        "Library night staff thrilled someone finally monitors the hydration reminders.",
                        "Legend says his yawns sync perfectly with mandatory stretch breaks."
                    ],
                    ticker: "Study buddy bark stream overtakes lo-fi beats playlist in views"
                },
                {
                    caption: "Dog introduces scented syllabus alerts",
                    tag: "Aromatherapy Advisor",
                    bodyLines: [
                        "Emails now arrive with hints of lavender or chaos depending on urgency.",
                        "IT assures everyone the scratch-and-sniff feature is FERPA compliant (somehow).",
                        "Rumor says sniffing the 'done' scent gives immediate serotonin boosts."
                    ],
                    ticker: "Aromatherapy advisor rollout reduces missed deadlines by 11%"
                }
            ]
        },
        {
            id: "donkey-npc",
            variantIndex: 0,
            src: "assets/media/donkey.png",
            alt: "Hyper-real donkey with thousand-yard stare",
            variants: [
                {
                    caption: "Donkey NPC issues unblinking vibe check",
                    tag: "NPC Stare Down",
                    bodyLines: [
                        "Counselors confirm five students confessed group project crimes after the donkey stared into their GPA.",
                        "Campus folklore says the donkey can smell overdue assignments from fifty yards away.",
                        "Facilities added a 'Beware of vibe check' placard after the donkey claimed another victim at 2AM."
                    ],
                    ticker: "Donkey NPC conducts unsanctioned vibe checks outside Alden"
                },
                {
                    caption: "Hoof court convenes in the lobby",
                    tag: "Hoof Court",
                    bodyLines: [
                        "Students now plead their innocence while the donkey silently judges their alibis.",
                        "Rumor says the donkey only accepts evidence in meme format and unhinged voice notes.",
                        "If the donkey snorts, you're cleared; if it blinks twice, expect a pop quiz."
                    ],
                    ticker: "Hoof court subpoenas every roommate who left dishes"
                },
                {
                    caption: "Emotional repo agent demands the tea",
                    tag: "Emotional Repo",
                    bodyLines: [
                        "Witnesses swear the donkey collects overdue gossip and redistributes it campus-wide.",
                        "RA staff report the donkey now handles emotional support IOUs with ruthless efficiency.",
                        "Any student who lies gets their caffeine allowance repossessed on the spot."
                    ],
                    ticker: "Emotional repo donkey seizes late-night gossip assets"
                },
                {
                    caption: "Donkey launches midnight accountability hotline",
                    tag: "Truth Hoof",
                    bodyLines: [
                        "Callers must state their unfinished assignments before the donkey allows them to hang up.",
                        "Counseling center applauds the tough love, geese complain about the noise.",
                        "Legend says staying honest earns a hoof bump and a snack voucher."
                    ],
                    ticker: "Truth hoof hotline receives 400 confessions during finals week"
                },
                {
                    caption: "Donkey chairs honor council hearing",
                    tag: "Hoof Gavel",
                    bodyLines: [
                        "Proceedings paused twice because the donkey demanded dramatic lighting adjustments.",
                        "Law school observers note the donkey's glare qualifies as admissible evidence.",
                        "Rumor says the verdict is delivered via tail flick Morse code."
                    ],
                    ticker: "Hoof gavel tribunal clears backlog of campus shenanigans overnight"
                },
                {
                    caption: "Donkey starts passive-aggressive mindfulness class",
                    tag: "Silent Stare",
                    bodyLines: [
                        "Participants meditate while the donkey judges their aura with zero blinking.",
                        "Attendance soared once people realized the stare ensures instant introspection.",
                        "Legend says five minutes of eye contact equals one semester of self-reflection."
                    ],
                    ticker: "Silent stare mindfulness session becomes hottest stress relief ticket"
                },
                {
                    caption: "Donkey endorses daylight savings rebellion",
                    tag: "Time Skeptic",
                    bodyLines: [
                        "Campus clocks mysteriously drifted to whichever vibe suited the donkey's mood.",
                        "Admin reluctantly created a form labeled 'exemption: donkey said so'.",
                        "Rumor says following the donkey's schedule eliminates all 8AM obligations."
                    ],
                    ticker: "Time skeptic donkey convinces three departments to move start times"
                },
                {
                    caption: "Donkey opens aura appraisal kiosk",
                    tag: "Vibe DMV",
                    bodyLines: [
                        "Students take numbers, step forward, and receive stern nods or disapproving snorts.",
                        "Campus stores now sell 'I passed the vibe DMV' stickers in limited quantities.",
                        "Legend says failing twice means you must bring the donkey a Baja Blast tribute."
                    ],
                    ticker: "Vibe DMV kiosk eclipses campus post office line in under an hour"
                },
                {
                    caption: "Donkey cameo in campus musical",
                    tag: "Hooflights",
                    bodyLines: [
                        "Audience went silent as the donkey delivered a 12-second bray soliloquy.",
                        "Drama club already rewriting next year's script to include a starring hoof role.",
                        "Rumor says the encore depends entirely on if the donkey approves your pitch."
                    ],
                    ticker: "Hooflights performance wins standing ovation and mild fear"
                }
            ]
        },
        {
            id: "elephant-cactus",
            variantIndex: 0,
            src: "assets/media/elephant cactus.png",
            alt: "Elephant proudly sporting a cactus trunk hybrid",
            variants: [
                {
                    caption: "Botany lab accidentally invents cactus elephant",
                    tag: "Succulent Stampede",
                    bodyLines: [
                        "Greenhouse requests volunteers brave enough to water the new resident.",
                        "Environmental science majors call it evolution; facilities call it 'not again'.",
                        "Legend says touching a spine grants resistance to getting poked by Canvas notifications."
                    ],
                    ticker: "Succulent stampede elephant scheduled for cactus awareness week"
                },
                {
                    caption: "Desert pachyderm offers hydration tips",
                    tag: "Prickle Mentor",
                    bodyLines: [
                        "Orientation now includes a workshop titled 'hydration but make it spiky'.",
                        "Students line up for selfie ops despite the risk of getting lightly stabbed by vibes.",
                        "Rumor says gifting it aloe vera unlocks exclusive study spots."
                    ],
                    ticker: "Prickle mentor elephant lecturing on hydration at Baker lawn"
                },
                {
                    caption: "Elephant opens succulent co-working lounge",
                    tag: "SpineSpace",
                    bodyLines: [
                        "Seating limited to whoever can balance on cactus cushions without screaming.",
                        "Entrepreneurship minors already pitching branded watering schedules.",
                        "Legend says finishing a task before the pot dries earns extra-campus clout."
                    ],
                    ticker: "SpineSpace hydration lounge doubles as finals week retreat"
                },
                {
                    caption: "Cactus trunk DJ debuts desert trance set",
                    tag: "Prickle Beats",
                    bodyLines: [
                        "Sound crew measured the bass and politely asked the elephant to dial back the monsoon mode.",
                        "Dance majors practicing sandstorm footwork despite zero sand present.",
                        "Rumor says placing a succulent near the stage grants front-row aura boosts."
                    ],
                    ticker: "Prickle beats rave draws longest line outside greenhouse since 2018"
                },
                {
                    caption: "Elephant leads hydration cult across campus",
                    tag: "Water Prophet",
                    bodyLines: [
                        "Followers chant 'sip sip hooray' while carrying reusable canteens shaped like cacti.",
                        "Wellness center approves as long as everyone actually drinks the water.",
                        "Legend says joining grants you rain cloud immunity during surprise storms."
                    ],
                    ticker: "Water prophet pilgrimage delays three lectures but raises hydration levels"
                },
                {
                    caption: "Cactus trunk sought for desert film cameo",
                    tag: "SuccuStar",
                    bodyLines: [
                        "Film majors promise tasteful lighting to highlight the prickly aesthetic.",
                        "Drama club jealous the trunk's agent negotiated better craft services.",
                        "Rumor says brushing the spines before auditions boosts memorization."
                    ],
                    ticker: "SuccuStar elephant signs three-movie deal with campus cinema club"
                },
                {
                    caption: "Elephant introduces cactus-based study hacks",
                    tag: "Focus Needles",
                    bodyLines: [
                        "Workshops include 'micro-pricks for macro-productivity' — not actually recommended.",
                        "Pre-med students volunteering to monitor safety while furiously taking notes.",
                        "Legend says balancing a mini cactus on your laptop prevents doomscroll detours."
                    ],
                    ticker: "Focus needles seminar sparks craze for prickly desk decor"
                },
                {
                    caption: "Elephant hosts succulent swap under the banyan tree",
                    tag: "Plant Parade",
                    bodyLines: [
                        "Attendees traded rare cuttings like Pokémon cards with dramatic flair.",
                        "Environmental club thrilled the elephant requires zero maintenance except positive affirmations.",
                        "Rumor says whispering your goals into a cactus ear ensures accountability."
                    ],
                    ticker: "Plant parade pachyderm extends swap hours due to overwhelming demand"
                }
            ]
        },
        {
            id: "fish-on-toilet",
            variantIndex: 0,
            src: "assets/media/fish on toilet.png",
            alt: "Goldfish confidently seated on a porcelain throne",
            variants: [
                {
                    caption: "Skibidi fish declares this stall sovereign territory",
                    tag: "Porcelain Prince",
                    bodyLines: [
                        "Bathroom signage updated to 'occupied by aquatic royalty, do not knock'.",
                        "Facilities reports the fish insists on flush-to-speak communication protocols.",
                        "Legend says sliding a single fry under the door grants you backstage passes to the aquarium rave."
                    ],
                    ticker: "Porcelain prince fish annexes restroom stall for the crown"
                },
                {
                    caption: "Toilet throne becomes underwater embassy",
                    tag: "Bowl Diplomat",
                    bodyLines: [
                        "Campus tour now includes a whisper-only walkthrough past the aquatic ambassador.",
                        "Students caught skipping class claim the fish subpoenaed them for 'vibes negligence'.",
                        "Rumor says the bowl glows neon whenever gossip levels spike."
                    ],
                    ticker: "Bowl diplomat opens hotline for bathroom diplomacy tips"
                },
                {
                    caption: "Fish announces flush-based security system",
                    tag: "Porcelain Patrol",
                    bodyLines: [
                        "Sensors track suspicious jiggles and trigger automated bubble sirens.",
                        "Facilities impressed; they promoted the fish to guardian of restroom etiquette.",
                        "Legend says tapping twice on the tank grants access to a secret gossip vault."
                    ],
                    ticker: "Porcelain patrol fish issues first-ever stall citation"
                },
                {
                    caption: "Restroom throne hosts late-night talk show",
                    tag: "Latrine Live",
                    bodyLines: [
                        "Guests flush to applaud; audience receives commemorative rubber duckies.",
                        "Communications majors jealous the fish scores all the best campus tea.",
                        "Rumor says sitting in the splash zone ensures straight-A charisma."
                    ],
                    ticker: "Latrine live broadcast overtakes student radio ratings"
                },
                {
                    caption: "Fish partners with environmental club",
                    tag: "Eco Flush",
                    bodyLines: [
                        "New PSA: 'If it's yellow let it mellow, if it's tea spill it carefully'.",
                        "Sustainability fair now features aquarium tours and low-flow rituals.",
                        "Legend says the fish grants eco-friendly blessings upon reusable water bottle owners."
                    ],
                    ticker: "Eco flush campaign drops water usage campus-wide by 6%"
                },
                {
                    caption: "Fish opens spa day for stressed-out students",
                    tag: "Bubble Retreat",
                    bodyLines: [
                        "Attendees soak feet in the royal bowl while listening to aquatic affirmations.",
                        "Reservations required; the fish insists on maintaining boutique ambiance.",
                        "Rumor says tipping with seaweed chips unlocks bonus relaxation playlists."
                    ],
                    ticker: "Bubble retreat stall wins wellness initiative of the week"
                },
                {
                    caption: "Royal flush turns into campus scavenger hunt",
                    tag: "Crown Quest",
                    bodyLines: [
                        "Clues hidden under toilet seats (sanitized!) led to hidden caches of bath bombs.",
                        "Residence life thrilled to finally make bathroom orientation interesting.",
                        "Legend says finishing the quest earns a golden plunger photo op with the fish."
                    ],
                    ticker: "Crown quest restroom adventure overloads student Instagram feed"
                },
                {
                    caption: "Fish drafts stall etiquette constitution",
                    tag: "Flush Law",
                    bodyLines: [
                        "Article one: 'Thou shalt not FaceTime in the royal vicinity'.",
                        "Political science majors debating amendments while the fish bangs a plunger gavel.",
                        "Rumor says memorizing the preamble grants access to the VIP soap dispenser."
                    ],
                    ticker: "Flush law charter ratified by 83% of residence hall referendum"
                }
            ]
        },
        {
            id: "gamer-flamingo",
            variantIndex: 0,
            src: "assets/media/gamer flamingo.png",
            alt: "Pink flamingo locked in gamer stance with controller",
            variants: [
                {
                    caption: "Flamingo speedruns campus esports tryouts",
                    tag: "LAN Legend",
                    bodyLines: [
                        "Team captain confirmed the bird's K/D ratio is legally classified as sorcery.",
                        "Snack table now includes shrimp-flavored G Fuel because synergy matters.",
                        "Legend says the flamingo only pauses to stretch those lanky ankles in victory poses."
                    ],
                    ticker: "LAN legend flamingo sweeps midnight tournament in 12 minutes"
                },
                {
                    caption: "Controller heron refuses to touch grass",
                    tag: "Pink Buff",
                    bodyLines: [
                        "Dorm Wi-Fi trembled when the bird yelled 'we clutching' at 3AM.",
                        "Physics majors currently modeling how a flamingo hits combo inputs with one leg.",
                        "Rumor says equipping neon socks gives the bird +5 APM and +10 drip."
                    ],
                    ticker: "Pink buff flamingo unlocks secret esports scholarship tier"
                },
                {
                    caption: "Flamingo launches pro team tryouts",
                    tag: "Lagless Legion",
                    bodyLines: [
                        "Applicants forced to balance on one leg while reciting patch notes from memory.",
                        "Esports lounge installed UV lighting to match the bird's neon vibe.",
                        "Legend says high-fiving its wing refills your G Fuel without the crash."
                    ],
                    ticker: "Lagless legion flamingo drafts four freshmen on the spot"
                },
                {
                    caption: "Bird debuts VR wingspan workouts",
                    tag: "Meta Plume",
                    bodyLines: [
                        "Wellness center evaluating if flapping controllers qualifies as cardio credit.",
                        "Gamers report unexpected soreness and unprecedented confidence.",
                        "Rumor says completing the regimen unlocks a holographic feather aura."
                    ],
                    ticker: "Meta plume bootcamp trending as finals stress therapy hack"
                },
                {
                    caption: "Flamingo streams speedrun of campus tour",
                    tag: "Route Feathers",
                    bodyLines: [
                        "Admissions loved the chaos; families legitimately took notes.",
                        "Clip of the bird drifting past the library fountain hit one million views overnight.",
                        "Legend says typing 'pog' in chat grants priority seating on the next tour."
                    ],
                    ticker: "Route feathers VOD breaks campus record for simultaneous viewers"
                },
                {
                    caption: "Bird coaches dorm to victory in Mario Kart league",
                    tag: "Shell Mentor",
                    bodyLines: [
                        "Team mantra: 'if you're not beaking the drift, you're throwing'.",
                        "Rival dorm accused them of literal flamingo-level unfair balance.",
                        "Rumor says offering shrimp chips unlocks a secret shortcut map reveal."
                    ],
                    ticker: "Shell mentor flamingo secures championship cup in rainbow road sweep"
                },
                {
                    caption: "Flamingo converts lounge into command center",
                    tag: "Pink Ops",
                    bodyLines: [
                        "RGB lights synced to the bird's heartbeat cause mild campus power fluctuations.",
                        "Resident assistants grateful the bird enforces quiet hours mid-raid.",
                        "Legend says securing a seat in pink ops grants +10 teamwork synergy IRL."
                    ],
                    ticker: "Pink ops HQ opens application process for co-op strategists"
                },
                {
                    caption: "Flamingo publishes guide to ergonomic sweating",
                    tag: "Heatmap Hero",
                    bodyLines: [
                        "Includes detailed charts showing optimal posture for winged button mashing.",
                        "Kinesiology majors collaborating on a follow-up study right now.",
                        "Rumor says reading the guide adds 12% accuracy to your ultimates."
                    ],
                    ticker: "Heatmap hero manual becomes required reading in esports minor"
                }
            ]
        },
        {
            id: "gigachad-cat",
            variantIndex: 0,
            src: "assets/media/gigachad black cat.png",
            alt: "Black cat with carved jawline radiating giga energy",
            variants: [
                {
                    caption: "Gigachad cat announces villain arc",
                    tag: "Sigma Feline",
                    bodyLines: [
                        "Career fair offered the cat a keynote slot titled 'How to Riz Your Advisor'.",
                        "Students swear locking eyes grants +3 charisma but -10 resistance to unhinged decisions.",
                        "Legend says the cat only drinks espresso brewed in pure confidence."
                    ],
                    ticker: "Sigma feline cat signs autographs in the business college atrium"
                },
                {
                    caption: "Campus swoons as feline flexes jawline",
                    tag: "Chad Aura",
                    bodyLines: [
                        "Fashion majors now citing the cat in their capstone mood boards.",
                        "The cat's side hustle includes rating LinkedIn headshots with ruthless honesty.",
                        "Rumor says offering catnip scented cologne grants mentorship in the art of smolder."
                    ],
                    ticker: "Chad aura cat trending as unofficial career coach"
                },
                {
                    caption: "Gigachad cat leads leadership retreat",
                    tag: "Alpha Seminar",
                    bodyLines: [
                        "Attendees forced to practice power stares in reflective elevator doors.",
                        "Business college begged the cat to stop dropping mic quotes mid-panel.",
                        "Legend says graduating from the seminar adds 'main character energy' to your transcript."
                    ],
                    ticker: "Alpha seminar cat retreat triples demand for sunglasses indoors"
                },
                {
                    caption: "Cat signs exclusive barber contract",
                    tag: "Lineup Lore",
                    bodyLines: [
                        "Campus barbers now offer 'feline fade' appointments with motivational purring.",
                        "Waitlist reportedly extends into next semester because jawline consultation is included.",
                        "Rumor says tipping in treats earns a personal aura diagnostic."
                    ],
                    ticker: "Lineup lore program triggers campus-wide grooming renaissance"
                },
                {
                    caption: "Cat publishes manifesto on Sigma etiquette",
                    tag: "Jawline Doctrine",
                    bodyLines: [
                        "Document includes sections on stare-down diplomacy and espresso philosophy.",
                        "Library added the manifesto to their rare books shelf with velvet gloves only.",
                        "Legend says reading page 12 out loud increases GPA by .02 instantly."
                    ],
                    ticker: "Jawline doctrine zine sells out before first print run finishes"
                },
                {
                    caption: "Gigachad cat teaches silent confidence yoga",
                    tag: "Power Pose",
                    bodyLines: [
                        "Students hold warrior poses while the cat strolls by offering approving nods.",
                        "Wellness center reported record attendance despite zero words uttered.",
                        "Rumor says achieving purr alignment unlocks access to the secret espresso machine."
                    ],
                    ticker: "Power pose session sets new calm-and-feral attendance record"
                },
                {
                    caption: "Cat moonlights as dorm hype resident",
                    tag: "Suite Flex",
                    bodyLines: [
                        "Residents wake up to perfectly curated playlists and mirror compliments.",
                        "RA thrilled someone else enforces quiet hours with a single withering glance.",
                        "Legend says booking a one-on-one hype consult unlocks limited edition wall poster."
                    ],
                    ticker: "Suite flex services earn five-star ratings across all dorm floors"
                },
                {
                    caption: "Cat launches jawline NFT ironically",
                    tag: "Crypto Claw",
                    bodyLines: [
                        "Economics professors reluctantly schedule a guest lecture to unpack the drip.",
                        "Art majors insist the project is post-ironic but still minted out in 12 seconds.",
                        "Rumor says owning one grants VIP seating at every villain arc unveiling."
                    ],
                    ticker: "Crypto claw drop breaks student union Wi-Fi for ten minutes"
                }
            ]
        },
        {
            id: "godzilla-baby-bump",
            variantIndex: 0,
            src: "assets/media/godzilla and pregnant man.png",
            alt: "Godzilla standing beside a serene pregnant man on the beach",
            variants: [
                {
                    caption: "Godzilla attends prenatal beach photo shoot",
                    tag: "Kaiju Doula",
                    bodyLines: [
                        "Maternity photographer confirms this was not on the shot list but everyone popped off.",
                        "Campus rumor mill now speculates about a half-kaiju baby majoring in marine biology.",
                        "Legend says the waves synced perfectly with the monster's breathing exercises."
                    ],
                    ticker: "Kaiju doula program launches limited engagement on South Beach"
                },
                {
                    caption: "Prenatal vibes hit monster movie crossover",
                    tag: "Radiant Reveal",
                    bodyLines: [
                        "Creative writing majors already pitching 'Parenting with Godzilla' as a new elective.",
                        "The couple reportedly registered for gifts at both Babies R Us and Kaiju Depot.",
                        "Rumor says tide pools lit up neon blue when the playlist hit the drop."
                    ],
                    ticker: "Radiant reveal guest list includes three mechs and one surprised dean"
                },
                {
                    caption: "Kaiju birth plan includes fireproof lullabies",
                    tag: "Seismic Nest",
                    bodyLines: [
                        "Music department composing lullabies rated for 9.0 quake tolerance.",
                        "Nursing students volunteering just to put 'monster doula' on their resumes.",
                        "Legend says humming along keeps volcanic cravings at bay."
                    ],
                    ticker: "Seismic nest planning session requires campus-wide hazard waivers"
                },
                {
                    caption: "Godzilla hosts co-parenting workshop",
                    tag: "Atomic Support",
                    bodyLines: [
                        "Guests learn how to set gentle yet firm boundaries with skyscraper-sized toddlers.",
                        "Counselors impressed by the blend of roars and active listening techniques.",
                        "Rumor says attending earns a signed pacifier forged from molten vibes."
                    ],
                    ticker: "Atomic support seminar oversubscribed within four minutes"
                },
                {
                    caption: "Kaiju maternity shoot trends globally",
                    tag: "Monster Glow",
                    bodyLines: [
                        "Photography lab rents special wide-angle lenses dubbed 'cityscape friendly'.",
                        "Fashion majors designing flame-retardant shawls with couture scales.",
                        "Legend says posing next to Godzilla guarantees perfect lighting forever."
                    ],
                    ticker: "Monster glow photo package becomes hottest spring booking"
                },
                {
                    caption: "Beach yoga interrupted by kaiju breathing exercises",
                    tag: "Prenatal Tremor",
                    bodyLines: [
                        "Wave patterns sync with Godzilla's exhale like it's casually bending tides.",
                        "Yoga instructor updated waiver to include 'possible gentle earthquakes'.",
                        "Rumor says mastering the routine grants you seismic stability during finals."
                    ],
                    ticker: "Prenatal tremor class moves to outdoor amphitheater due to demand"
                },
                {
                    caption: "Godzilla debuts baby registry livestream",
                    tag: "Kaiju Wishlist",
                    bodyLines: [
                        "Top requested items include reinforced mobile, industrial strength white noise, and tiny skyscrapers.",
                        "Audience spammed emojis shaped like tiny atomic hearts.",
                        "Legend says donating earns lifetime protection from surprise tail swipes."
                    ],
                    ticker: "Kaiju wishlist stream raises record funds in under nine minutes"
                },
                {
                    caption: "Marine biology club offers godparent training",
                    tag: "Tide Guardians",
                    bodyLines: [
                        "Curriculum covers diapering at scale and ocean-friendly enrichment activities.",
                        "Participants gifted commemorative life jackets emblazoned with kaiju emojis.",
                        "Rumor says finishing the course lets you breathe underwater for exactly twelve seconds."
                    ],
                    ticker: "Tide guardians certification becomes new campus prestige credential"
                }
            ]
        },
        {
            id: "hand-head",
            variantIndex: 0,
            src: "assets/media/man with a hand for a head.png",
            alt: "Stylish man whose head is replaced by an outstretched hand",
            variants: [
                {
                    caption: "Handshake major takes networking too literally",
                    tag: "Grip Guru",
                    bodyLines: [
                        "Career fair reports record-breaking handshake stats and mild existential dread.",
                        "Workshop includes lessons on reading vibes through fingertip telemetry.",
                        "Legend says high-fiving him uploads your resume straight to the cloud."
                    ],
                    ticker: "Grip guru offering pop-up networking clinic on College Green"
                },
                {
                    caption: "LinkedIn avatar from your nightmares",
                    tag: "Palm Pitch",
                    bodyLines: [
                        "Marketing department begged him to stop winking with his thumb mid-presentation.",
                        "Students claim he can deliver a firm handshake and motivational speech simultaneously.",
                        "Rumor says giving him a manicure upgrades your professional aura."
                    ],
                    ticker: "Palm pitch keynote threatens to crash job fair servers again"
                },
                {
                    caption: "Handshake influencer launches masterclass",
                    tag: "Grip Fleet",
                    bodyLines: [
                        "Enrollment includes a starter kit of artisanal moisturizers and networking scripts.",
                        "Career center quietly delighted the class sells out faster than finance boot camp.",
                        "Legend says practicing the wrist swivel summons recruiters out of thin air."
                    ],
                    ticker: "Grip fleet masterclass becomes highest grossing campus webinar"
                },
                {
                    caption: "Hand-head moderates debate with finger puppets",
                    tag: "Digital Forum",
                    bodyLines: [
                        "Candidates lost track after the pinky started citing parliamentary procedure.",
                        "Audience rating: 'surreal yet strangely informative'.",
                        "Rumor says shaking the index finger after the debate grants bipartisan homework extensions."
                    ],
                    ticker: "Digital forum debate recap goes viral for zero words spoken"
                },
                {
                    caption: "Palm-headed barista invents handshake latte art",
                    tag: "Foam Five",
                    bodyLines: [
                        "Drink comes with a tiny imprint of your GPA and a follow-up pep tap.",
                        "Coffee line moved faster because everyone paid in high fives.",
                        "Legend says tipping with cuticle oil upgrades you to VIP loyalty tier."
                    ],
                    ticker: "Foam five beverage launches pop-up cafe collaboration"
                },
                {
                    caption: "Hand-headed DJ scratches vinyl with fingertips",
                    tag: "Palm Spin",
                    bodyLines: [
                        "Sound crew terrified yet impressed by the ergonomic precision.",
                        "Dance floor replicated finger waves with crowd choreography.",
                        "Rumor says catching a tossed glove grants lifetime backstage access."
                    ],
                    ticker: "Palm spin set headlines midnight campus rave"
                },
                {
                    caption: "Handshake head officiates pop-up weddings",
                    tag: "Pinky Promise",
                    bodyLines: [
                        "Ceremony includes a legally binding double tap instead of rings.",
                        "Student legal services double-checked; turns out it's symbolic but adorable.",
                        "Legend says couples blessed by the palm enjoy 100% Wi-Fi compatibility."
                    ],
                    ticker: "Pinky promise nuptials become finals week stress relief trend"
                },
                {
                    caption: "Hand-faced motivational poster appears overnight",
                    tag: "Gripspiration",
                    bodyLines: [
                        "Quotes like 'clasp your destiny' now plastered across dorm bulletin boards.",
                        "Print shop reports spike in requests for embossed high-five certificates.",
                        "Rumor says tracing the outline of the poster before exams boosts luck stats."
                    ],
                    ticker: "Gripspiration campaign infiltrates every campus elevator"
                }
            ]
        },
        {
            id: "horse-foot",
            variantIndex: 0,
            src: "assets/media/horse foot.png",
            alt: "Horse fused with a human foot posing dramatically",
            variants: [
                {
                    caption: "Equestrian department unveils footwear elective",
                    tag: "Hoof Locker",
                    bodyLines: [
                        "Career services hosting resume workshops for students pursuing 'centaur pedicurist'.",
                        "Athletic trainers baffled by the creature's sprint speed and pedometer readings.",
                        "Legend says polishing the hoof grants VIP seating at the next horse girl summit."
                    ],
                    ticker: "Hoof locker hybrid takes gold in campus weird flex showcase"
                },
                {
                    caption: "Footloose but make it equine",
                    tag: "Pedal Pegasus",
                    bodyLines: [
                        "Dance majors begged Facilities for a hoof-friendly studio after viral TikTok debut.",
                        "Sweatband sales spiked the moment the hybrid announced cardio office hours.",
                        "Rumor says the foot blasts lo-fi beats with every stomp for ambience."
                    ],
                    ticker: "Pedal pegasus announces hoof camp on the practice fields"
                },
                {
                    caption: "Hybrid debuts hoofwear fashion line",
                    tag: "Sneaker Steed",
                    bodyLines: [
                        "Runway show included glow-in-the-dark horseshoes and ergonomic ankle straps.",
                        "Fashion department declared the collab 'feral athleisure' and applauded.",
                        "Legend says slipping on a pair lets you outrun campus geese effortlessly."
                    ],
                    ticker: "Sneaker steed drop sells out before samples reach bookstore"
                },
                {
                    caption: "Horse-foot teaches hybrid pilates class",
                    tag: "Core Canter",
                    bodyLines: [
                        "Participants stretch while balancing on yoga mats reinforced with rubber horseshoes.",
                        "Wellness center rebranded the class as 'hoovates' and it immediately waitlisted.",
                        "Rumor says mastering the canter plank unlocks unstoppable finals stamina."
                    ],
                    ticker: "Core canter sessions expand to three studios due to demand"
                },
                {
                    caption: "Hybrid officiates campus relay race",
                    tag: "Lap Laureate",
                    bodyLines: [
                        "Winners received golden socks plus a hoof tap of approval.",
                        "Track team credited the hybrid's cadence for breaking two longstanding records.",
                        "Legend says hearing the opening whinny improves sprint times by 12 percent."
                    ],
                    ticker: "Lap laureate event rebrands campus fun run as elite sport"
                },
                {
                    caption: "Horse-foot opens reflexology lounge",
                    tag: "Sole Stable",
                    bodyLines: [
                        "Clients recline while the hoof taps precise rhythm-based pressure points.",
                        "Pre-med students studying the technique claim it's an anatomical miracle.",
                        "Rumor says booking the deluxe package ensures perfect playlist alignment."
                    ],
                    ticker: "Sole stable lounge introduces finals week haptic therapy"
                },
                {
                    caption: "Hybrid becomes campus traffic controller",
                    tag: "Crosswalk Canter",
                    bodyLines: [
                        "Morning commute now guided by choreographed hoof clacks and interpretive kicks.",
                        "Commuters applaud the efficiency even while mildly terrified.",
                        "Legend says following its rhythm keeps scooters upright during surprise potholes."
                    ],
                    ticker: "Crosswalk canter program reduces near-miss incidents by 40%"
                },
                {
                    caption: "Horse-foot hosts podcast on foot care and folklore",
                    tag: "Hoof Notes",
                    bodyLines: [
                        "Episode titles include 'Socks That Slap' and 'Mythical Pedicurist Tales'.",
                        "Human and equine guests alike share tips while lo-fi hooves beat in the background.",
                        "Rumor says subscribing gives early access to campus cobbler pop-ups."
                    ],
                    ticker: "Hoof notes podcast premieres at number one on campus charts"
                }
            ]
        },
        {
            id: "jam-and-salt",
            variantIndex: 0,
            src: "assets/media/living jam and salt.png",
            alt: "Animated jar of jam embracing a salt shaker with pure joy",
            variants: [
                {
                    caption: "Condiment crossover breaks the internet",
                    tag: "Flavor Ship",
                    bodyLines: [
                        "Dining hall added a 'sweet and salty situationship' station in their honor.",
                        "Campus couples therapy referencing the duo as aspirational snack compatibility.",
                        "Legend says attending their cooking workshop grants +10 to spice tolerance."
                    ],
                    ticker: "Flavor ship support group now meeting behind the salad bar"
                },
                {
                    caption: "Jam and salt host relationship masterclass",
                    tag: "Seasoned Romance",
                    bodyLines: [
                        "Tickets sold out as soon as people heard there would be complimentary toast.",
                        "Psych majors citing the duo in papers about attachment styles and sodium levels.",
                        "Rumor says hugging the salt shaker wards off bland cafeteria vibes."
                    ],
                    ticker: "Seasoned romance seminar adds overflow seating by popular demand"
                },
                {
                    caption: "Condiment duo release joint memoir",
                    tag: "Spread Sheet",
                    bodyLines: [
                        "Copies came with scratch-and-sniff pages and a tear-out coupon for hugs.",
                        "Bookstore reported unprecedented demand for the limited edition jam jar slipcase.",
                        "Legend says reading chapter seven upgrades your sauce ratios permanently."
                    ],
                    ticker: "Spread sheet memoir tour wraps around student union twice"
                },
                {
                    caption: "Jam & Salt DJ a brunch rave",
                    tag: "Toast Drop",
                    bodyLines: [
                        "Crowd went feral when the beat flipped into a maple syrup trap remix.",
                        "Dining staff joined in, sprinkling glitter sugar like confetti.",
                        "Rumor says attending ensures every bagel you eat this week is perfectly toasted."
                    ],
                    ticker: "Toast drop brunch rave declares syrup optional but vibes mandatory"
                },
                {
                    caption: "Condiments launch couples therapy hotline",
                    tag: "Dial-A-Season",
                    bodyLines: [
                        "Counselors impressed at how many disputes were solved with metaphorical seasoning.",
                        "Participants receive recipe cards titled 'spice your boundaries'.",
                        "Legend says calling after midnight results in lullabies about proportion control."
                    ],
                    ticker: "Dial-a-season hotline reaches capacity within opening hour"
                },
                {
                    caption: "Jam leads poetry slam, Salt handles critique",
                    tag: "Lyric Preserves",
                    bodyLines: [
                        "Open mic night shifted to brunch hours because that's their brand now.",
                        "Winners awarded artisanal toast racks shaped like infinity symbols.",
                        "Rumor says rhyming 'umami' with 'tsunami' earns a glitter confetti hug."
                    ],
                    ticker: "Lyric preserves slam sells out; waiting list offered croissant consolation"
                },
                {
                    caption: "Condiments partner with wellness center",
                    tag: "Mindful Seasoning",
                    bodyLines: [
                        "Sessions invite students to sprinkle gratitude like flaky sea salt on sourdough.",
                        "Mindfulness coaches applaud the duo's blend of flavor and emotional balance.",
                        "Legend says meditating with jam aroma boosts resilience to roommate drama."
                    ],
                    ticker: "Mindful seasoning pop-up introduces toast-based grounding exercises"
                },
                {
                    caption: "Jam & Salt open pop-up museum",
                    tag: "Culture Spread",
                    bodyLines: [
                        "Exhibits include historical salt shakers and the evolution of artisanal toast art.",
                        "Visitors exit through a gift shop with limited edition micro-spoon collectibles.",
                        "Rumor says scanning the QR codes unlocks hidden recipes for finals fuel."
                    ],
                    ticker: "Culture spread gallery draws record attendance and zero crumbs"
                }
            ]
        },
        {
            id: "john-pork",
            variantIndex: 0,
            src: "assets/media/john pork.png",
            alt: "3D influencer pig posing like a celebrity on Facetime",
            variants: [
                {
                    caption: "John Pork goes live from Alden stacks",
                    tag: "Pork Broadcast",
                    bodyLines: [
                        "Students reportedly skipping class just to catch the latest oink-fluencer drop.",
                        "Merch table now sells pork-branded selfie lights and ring tones.",
                        "Legend says answering his call bumps your clout score by double digits."
                    ],
                    ticker: "Pork broadcast takeover melts campus Wi-Fi in three minutes"
                },
                {
                    caption: "Facetime hog announces limited meet and greet",
                    tag: "Swine Wave",
                    bodyLines: [
                        "Lines stretched across College Green for autograph snorts and motivational oinks.",
                        "Marketing majors analyzing the brand pivot into artisanal slime collabs.",
                        "Rumor says John Pork only speaks in hypebeast ad libs between takes."
                    ],
                    ticker: "Swine wave pop-up crushes previous influencer attendance record"
                },
                {
                    caption: "John Pork launches augmented reality filter",
                    tag: "Oink Reality",
                    bodyLines: [
                        "Campus selfies now feature floating bacon emojis and motivational captions.",
                        "IT department begged students to stop crashing servers with collective squeals.",
                        "Legend says using the filter during class guarantees surprise participation points."
                    ],
                    ticker: "Oink reality filter trends harder than graduation announcements"
                },
                {
                    caption: "Pork debuts campus fashion collab",
                    tag: "Snout Couture",
                    bodyLines: [
                        "Drop includes limited edition bucket hats with built-in ring light mounts.",
                        "Fashion majors fainted when he modeled the holographic trench coat.",
                        "Rumor says wearing the set unlocks front row at every secret show."
                    ],
                    ticker: "Snout couture line sells out before John finishes livestream intro"
                },
                {
                    caption: "John Pork starts motivational voicemail service",
                    tag: "Dial-A-Oink",
                    bodyLines: [
                        "Subscribers receive daily pep talks ending with a perfectly timed 'we ball'.",
                        "Counseling staff impressed at the boost in consistent class attendance.",
                        "Legend says forwarding the voicemail grants instant squad morale buffs."
                    ],
                    ticker: "Dial-a-oink hotline crashes after 5,000 sign-ups in ten minutes"
                },
                {
                    caption: "Pork headlines campus charity stream",
                    tag: "Oink Aid",
                    bodyLines: [
                        "Donations poured in every time he pronounced 'algorithm' like 'algorhythm'.",
                        "Stream featured collabs with geese beatboxers and a surprise donkey cameo.",
                        "Rumor says top donors receive personalized ringtone oinks."
                    ],
                    ticker: "Oink aid marathon surpasses fundraising goal before midnight"
                },
                {
                    caption: "Influencer pig opens pop-up sound bath",
                    tag: "Sonic Snout",
                    bodyLines: [
                        "Participants float on bean bags while swine ASMR loops through surround sound.",
                        "Wellness center booked three months in advance after the pilot session.",
                        "Legend says attending once resets your sleep schedule to influencer time."
                    ],
                    ticker: "Sonic snout sound bath becomes finals week waitlist phenomenon"
                },
                {
                    caption: "John Pork publishes algorithm survival guide",
                    tag: "Feed Whisperer",
                    bodyLines: [
                        "Chapters include 'honor the scroll gods' and 'respect your ring light'.",
                        "Media studies faculty reluctantly adopt it as supplemental reading.",
                        "Rumor says screenshotting page three boosts your reach for 48 hours."
                    ],
                    ticker: "Feed whisperer handbook triggers content renaissance on campus"
                }
            ]
        },
        {
            id: "lioness-ape",
            variantIndex: 0,
            src: "assets/media/lioness and ape.png",
            alt: "Lioness sharing a dramatic moment with a stylish ape",
            variants: [
                {
                    caption: "Lioness and ape launch power couple podcast",
                    tag: "Apex Duo",
                    bodyLines: [
                        "Spotify exclusive trailer features them roasting campus hustle culture in stereo.",
                        "Students keep asking how to join their mastermind jungle retreat.",
                        "Legend says attending one taping grants immunity from passive-aggressive group texts."
                    ],
                    ticker: "Apex duo podcast dethrones all other campus relationship advice shows"
                },
                {
                    caption: "Wildlife collab drops motivational mixtape",
                    tag: "Jungle Remix",
                    bodyLines: [
                        "Dance team adopted their intro roar as the new halftime hype track.",
                        "Business majors cite the pair in every case study about 'protecting the bag'.",
                        "Rumor says their merch pop-up sold out before doors even opened."
                    ],
                    ticker: "Jungle remix collab charts above lo-fi beats to study to"
                },
                {
                    caption: "Power couple launches mastermind retreat",
                    tag: "Savanna Summit",
                    bodyLines: [
                        "Attendees craft vision boards while roaring affirmations at sunrise.",
                        "MBA students credit the duo for their sudden obsession with jungle metaphors.",
                        "Legend says completing the retreat grants unstoppable networking instincts."
                    ],
                    ticker: "Savanna summit mastermind fills every slot within seven minutes"
                },
                {
                    caption: "Lioness & ape debut energy drink",
                    tag: "Primal Charge",
                    bodyLines: [
                        "Flavor notes: citrus, hustle, and faint jungle thunder per campus rumor.",
                        "Dining hall negotiated exclusive fridge placement after faculty petitions.",
                        "Legend says sipping once lets you power through entire group projects solo."
                    ],
                    ticker: "Primal charge beverage sparks midnight study swarm at the market"
                },
                {
                    caption: "Couple teaches conflict resolution with roar therapy",
                    tag: "Growl Mediation",
                    bodyLines: [
                        "Participants alternate gentle roars and motivational snaps until beef dissolves.",
                        "Residence life confirmed a 40 percent drop in petty group chat drama.",
                        "Rumor says mastering the technique unlocks priority seating at their live show."
                    ],
                    ticker: "Growl mediation workshop rated best new campus intervention"
                },
                {
                    caption: "Jungle duo hosts charity fashion gala",
                    tag: "Runway Roar",
                    bodyLines: [
                        "Step-and-repeat fog machine synced to lioness struts blew everyone's minds.",
                        "Art majors collaborated on sustainable faux fur worthy of a standing ovation.",
                        "Legend says bidding on their signed sunglasses guarantees endless main character arcs."
                    ],
                    ticker: "Runway roar gala raises record funds and breaks three cameras"
                },
                {
                    caption: "Lioness & ape introduce daily affirmation app",
                    tag: "Apex Affirm",
                    bodyLines: [
                        "Push notifications include custom roars telling you to hydrate and chase the bag.",
                        "Students report productivity spikes and the sudden urge to wear sunglasses indoors.",
                        "Legend says enabling roar mode unlocks personal hype tracks during exams."
                    ],
                    ticker: "Apex affirm app hits number one in campus productivity rankings"
                },
                {
                    caption: "Power couple cameos in campus telenovela",
                    tag: "Soap Safari",
                    bodyLines: [
                        "Episode cliffhanger involved overthrowing student debt and the dean simultaneously.",
                        "Film club announced an after-show breakdown to decode all the easter eggs.",
                        "Rumor says binge-watching grants bilingual confidence with a roar accent."
                    ],
                    ticker: "Soap safari mid-season twist becomes top trending clip in dorm feeds"
                }
            ]
        },
        {
            id: "pigeon-confusion",
            variantIndex: 0,
            src: "assets/media/black man butterfly.png",
            alt: "Anime protagonist gesturing at a butterfly with intense curiosity",
            variants: [
                {
                    caption: "Is this a syllabus extension?",
                    tag: "Confusion Arc",
                    bodyLines: [
                        "Student government confirms someone tried to classify the butterfly as extra credit.",
                        "Witness insisted the insect was giving off 'final exam energy' and refused to elaborate.",
                        "Legend says answering correctly unlocks premium printer access for a week."
                    ],
                    ticker: "Confusion arc committee debates if butterfly counts as attendance"
                },
                {
                    caption: "NPC debates reality again",
                    tag: "Butterfly Inquiry",
                    bodyLines: [
                        "Crowd gathered outside Alden chanting 'what is this' in perfect unison.",
                        "Philosophy majors started live-tweeting the debate like it was a campus playoff.",
                        "Rumor says the butterfly now charges consultation fees in exposure bucks."
                    ],
                    ticker: "Butterfly inquiry symposium sells out in 36 seconds"
                },
                {
                    caption: "Student launches butterfly fact-check hotline",
                    tag: "Is This Verified",
                    bodyLines: [
                        "Operators respond with 'maybe' ninety percent of the time and garner rave reviews.",
                        "Biology faculty impressed by the hotline's commitment to uncertainty.",
                        "Legend says calling at 3:33 AM reveals the true nature of syllabus extensions."
                    ],
                    ticker: "Is this verified hotline logs 1,200 calls within first day"
                },
                {
                    caption: "Butterfly enters witness protection program",
                    tag: "Flutter Fugitive",
                    bodyLines: [
                        "Campus security issued a memo warning against unsolicited metaphysical inquiries.",
                        "Drama club volunteers to reenact the chase nightly on the quad.",
                        "Rumor says wearing yellow keeps the insect from exposing your secrets."
                    ],
                    ticker: "Flutter fugitive saga spawns twelve conspiracy TikToks per hour"
                },
                {
                    caption: "Anime protagonist enrolls in logic class",
                    tag: "Philosophy DLC",
                    bodyLines: [
                        "Professor added extra credit just for explaining the butterfly to the newbies.",
                        "Class discussion erupted into meme references and light existential dread.",
                        "Legend says acing the final unlocks the ability to identify vibes instantly."
                    ],
                    ticker: "Philosophy DLC lecture relocates to larger hall due to meme overflow"
                },
                {
                    caption: "Butterfly organizes reality support group",
                    tag: "Winged Therapist",
                    bodyLines: [
                        "Meetings consist of collectively asking 'Is this fine?' until clarity emerges.",
                        "Counseling center supports as long as snacks remain existentially grounded.",
                        "Legend says bringing a chrysanthemum grants VIP seating at the next session."
                    ],
                    ticker: "Winged therapist circle adds second meeting to handle demand"
                },
                {
                    caption: "Campus issues butterfly tax forms",
                    tag: "Audit Arc",
                    bodyLines: [
                        "Rat accountant insists intangible vibes count as reportable side income.",
                        "Students file returns listing 'confusion dividends' and 'bafflement credits'.",
                        "Rumor says submitting on time spawns bonus scholarship energy."
                    ],
                    ticker: "Audit arc paperwork extends deadline citing metaphysical backlog"
                },
                {
                    caption: "Butterfly stars in university recruitment video",
                    tag: "Is This Admissions",
                    bodyLines: [
                        "New tagline: 'Is this your future? Possibly. Come find out.'",
                        "Admissions office delighted by the surge in applicants with chaotic energy.",
                        "Legend says spotting the butterfly on tour guarantees spotting the campus cryptid too."
                    ],
                    ticker: "Is this admissions campaign achieves record open-house registrations"
                }
            ]
        },
        {
            id: "ronaldo-speed",
            variantIndex: 0,
            src: "assets/media/Cristiano ronaldo and pregnant ishowspeed.png",
            alt: "Ronaldo hugging a glowing pregnant Speed on the beach",
            variants: [
                {
                    caption: "World cup gender reveal goes off-script",
                    tag: "Goal Celebration",
                    bodyLines: [
                        "Sports comm majors analyzing the hug like it's the Zapruder film of soccer lore.",
                        "Fans insist the baby already has a brand deal and a highlight reel.",
                        "Legend says the waves chant 'Siuuu' every time Speed laughs."
                    ],
                    ticker: "Goal celebration beach shoot interrupts heavy finals cram session"
                },
                {
                    caption: "Beachfront bromance melts the algorithm",
                    tag: "Siuu Saga",
                    bodyLines: [
                        "Campus watch party screamed louder for this reveal than actual match highlights.",
                        "Merch drop rumored to include matching belly warmers and CR7 towels.",
                        "Rumor says the child already committed to dual majors in hype and hyper-speed."
                    ],
                    ticker: "Siuu saga photo set crashes campus intranet within minutes"
                },
                {
                    caption: "Pregnancy announcement spawns new campus chant",
                    tag: "Goal Reveal",
                    bodyLines: [
                        "Student section tested three harmonies before choosing the most dramatic Siuuu.",
                        "Music department analyzing the chant as a legitimate sonic boom event.",
                        "Legend says joining in sync unlocks perfect hat-trick energy for finals."
                    ],
                    ticker: "Goal reveal chant echoes across court street past midnight"
                },
                {
                    caption: "Ronaldo launches prenatal free-kick clinic",
                    tag: "Bump Benders",
                    bodyLines: [
                        "Session includes breathing exercises timed to legendary goal replays.",
                        "Athletic trainers now offer special shin guards for expectant superfans.",
                        "Rumor says mastering the curve shot grants your baby elite dribble stats."
                    ],
                    ticker: "Bump benders workshop oversubscribed in under five minutes"
                },
                {
                    caption: "Speed premieres lullaby mixtape",
                    tag: "Sonic Cradle",
                    bodyLines: [
                        "Tracks alternate between hype intros and soothing whistle tones.",
                        "Campus radio adds the mixtape to late-night rotation without hesitation.",
                        "Legend says streaming the album bumps your sprint speed during 8AM commutes."
                    ],
                    ticker: "Sonic cradle playlist dethrones lo-fi for finals wind-down"
                },
                {
                    caption: "Beach hug becomes new team-building exercise",
                    tag: "Bond Drill",
                    bodyLines: [
                        "Campus rec replicates the pose for intramural trust falls with surprising success.",
                        "Sports psych majors measuring the serotonin spikes mid-embrace.",
                        "Rumor says reenacting the moment grants midterm clutch bonuses."
                    ],
                    ticker: "Bond drill team training sweeps club sports for morale boost"
                },
                {
                    caption: "Prenatal hype conference announced",
                    tag: "Goal Dad Summit",
                    bodyLines: [
                        "Keynotes cover co-parenting with stadium speakers and proper celebration choreography.",
                        "Merch includes matching bibs reading 'built different since womb'.",
                        "Rumor says VIP passes include one complimentary victory lap with Speed."
                    ],
                    ticker: "Goal dad summit sells out before the highlight reel finishes"
                },
                {
                    caption: "Ronaldo & Speed unveil maternity athleisure line",
                    tag: "Cradle Fit",
                    bodyLines: [
                        "Designs feature breathable metallic fabrics with built-in goal counters.",
                        "Fashion faculty applauds the balance between drip and practicality.",
                        "Legend says wearing the set grants perfect penalty kick temperature regulation."
                    ],
                    ticker: "Cradle fit lookbook dominates campus fashion feeds"
                }
            ]
        },
        {
            id: "skibidi-toilet",
            variantIndex: 0,
            src: "assets/media/skibidi toilet.png",
            alt: "Skibidi toilet creature emerging with menacing grin",
            variants: [
                {
                    caption: "Specimen 094324 reclaims the restroom",
                    tag: "Specimen 094324",
                    bodyLines: [
                        "Maintenance begged students to stop flushing Ohio cryptids, yet 094324 keeps clocking in for work.",
                        "Legend says 094324 dispenses life advice if you slide a Baja Blast under the stall door.",
                        "Housing now lists 'Skibidi adjacency' as a dorm amenity thanks to 094324's residency."
                    ],
                    ticker: "Specimen 094324 hijacks third-floor restroom orientation"
                },
                {
                    caption: "Toilet ambassador schedules office hours",
                    tag: "Porcelain Plenipotentiary",
                    bodyLines: [
                        "Custodial staff reports 094324 offering conflict mediation between roommates mid-flush.",
                        "Students claim the ambassador grades your riz before allowing hand soap access.",
                        "Someone tried to install a lid lock; the specimen negotiated better benefits instead."
                    ],
                    ticker: "Porcelain ambassador 094324 moderates hallway diplomacy"
                },
                {
                    caption: "Specimen launches motivational bidet blasts",
                    tag: "Turbo Rinse",
                    bodyLines: [
                        "Recipients report sudden clarity about their five-year plans mid-splash.",
                        "Facilities filed the experience under 'unorthodox yet effective'.",
                        "Legend says requesting the deluxe rinse grants temporary invulnerability to cringe."
                    ],
                    ticker: "Turbo rinse motivational program raises hallway morale by 18%"
                },
                {
                    caption: "Skibidi toilet drops surprise mixtape",
                    tag: "Flush Beats",
                    bodyLines: [
                        "Tracklist features pipes percussion and guest vocals from the geese.",
                        "DJ club pressed glow-in-the-dark vinyl exclusively for midnight sets.",
                        "Rumor says listening on loop stops Canvas from timing out during uploads."
                    ],
                    ticker: "Flush beats EP debuts at number one on campus meme charts"
                },
                {
                    caption: "Specimen moderates panel on dorm etiquette",
                    tag: "Toilet TED",
                    bodyLines: [
                        "Key takeaways: wipe your sink, respect quiet flush hours, hydrate anyway.",
                        "Student government impressed by the toilet's mastery of parliamentary swirl-calls.",
                        "Legend says asking a smart question grants extra tissues for the semester."
                    ],
                    ticker: "Toilet TED talk now required viewing during RA training"
                },
                {
                    caption: "Specimen launches campus alert system",
                    tag: "Bowl Broadcast",
                    bodyLines: [
                        "Push notifications include siren emojis and cryptic bathroom haikus.",
                        "IT confirmed the alerts bypass Do Not Disturb because they are 'that important'.",
                        "Rumor says acknowledging the alert with a salute reduces chaos on your floor."
                    ],
                    ticker: "Bowl broadcast service reaches 10,000 subscribers in 24 hours"
                },
                {
                    caption: "Skibidi specimen opens pop-up escape room",
                    tag: "Flush Quest",
                    bodyLines: [
                        "Teams solve plumbing riddles while dodging choreographed spray patterns.",
                        "Mechanical engineering club offered to build expansions if given unlimited plungers.",
                        "Legend says finishing under ten minutes grants VIP bathroom pass privileges."
                    ],
                    ticker: "Flush quest escape room sells out weeks in advance"
                },
                {
                    caption: "Specimen piloting dorm tourism program",
                    tag: "Porcelain Passport",
                    bodyLines: [
                        "Guided tours showcase top-tier stalls, legendary graffiti, and hydration stations.",
                        "Orientation leaders relieved to have official toilet representation at last.",
                        "Rumor says stamping your passport provides immunity from random flush jump scares."
                    ],
                    ticker: "Porcelain passport tours become hottest new student tradition"
                }
            ]
        },
        {
            id: "smiling-nugget",
            variantIndex: 0,
            src: "assets/media/smiling-nugget.png",
            alt: "Smirking chicken nugget meme face",
            variants: [
                {
                    caption: "Smiling nugget annexes the sauce bar",
                    tag: "Sauce Coup",
                    bodyLines: [
                        "Campus dining reports the nugget now runs the condiment black market; honey mustard futures just tanked.",
                        "RAs caught the nugget giving midnight TED Talks to frozen tenders about hustle culture.",
                        "Finance quietly reclassified the nugget as an emotional support entree to avoid another uprising."
                    ],
                    ticker: "Smiling nugget unionizes every packet in the condiment bar"
                },
                {
                    caption: "Deep-fried diplomat negotiates cafeteria ceasefire",
                    tag: "Fryer Diplomat",
                    bodyLines: [
                        "Witnesses saw the nugget brokering peace between waffle fries and curly fries at 2AM.",
                        "Rumor says the nugget offered extra dipping sauce in exchange for eternal cafeteria loyalty.",
                        "Meal swipe economists now list the nugget as a volatile but undeniable power broker."
                    ],
                    ticker: "Deep-fried diplomat schedules condiment peace summit"
                },
                {
                    caption: "Brainrot nugget hosts midnight sermon",
                    tag: "Late Night Lore",
                    bodyLines: [
                        "Students swear the nugget preaches side quests about self-actualization and sodium intake.",
                        "Campus radio accidentally broadcast the nugget's sermon; ratings hit an all-time chaotic high.",
                        "Any student denying the nugget's gospel gets pelted with stale tater tots on sight."
                    ],
                    ticker: "Nugget gospel hijacks campus radio graveyard slot"
                },
                {
                    caption: "Nugget opens financial literacy boot camp",
                    tag: "Breaded Budget",
                    bodyLines: [
                        "Attendees learn to diversify sauce investments and dodge impulse vending spends.",
                        "Economics majors stunned the nugget predicted meal swipe inflation months ago.",
                        "Legend says completing the course grants platinum swipe access at midnight."
                    ],
                    ticker: "Breaded budget seminar eliminates overdraft fees in one residence hall"
                },
                {
                    caption: "Smiling nugget curates campus art exhibit",
                    tag: "Fry Frame",
                    bodyLines: [
                        "Gallery features ketchup splatter canvases and interpretive sauce packets.",
                        "Critics call it 'crispy postmodernism with a side of existential crunch'.",
                        "Rumor says scanning the QR codes unlocks hidden recipes for feral focus."
                    ],
                    ticker: "Fry frame pop-up draws record donations and sauce trades"
                },
                {
                    caption: "Nugget officiates inter-dorm peace treaty",
                    tag: "Pax Platter",
                    bodyLines: [
                        "Signing ceremony included double dipping as a symbol of mutual trust.",
                        "Rival dorm leaders offered ranch tributes while chanting 'we sauce together'.",
                        "Legend says the treaty ensures unlimited waffle fry refills during finals."
                    ],
                    ticker: "Pax platter accord ends decades-long condiment cold war"
                },
                {
                    caption: "Nugget launches mindfulness app",
                    tag: "Breathe & Bread",
                    bodyLines: [
                        "Push notifications: 'inhale confidence, exhale crumbs'.",
                        "Counseling center reports reduced stress thanks to guided sauce meditations.",
                        "Rumor says enabling crispy mode generates ASMR crunch loops for deep focus."
                    ],
                    ticker: "Breathe & bread download count surpasses campus attendance"
                },
                {
                    caption: "Smiling nugget hosts underground supper club",
                    tag: "Secret Sauce",
                    bodyLines: [
                        "Entry password rotates between 'we munch' and 'bring napkins'.",
                        "Menu includes deconstructed tater tot flights and existential dipping debates.",
                        "Legend says sharing a table grants life-long immunity from bland meals."
                    ],
                    ticker: "Secret sauce society sells memberships faster than homecoming tix"
                },
                {
                    caption: "Nugget pioneers sustainable fryer energy",
                    tag: "Eco Crisp",
                    bodyLines: [
                        "Engineering majors helped rig a system where grease powers the dorm fairy lights.",
                        "Green initiative awards the nugget a golden spatula for innovation.",
                        "Rumor says volunteering earns you unlimited swipe of the eco-friendly garlic aioli."
                    ],
                    ticker: "Eco crisp rollout slashes cafeteria power bill by double digits"
                }
            ]
        },
        {
            id: "sonic-donkey",
            variantIndex: 0,
            src: "assets/media/sonic donkey.png",
            alt: "Donkey cosplaying as Sonic the Hedgehog mid-sprint",
            variants: [
                {
                    caption: "Speed donkey clears Green Hill in 4 seconds",
                    tag: "Blue Blur Beast",
                    bodyLines: [
                        "Track team retired their stopwatches after the donkey started doing laps for fun.",
                        "Pep band added a remix of Green Hill Zone just to keep up with the hype.",
                        "Legend says feeding it chili dogs unlocks turbo hooves mode."
                    ],
                    ticker: "Blue blur beast donkey qualifies for every varsity sport simultaneously"
                },
                {
                    caption: "Cosplay donkey introduces chaos emerald study tips",
                    tag: "Hoof Dash",
                    bodyLines: [
                        "Students now chase the donkey around campus hoping to absorb productivity energy.",
                        "Facilities requested it slow down; the donkey responded with loop-de-loops.",
                        "Rumor says completing its side quest grants +10 to assignment speedrunning."
                    ],
                    ticker: "Hoof dash clinic promises exam prep at supersonic velocity"
                },
                {
                    caption: "Speed donkey launches late-night delivery service",
                    tag: "HoofDash Prime",
                    bodyLines: [
                        "Orders arrive before you finish typing the address thanks to warp-hoof tech.",
                        "Campus dining asked nicely for the donkey to stop outrunning meal robots.",
                        "Legend says tipping with chili dogs unlocks priority boost for a week."
                    ],
                    ticker: "HoofDash prime breaks delivery time records across all dorms"
                },
                {
                    caption: "Donkey opens time-trial obstacle course",
                    tag: "Ring Road",
                    bodyLines: [
                        "Participants sprint through golden hula hoops while donkey commentators shout split times.",
                        "PE credits now available for conquering the loop in under 45 seconds.",
                        "Rumor says finding the hidden emerald grants zero-lag Wi-Fi in the basement."
                    ],
                    ticker: "Ring road challenge draws lines around the rec center at dawn"
                },
                {
                    caption: "Blue donkey DJs chiptune remix night",
                    tag: "Pixel Hoof",
                    bodyLines: [
                        "Set includes remastered Green Hill Zone layered with coconut-scented fog.",
                        "Crowd discovered the donkey scratching records with actual horseshoes.",
                        "Legend says requesting 'escape from the finals room' unlocks a hidden encore."
                    ],
                    ticker: "Pixel hoof rave forces library to extend quiet hours waiver"
                },
                {
                    caption: "Donkey offers finals-week speed mentoring",
                    tag: "Turbo TA",
                    bodyLines: [
                        "Sessions last three minutes but somehow cover the entire syllabus with memes.",
                        "Professors grateful someone finally made kinetic pacing fashionable.",
                        "Rumor says attending once lets you fast-forward through boring slides in real life."
                    ],
                    ticker: "Turbo TA donkey mentoring waitlist surpasses campus population"
                },
                {
                    caption: "Speed donkey starts mindfulness sprint club",
                    tag: "Zen Dash",
                    bodyLines: [
                        "Joggers inhale while counting rings and exhale to loop-de-loop affirmations.",
                        "Wellness center skeptical until they saw the heart rate data glow.",
                        "Legend says hitting stride with the donkey grants glitch-free mind palaces."
                    ],
                    ticker: "Zen dash sunrise runs become new campus cult classic"
                },
                {
                    caption: "Donkey hosts cosplay repair pop-up",
                    tag: "Hoof Stitch",
                    bodyLines: [
                        "Hot glue guns replaced horseshoes for the evening and nobody complained.",
                        "Crafting club thrilled to share warp-speed sewing tips with the blue blur.",
                        "Rumor says finishing repairs before sundown earns extra invincibility frames."
                    ],
                    ticker: "Hoof stitch workshop rescues thirty costumes ahead of con weekend"
                }
            ]
        },
        {
            id: "spider-kitten",
            variantIndex: 0,
            src: "assets/media/spider kitten.png",
            alt: "Wide-eyed kitten perched on spider legs like a cursed mech",
            variants: [
                {
                    caption: "Arachnicat patrol launches midnight security detail",
                    tag: "Eight-Legged Purr",
                    bodyLines: [
                        "Library mice reportedly filed relocation papers within the hour.",
                        "Students pay three treats to hitch a ride between study rooms like royalty.",
                        "Legend says the purr vibrates at the exact frequency that kills procrastination."
                    ],
                    ticker: "Eight-legged purr squad now offering express hallway transport"
                },
                {
                    caption: "Cursed mech kitten does parkour between stacks",
                    tag: "Web Crawler",
                    bodyLines: [
                        "Campus IT confirming dozens of routers suddenly show paw-shaped footprints.",
                        "Anyone ignoring hydration reminders gets cocooned in yarn 'for reflection time'.",
                        "Rumor says gifting laser pointers unlocks stealth cuddle DLC."
                    ],
                    ticker: "Web crawler kitten captures the dean's attention mid-board meeting"
                },
                {
                    caption: "Spider kitten opens express tutoring service",
                    tag: "Pounce Prep",
                    bodyLines: [
                        "Students dangle questions on strings; the kitten answers with rapid-fire chirps.",
                        "Grades spiked once the tutor started weaving mnemonic webs across whiteboards.",
                        "Legend says tipping in catnip grants instant recall during finals."
                    ],
                    ticker: "Pounce prep tutoring breaks record for overnight grade turnarounds"
                },
                {
                    caption: "Arachnicat DJs eight-track lo-fi set",
                    tag: "Webstep",
                    bodyLines: [
                        "Turntables mounted on each paw produce surround-sound purr bass.",
                        "Study lounge converted into neon jungle with yarn laser grids.",
                        "Rumor says staying through the encore grants eight hours of uninterrupted focus."
                    ],
                    ticker: "Webstep lo-fi session becomes finals survival soundtrack"
                },
                {
                    caption: "Kitten patrol issues hallway web passes",
                    tag: "Thread Control",
                    bodyLines: [
                        "Residents must show proof of hydration to access the face-length threads.",
                        "Custodial crews grateful the webs double as lost ID catchers.",
                        "Legend says receiving a paw stamp guarantees safe passage until midnight."
                    ],
                    ticker: "Thread control checkpoints reduce hallway chaos to manageable levels"
                },
                {
                    caption: "Spider kitty stars in campus horror-comedy",
                    tag: "Creep & Cuddle",
                    bodyLines: [
                        "Film majors insisted on practical effects; the cat insisted on twelve treats.",
                        "Premiere audience screamed then demanded plush merch immediately afterward.",
                        "Rumor says watching twice in a row grants eight extra snooze minutes per morning."
                    ],
                    ticker: "Creep & cuddle midnight screening becomes instant cult classic"
                },
                {
                    caption: "Kitten launches co-working web pods",
                    tag: "Silk Seats",
                    bodyLines: [
                        "Students lounge in hammock cocoons while the cat monitors vibe compliance.",
                        "Productivity soared as long as nobody spooked the yarn sensors.",
                        "Legend says booking a pod guarantees zero laptop crashes for the session."
                    ],
                    ticker: "Silk seats co-working lounge adds extra pods due to 3AM demand"
                },
                {
                    caption: "Spider kitten hosts midnight whisper choir",
                    tag: "Eightfold Chorus",
                    bodyLines: [
                        "Participants hum lullabies while the cat pulses gentle bioluminescent whiskers.",
                        "Residence hall noise complaints replaced with 'thank you' notes.",
                        "Rumor says singing along grants eight simultaneous good luck charms."
                    ],
                    ticker: "Eightfold chorus lullaby nights become official stress relief event"
                }
            ]
        },
        {
            id: "stoneface-rat",
            variantIndex: 0,
            src: "assets/media/stonefaced rat.png",
            alt: "Stoic rat staring into the void like it pays taxes",
            variants: [
                {
                    caption: "Rat clocks in for night shift at vibes department",
                    tag: "Grim Analyst",
                    bodyLines: [
                        "HR reports the rat now handles all 'we need to talk' calendar invites.",
                        "Witnesses swear it judges every microwave mess with silent disappointment.",
                        "Legend says staring back grants you a glimpse of your to-do list future."
                    ],
                    ticker: "Grim analyst rat chairs emergency meeting on hallway crumbs"
                },
                {
                    caption: "Campus accountant but make it rodent",
                    tag: "Numbers Gnaw",
                    bodyLines: [
                        "Finance club inducted the rat after it balanced their snack budget in five minutes.",
                        "Rat reportedly files noise complaints using perfectly formatted spreadsheets.",
                        "Rumor says sliding it a cheese cube earns you one late fee forgiveness token."
                    ],
                    ticker: "Numbers gnaw rat releases fiscal year memes with zero emotion"
                },
                {
                    caption: "Rat leads silent productivity sprint",
                    tag: "Crunch Time",
                    bodyLines: [
                        "Participants type furiously while the rat judges posture and spreadsheet hygiene.",
                        "Library declares the program shockingly effective despite zero pep talks.",
                        "Legend says completing the sprint earns a solemn nod worth five GPA points."
                    ],
                    ticker: "Crunch time rat sprint fills every study seat before dawn"
                },
                {
                    caption: "Rat opens forensic calculator lab",
                    tag: "Audit Burrow",
                    bodyLines: [
                        "Mystery of the missing meal swipes solved in under twelve minutes with chalk diagrams.",
                        "Campus detective club now meets exclusively in the rat's office nooks.",
                        "Rumor says presenting your case with cheese samples expedites verdict delivery."
                    ],
                    ticker: "Audit burrow rat cracks notorious vending machine heist cold case"
                },
                {
                    caption: "Stoic rat moderates roommate budget summit",
                    tag: "Expense Council",
                    bodyLines: [
                        "Charts projected on walls while the rat taps a pointer with ominous precision.",
                        "Disputes settled once everyone accepted the rat's line-item roast sessions.",
                        "Legend says signing the agreement prevents impulse geode purchases for a month."
                    ],
                    ticker: "Expense council rat mediator hailed as campus hero of frugality"
                },
                {
                    caption: "Rat logs cafeteria satisfaction metrics",
                    tag: "Grim Taster",
                    bodyLines: [
                        "Each bite recorded with a disapproving squeak or a rare nod.",
                        "Dining staff consider the feedback invaluable, if slightly terrifying.",
                        "Rumor says matching its palate ensures premium dessert rations."
                    ],
                    ticker: "Grim taster rat publishes brutally honest dining hall scorecard"
                },
                {
                    caption: "Rat curates minimalist meme gallery",
                    tag: "Deadpan Display",
                    bodyLines: [
                        "Exhibit features black-and-white pie charts captioned 'lol'.",
                        "Art critics call it a masterclass in subdued chaos energy.",
                        "Legend says taking a silent selfie with the rat unlocks secret captions."
                    ],
                    ticker: "Deadpan display opening night draws record attendance for zero jokes"
                },
                {
                    caption: "Rat teaches intro to poker face 101",
                    tag: "Stone Seminar",
                    bodyLines: [
                        "Lesson one: blink less than the geese. Lesson two: reveal nothing, ever.",
                        "The class final involves staring down the donkey NPC without flinching.",
                        "Rumor says passing grants immunity to all future vibe checks."
                    ],
                    ticker: "Stone seminar graduates hailed as unstoppable in group projects"
                }
            ]
        },
        {
            id: "tungtung",
            variantIndex: 0,
            src: "assets/media/tungtungtungsahur.png",
            alt: "Hyperactive midnight broadcaster screaming into a megaphone",
            variants: [
                {
                    caption: "Tungtung alarm hijacks 4AM sahur wake-up calls",
                    tag: "Megaphone Mayhem",
                    bodyLines: [
                        "Residents rave about the hype; campus security begs for a volume slider.",
                        "Sound department measured the frequency and labeled it 'holy chaos'.",
                        "Legend says joining the chant guarantees breakfast before the dining hall opens."
                    ],
                    ticker: "Megaphone mayhem host schedules sunrise rave on Court Street"
                },
                {
                    caption: "Brainrot broadcast back from the graveyard slot",
                    tag: "Sahur Siren",
                    bodyLines: [
                        "Radio majors fighting over who gets to co-host the next delirious episode.",
                        "Students report the siren voice invading their dreams with meme reminders.",
                        "Rumor says gifting a thermos of kopi grants a shoutout during finals."
                    ],
                    ticker: "Sahur siren phone alerts trend as new campus alarm tone"
                },
                {
                    caption: "Tungtung host adds drumline remix",
                    tag: "Breakfast Beatdown",
                    bodyLines: [
                        "Percussion majors volunteer at ungodly hours just to ride the hype wave.",
                        "Neighbors claimed the tempo cured their snooze button addiction instantly.",
                        "Legend says recording the beat as your ringtone increases punctuality by 23%."
                    ],
                    ticker: "Breakfast beatdown reruns rank as top wake-up playlist"
                },
                {
                    caption: "Tungtung opens merch booth at 4:01 AM",
                    tag: "Siren Drip",
                    bodyLines: [
                        "Limited edition hoodies read 'I survived the dawn drop'.",
                        "Reselling is banned; the host personally yells at price gougers via megaphone.",
                        "Rumor says wearing the drip grants immunity to participation cold calls."
                    ],
                    ticker: "Siren drip pop-up sells out before sunrise hits the clock tower"
                },
                {
                    caption: "Tungtung collabs with cafeteria",
                    tag: "Sahur Buffet",
                    bodyLines: [
                        "Menu features spicy noodles engineered to match the host's decibel level.",
                        "Sleeping students awoke to the smell of nasi lemak and pure adrenaline.",
                        "Legend says finishing the combo meal unlocks unstoppable 9AM focus."
                    ],
                    ticker: "Sahur buffet line wraps around block in under six minutes"
                },
                {
                    caption: "Tungtung announces scholarship for loud dreamers",
                    tag: "Mega Grant",
                    bodyLines: [
                        "Applicants submit voice notes explaining how they'd hype the dawn shift.",
                        "Financial aid office genuinely touched by the unhinged sincerity.",
                        "Rumor says finalists receive custom earplugs embroidered with motivational quotes."
                    ],
                    ticker: "Mega grant competition generates 800 screaming submissions"
                },
                {
                    caption: "Tungtung leads sunrise flash workout",
                    tag: "Decibel Drills",
                    bodyLines: [
                        "Participants do high knees synced to megaphone cadences.",
                        "Campus rec recorded the highest energy output ever at dawn.",
                        "Legend says surviving the cool down keeps you awake for 36 hours straight."
                    ],
                    ticker: "Decibel drills session fills entire green before first class"
                },
                {
                    caption: "Tungtung installs hotline for sleepy professors",
                    tag: "Faculty Wake",
                    bodyLines: [
                        "Professors can request custom hype intros before entering lecture halls.",
                        "Students rating classes based on megaphone cameo frequency.",
                        "Rumor says overusing the hotline summons an all-staff kazoo parade."
                    ],
                    ticker: "Faculty wake hotline causes 8AM attendance to spike dramatically"
                }
            ]
        },
        {
            id: "wizard-toilet",
            variantIndex: 0,
            src: "assets/media/wizard on fiery toilet.png",
            alt: "Wizard reading while sitting on a blazing porcelain throne",
            variants: [
                {
                    caption: "Bathroom wizard drops flaming lore patch notes",
                    tag: "Spellbound Stall",
                    bodyLines: [
                        "Facilities upgraded fire alarms after the wizard cast 'hot take' literally.",
                        "Students line up for prophecy readings delivered between page turns.",
                        "Legend says leaving a lavender candle grants you spoiler-free guidance for midterms."
                    ],
                    ticker: "Spellbound stall wizard announces bathroom office hours"
                },
                {
                    caption: "Toilet blaze officially part of campus heating plan",
                    tag: "Inferno Throne",
                    bodyLines: [
                        "Green initiatives committee insists it's carbon-neutral wizardry, actually.",
                        "Wand maintenance club now offering electives on porcelain pyromancy.",
                        "Rumor says flushing while he chants summons extra credit (terms apply)."
                    ],
                    ticker: "Inferno throne featured in sustainability zine as chaotic good"
                },
                {
                    caption: "Wizard debuts bathroom potion tasting",
                    tag: "Lavatory Libations",
                    bodyLines: [
                        "Flavors include 'spicy lavender' and 'midterm mercy'.",
                        "Participants required to sign waivers acknowledging possible sparkle side effects.",
                        "Legend says sipping the gold potion grants temporary resistance to pop quizzes."
                    ],
                    ticker: "Lavatory libations tour books solid for entire semester"
                },
                {
                    caption: "Flame wizard publishes restroom etiquette grimoire",
                    tag: "Basin Codex",
                    bodyLines: [
                        "Rule one: luminate candles clockwise; rule two: never question the steam.",
                        "Facilities begrudgingly added the codex to official policy after several portents.",
                        "Legend says memorizing chapter four unlocks infinite paper towel respawns."
                    ],
                    ticker: "Basin codex becomes required reading for restroom monitors"
                },
                {
                    caption: "Wizard offers finals week stress incineration",
                    tag: "Burnout Banisher",
                    bodyLines: [
                        "Students toss syllabi into magical flames and scream quietly.",
                        "Counselors approve as long as nobody throws actual homework in there.",
                        "Rumor says the ash transforms into extra credit coupons under moonlight."
                    ],
                    ticker: "Burnout banisher ritual extended due to overwhelming demand"
                },
                {
                    caption: "Bathroom wizard announces flush-based transportation",
                    tag: "Portal Porcelain",
                    bodyLines: [
                        "Commuters step into the stall and emerge near their next class—mostly.",
                        "Transit authority politely asked him to stop bending space without a permit.",
                        "Legend says carrying a rubber duck stabilizes your coordinates."
                    ],
                    ticker: "Portal porcelain commute option briefly approved then reconsidered"
                },
                {
                    caption: "Wizard collaborates with theatre club",
                    tag: "Stage Flush",
                    bodyLines: [
                        "New production features pyro toilets and ballads about proper handwashing.",
                        "Ticket sales skyrocketed once people saw the charmed bidet choreography.",
                        "Rumor says shouting encore triggers a glitter geyser visible from the quad."
                    ],
                    ticker: "Stage flush musical wins spontaneous standing ovations nightly"
                },
                {
                    caption: "Wizard hosts quiet hours for introverts",
                    tag: "Still Flame",
                    bodyLines: [
                        "Fire crackles softly while patrons read bathroom graffiti like prophetic sonnets.",
                        "Noise complaints drop dramatically whenever the still flame sign appears.",
                        "Legend says journaling beside the calm blaze locks in your goals subconsciously."
                    ],
                    ticker: "Still flame sanctuary earns campus wellness award"
                }
            ]
        },
        {
            id: "baking-breead",
            variantIndex: 0,
            src: "assets/media/Baking Breead instead of breaking bad.png",
            alt: "Breaking Bad parody duo presenting a tray of dramatic bread",
            variants: [
                {
                    caption: "Baking Breead finale leaks mid-semester",
                    tag: "Loaf Lab",
                    bodyLines: [
                        "Chem prof confirmed the lab goggles are just for the sourdough starter glow.",
                        "Campus police walked in, saw the baguettes, and left with three samples.",
                        "Legend says the secret ingredient is extra credit kneaded in at 3AM."
                    ],
                    ticker: "Loaf lab chemists debut limited edition Breead drop"
                },
                {
                    caption: "Say my knead",
                    tag: "Carb Cartel",
                    bodyLines: [
                        "Residence hall ovens now on a waitlist thanks to this carb empire.",
                        "Students report the bread smells like GPA recovery and chaos.",
                        "Rumor says knocking twice unlocks the cinnamon roll expansion pack."
                    ],
                    ticker: "Carb cartel breead truck sells out before sunrise"
                },
                {
                    caption: "Breead lab opens sourdough think tank",
                    tag: "Crumb Council",
                    bodyLines: [
                        "Members debate hydration percentages like it's UN diplomacy.",
                        "Economics majors modeling the crust elasticity as market volatility.",
                        "Legend says attending guarantees perfect toaster settings for life."
                    ],
                    ticker: "Crumb council summit trends as hottest late-night study break"
                },
                {
                    caption: "Breead duo releases scented candle line",
                    tag: "Proof Positive",
                    bodyLines: [
                        "Scents include 'Breaking Baguette' and 'Overproofed Plot Twist'.",
                        "Campus store sold out immediately; maintenance reported zero regrets.",
                        "Rumor says lighting two candles simultaneously raises roommates' vibes 30%."
                    ],
                    ticker: "Proof positive candle drop melts student union credit card readers"
                },
                {
                    caption: "Chem lab crossovers continue with gluten reactor",
                    tag: "Lab Loaf",
                    bodyLines: [
                        "Safety goggles required but aprons optional according to the duo.",
                        "Dean begged them to stop naming experiments after bread-based puns.",
                        "Legend says tasting the prototype adds +5 resilience to pop quizzes."
                    ],
                    ticker: "Lab loaf demonstration draws both foodies and physics majors"
                },
                {
                    caption: "Breead caters midnight finals vigil",
                    tag: "Yeast Feast",
                    bodyLines: [
                        "Loaves stamped with motivational quotes like 'rise & grind (literally)'.",
                        "Library ventilation now smells suspiciously like cinnamon victory.",
                        "Rumor says hugging a warm loaf prevents tears during cram sessions."
                    ],
                    ticker: "Yeast feast vigil becomes tradition for all-nighter survival"
                },
                {
                    caption: "Breead duo launches ASMR crackle channel",
                    tag: "Crunch Stream",
                    bodyLines: [
                        "Viewers claim the crust snaps cured their scroll addiction temporarily.",
                        "Audio engineering club impressed by the crumb's dynamic range.",
                        "Legend says falling asleep to the stream yields perfectly proofed dreams."
                    ],
                    ticker: "Crunch stream subscriber count surpasses dining hall newsletter"
                },
                {
                    caption: "Breead truck partners with art club",
                    tag: "Loaf Gallery",
                    bodyLines: [
                        "Each baguette comes with edible paint pens for expressive crust doodles.",
                        "Studio majors call it 'starch installation' and immediately submit to exhibitions.",
                        "Rumor says winning the weekly art throwdown earns free carbs for a month."
                    ],
                    ticker: "Loaf gallery pop-up creates line stretching past Baker lawn"
                }
            ]
        },
        {
            id: "cat-snake",
            variantIndex: 0,
            src: "assets/media/cat as a snake.png",
            alt: "Elongated cat curled like a serpent with smug expression",
            variants: [
                {
                    caption: "Serpent kitty enforces hallway sssanity",
                    tag: "Flexi Feline",
                    bodyLines: [
                        "RA declared the hallway a no-shoe zone after the cat slithered through.",
                        "Herpetology club wants to recruit it as their new mascot immediately.",
                        "Legend says petting all twelve coils grants immunity to pop quizzes."
                    ],
                    ticker: "Flexi feline cat patrol introduces mandatory slipper protocol"
                },
                {
                    caption: "Snekat approves this study break",
                    tag: "Cozy Coil",
                    bodyLines: [
                        "Library patrons reporting ASMR purrs echoing across the silent floor.",
                        "Students now booking 'coil cuddle' appointments during office hours.",
                        "Rumor says offering tuna unlocks the stealth cuddle animation."
                    ],
                    ticker: "Cozy coil serpent cat opens waitlist for cuddle slots"
                },
                {
                    caption: "Serpentine cat teaches stress management",
                    tag: "Zen Coil",
                    bodyLines: [
                        "Workshops include slow slither breathing and tactical purring.",
                        "Wellness center amazed at the drop in hallway hissy fits.",
                        "Legend says completing the course grants slipper teleportation privileges."
                    ],
                    ticker: "Zen coil seminar becomes hottest ticket during midterms"
                },
                {
                    caption: "Cat-snake guards dorm snack stash",
                    tag: "Coil Patrol",
                    bodyLines: [
                        "Would-be snack thieves turn around when faced with 12 feet of unimpressed feline.",
                        "RAs relieved the enforcement requires zero paperwork beyond sardine tribute records.",
                        "Rumor says winning trust earns a gold-plated ramen keycard."
                    ],
                    ticker: "Coil patrol reduces snack heists to all-time low"
                },
                {
                    caption: "Snekat stars in campus fashion show",
                    tag: "Boa Couture",
                    bodyLines: [
                        "Runway draped in velvet while the cat slither-struts to synthwave.",
                        "Designers highlight the efficiency of one continuous accessory.",
                        "Legend says brushing the sequined scales grants unstoppable outfit confidence."
                    ],
                    ticker: "Boa couture finale triggers standing ovation from entire art department"
                },
                {
                    caption: "Cat-snake opens coil cafe",
                    tag: "Spiral Latte",
                    bodyLines: [
                        "Order window shaped like a terrarium; drinks swirl naturally thanks to tail twirls.",
                        "Latte art features perfect whisker patterns despite the snake mechanics.",
                        "Rumor says the loyalty program offers nine lives worth of free refills."
                    ],
                    ticker: "Spiral latte cafe now required stop on campus food crawl"
                },
                {
                    caption: "Snekat organizes hallway conga line",
                    tag: "Slinky Parade",
                    bodyLines: [
                        "Participants follow the undulating beat while RA claps in confusion.",
                        "Music major replaced the usual playlist with a 20-minute meowwave loop.",
                        "Legend says joining the parade grants sudden ability to dodge geese gracefully."
                    ],
                    ticker: "Slinky parade blocks elevators but boosts morale exponentially"
                },
                {
                    caption: "Serpent cat curates cozy blanket fort",
                    tag: "Nest Mode",
                    bodyLines: [
                        "Stacked pillows arranged into perfect coil-friendly cushions.",
                        "Residents line up to read inside the warm tunnel while rain taps outside.",
                        "Rumor says sharing snacks within the nest ensures top-tier nap quality."
                    ],
                    ticker: "Nest mode lounge doubles as unofficial emotional support bunker"
                }
            ]
        },
        {
            id: "mike-wazowskey",
            variantIndex: 0,
            src: "assets/media/Mike Wazowskey.png",
            alt: "Mike Wazowski meme posing dramatically with extra limbs",
            variants: [
                {
                    caption: "Mike Wazowskey launches midnight motivational tour",
                    tag: "Cyclops Coach",
                    bodyLines: [
                        "Orientation leaders report he keeps shouting 'we scare, we study'.",
                        "Students now chanting 'put that on my syllabus' whenever he blinks.",
                        "Legend says his single-eye stare can grade your essay instantly."
                    ],
                    ticker: "Cyclops coach Mike Wazowskey trends across all dorm floors"
                },
                {
                    caption: "Monsters U exchange program gets unhinged",
                    tag: "Sulley Adjacent",
                    bodyLines: [
                        "Campus tours rerouted after he photobombed every family portrait.",
                        "Somebody handed him a mic and now we have nightly scream karaoke.",
                        "Rumor says high-fiving him upgrades your ID card to elite scream tier."
                    ],
                    ticker: "Sulley adjacent hype night surpasses homecoming attendance"
                },
                {
                    caption: "Mike runs pop-up study scream sessions",
                    tag: "Finals Roar",
                    bodyLines: [
                        "Students release stress via carefully curated shrieks timed to power chords.",
                        "Counselors confirm the acoustics are oddly therapeutic despite eardrum warnings.",
                        "Legend says reaching octave seven grants automatic curve forgiveness."
                    ],
                    ticker: "Finals roar scream lab fills Alden courtyard nightly"
                },
                {
                    caption: "Cyclops coach debuts single-eye mindfulness course",
                    tag: "Focus Sphere",
                    bodyLines: [
                        "Attendees practice staring at one bullet point until it ascends to main quest status.",
                        "Psych majors thrilled to record heart rate drops mid-gaze.",
                        "Rumor says graduating the course gives you x-ray vision for exam hints."
                    ],
                    ticker: "Focus sphere intensives sell out faster than campus yoga"
                },
                {
                    caption: "Mike spearheads campus pep rally",
                    tag: "Scream Squad",
                    bodyLines: [
                        "Cheer team adapted choreography to include one-eyed high kicks.",
                        "Mascot union proud the rally finally features equal parts roar and wholesome chaos.",
                        "Legend says chanting along adds +20 charisma for the rest of the day."
                    ],
                    ticker: "Scream squad pep rally reaches record decibel levels"
                },
                {
                    caption: "Cyclops hosts midnight film festival",
                    tag: "One Eye Cinema",
                    bodyLines: [
                        "Screenings curated exclusively for maximum pupil dilation effects.",
                        "Film majors analyzing the single-eye commentary track for hidden lore.",
                        "Rumor says staying for the 3AM showing unlocks glow-in-the-dark popcorn."
                    ],
                    ticker: "One eye cinema marathon demands extra projector bulbs"
                },
                {
                    caption: "Mike Wazowskey drops fitness challenge",
                    tag: "Cyclops Circuit",
                    bodyLines: [
                        "Workout includes eyeball planks and scream intervals timed to EDM drops.",
                        "Campus rec adjusting HVAC after humidity spikes from collective roars.",
                        "Legend says finishing the circuit once a week grants unstoppable hallway swagger."
                    ],
                    ticker: "Cyclops circuit challenge trending as feral alternative to spin class"
                },
                {
                    caption: "Mike opens scream-powered coffee truck",
                    tag: "Roast & Roar",
                    bodyLines: [
                        "Baristas convert loud encouragement into espresso shots on demand.",
                        "Line wraps around the union because the latte art winks at you.",
                        "Rumor says ordering with a whisper triggers a free refill out of pity."
                    ],
                    ticker: "Roast & roar caffeine truck becomes finals-week lifeline"
                }
            ]
        },
        {
            id: "capy-coconut",
            variantIndex: 0,
            src: "assets/media/Capybara with coconut body.png",
            alt: "Capybara with a coconut torso lounging like a spa host",
            variants: [
                {
                    caption: "Capybara opens coconut hydration lounge",
                    tag: "Coconut Concierge",
                    bodyLines: [
                        "Wellness majors booked back-to-back slots just to absorb the ambient slosh soundtrack.",
                        "Facilities added towel service after the capy insisted on 'premium drip' only.",
                        "Legend says sipping from the coconut grants +12% resilience against surprise quizzes."
                    ],
                    ticker: "Coconut concierge capybara sells out hydration lounge appointments"
                },
                {
                    caption: "Capybara hosts tropical study hall",
                    tag: "Palm Pilot",
                    bodyLines: [
                        "Attendance requires flip-flops and a vow of group chat silence during sunset mode.",
                        "TA hands out mini umbrellas as participation points for staying focused.",
                        "Rumor says highlighting notes with neon markers unlocks complimentary coconuts."
                    ],
                    ticker: "Palm pilot study hall trend sweeps library basement"
                },
                {
                    caption: "Capybara DJ drops lo-fi coconut chill",
                    tag: "Shell Beats",
                    bodyLines: [
                        "Setlist features distant wave loops blended with gentle capybaritone hums.",
                        "Campus radio simulcast the premiere and now the vibe meter refuses to reset.",
                        "Legend says requesting a track politely earns you instant finals-week serenity."
                    ],
                    ticker: "Shell beats lo-fi stream crashes midnight study servers"
                },
                {
                    caption: "Capybara launches floating finals retreat",
                    tag: "Floatcore",
                    bodyLines: [
                        "Participants finish readings while bobbing in kiddie pools with LED coconuts.",
                        "Counseling center approved it as 'unprecedented but soothing'.",
                        "Rumor says falling asleep mid-float results in waking up with a 4.0 manifest."
                    ],
                    ticker: "Floatcore retreat earns emergency waitlist expansion"
                },
                {
                    caption: "Capybara debuts coconut merch drop",
                    tag: "Shell Merch",
                    bodyLines: [
                        "Limited batch beach totes sold out before the QR code fully loaded.",
                        "Marketing minors furious the lookbook is just serene capy glamour shots.",
                        "Legend says owning the tote grants priority access to any hammock on campus."
                    ],
                    ticker: "Shell merch drop causes midnight line outside student union"
                },
                {
                    caption: "Capybara mediates dorm détente with tropical mocktails",
                    tag: "Peace Peel",
                    bodyLines: [
                        "Roommate conflict rate plummeted once coconut mocktails replaced passive-aggressive sticky notes.",
                        "Residence life now staffs the capy as official 'chill coach' twice a week.",
                        "Rumor says clinking shells together locks in chore chart compliance for seven days."
                    ],
                    ticker: "Peace peel summit ends three roommate feuds before curfew"
                }
            ]
        },
        {
            id: "frog-tire",
            variantIndex: 0,
            src: "assets/media/Frog-Tire humanoid.png",
            alt: "Frog fused with a tire mid-bounce like a cursed mascot",
            variants: [
                {
                    caption: "Frog-tire launches commuter shuttle",
                    tag: "Ribbit Ride",
                    bodyLines: [
                        "Arrives exactly on the beat of its own beatboxing croaks every six minutes.",
                        "Transit office debating whether tire squeals count as acceptable horn usage.",
                        "Legend says hopping aboard grants immunity to late arrival side-eye."
                    ],
                    ticker: "Ribbit ride amphibian shuttle outpaces campus scooters"
                },
                {
                    caption: "Frog-tire teaches kinetic cardio",
                    tag: "Tread Bounce",
                    bodyLines: [
                        "PE credits now awarded for synchronized hops around the rec center.",
                        "Biomechanics majors collecting data on amphibian traction like it is a thesis goldmine.",
                        "Rumor says landing a perfect spin unlocks a limited edition tread mark sticker."
                    ],
                    ticker: "Tread bounce class becomes waitlisted in under four minutes"
                },
                {
                    caption: "Frog-tire opens pop-up pit stop cafe",
                    tag: "Pit Croak",
                    bodyLines: [
                        "Menu features nitro cold brew served with tiny lug nut cookies.",
                        "Auto club jealous the latte art forms perfect tread patterns without stencils.",
                        "Legend says tipping with spare change earns a free motivational ribbit."
                    ],
                    ticker: "Pit croak cafe disrupts quiet hours with joyful honks"
                },
                {
                    caption: "Frog-tire MCs midnight parking lot rave",
                    tag: "Neon Rim",
                    bodyLines: [
                        "DJ booth literally spins every time the bass drops, no safety cables needed.",
                        "Campus police shrugged and provided glow vests just to keep up.",
                        "Rumor says filming a TikTok on-site grants algorithm immunity for three posts."
                    ],
                    ticker: "Neon rim rave trends harder than homecoming after-party"
                },
                {
                    caption: "Frog-tire leads pothole awareness parade",
                    tag: "Asphalt Ally",
                    bodyLines: [
                        "Facilities applauded the demonstration once the frog patched two craters mid-speech.",
                        "Engineering majors drafted the parade route with CAD precision just to flex.",
                        "Legend says high-fiving the frog ensures your longboard bearings stay pristine."
                    ],
                    ticker: "Asphalt ally march convinces admin to repave west lot"
                },
                {
                    caption: "Frog-tire offers finals-week spin therapy",
                    tag: "Lap Leaper",
                    bodyLines: [
                        "Students vent while doing gentle figure-eights around the counseling center.",
                        "Therapists report stress levels drop the moment the frog says 'let it roll'.",
                        "Rumor says completing three laps unlocks free noise-canceling earplugs."
                    ],
                    ticker: "Lap leaper spin therapy becomes new finals coping ritual"
                }
            ]
        },
        {
            id: "lebron-sunshine",
            variantIndex: 0,
            src: "assets/media/Lebron james your are my sunshine meme.png",
            alt: "LeBron James holding a handmade 'you are my sunshine' poster with soft smile",
            variants: [
                {
                    caption: "LeBron sunshine pop-up inspires study lounge",
                    tag: "Solar Boost",
                    bodyLines: [
                        "Students lined up to receive individualized affirmations and a slap bracelet.",
                        "Campus lighting crew dimmed fluorescents just to let the poster glow naturally.",
                        "Legend says posing with the sign grants temporary immunity to Canvas outages."
                    ],
                    ticker: "Solar boost pep booth pulls record traffic before midterms"
                },
                {
                    caption: "LeBron hosts gratitude open mic",
                    tag: "Sunbeam Set",
                    bodyLines: [
                        "Performers required to end every story with 'and we still ball'.",
                        "Residence life sponsored free lemonade because branding is everything.",
                        "Rumor says confessing a wholesome secret wins you priority laundry slots."
                    ],
                    ticker: "Sunbeam set gratitude night trends campus-wide"
                },
                {
                    caption: "LeBron leads sunrise hype walk",
                    tag: "Morning MVP",
                    bodyLines: [
                        "Route includes mandatory high-five checkpoints staffed by hype mascots.",
                        "Health center approved it as cardio plus motivational counseling in one.",
                        "Legend says completing the loop grants automatic curve boost vibes."
                    ],
                    ticker: "Morning MVP walk sells out reflective vest inventory"
                },
                {
                    caption: "LeBron sunshine poster becomes therapy dog cape",
                    tag: "Glow Handler",
                    bodyLines: [
                        "Campus pups now parade through finals halls like radiant mascots.",
                        "Petting zoo lines doubled once word spread the cape hums faint hype music.",
                        "Rumor says scratching behind the ears earns a limited-edition motivational sticker."
                    ],
                    ticker: "Glow handler therapy tour melts even the econ majors"
                },
                {
                    caption: "LeBron co-teaches resilience workshop",
                    tag: "Sunshine Seminar",
                    bodyLines: [
                        "Slides include bullet points like 'hydrate, manifest, go 4-for-4 on quizzes'.",
                        "Psych prof admitted the poster achieved higher attendance than any syllabus pitch.",
                        "Legend says reciting the mantra grants clarity on every group project rubric."
                    ],
                    ticker: "Sunshine seminar maxes out auditorium capacity in minutes"
                },
                {
                    caption: "LeBron curates dorm door affirmation swap",
                    tag: "Hall Glow",
                    bodyLines: [
                        "Every door now features handwritten hype quotes sealed with glitter tape.",
                        "RA reported noise complaints replaced by gratitude notes overnight.",
                        "Rumor says whoever hangs the brightest poster wins first dibs on the good shower time."
                    ],
                    ticker: "Hall glow door swap sparks wholesome arms race"
                }
            ]
        },
        {
            id: "walter-cheeseburger",
            variantIndex: 0,
            src: "assets/media/Walter white as a cheese burger.png",
            alt: "Walter White merged with a cheeseburger wearing glasses",
            variants: [
                {
                    caption: "Walter White but make it drive-thru couture",
                    tag: "Heisenburger",
                    bodyLines: [
                        "Dining hall unveiled a pop-up lab serving buns with ominous blue glaze.",
                        "Chem majors grabbing napkins to derive the sauce formula mid-bite.",
                        "Legend says whispering 'say my fry' gets you secret menu access."
                    ],
                    ticker: "Heisenburger special sells out seconds after lunch rush"
                },
                {
                    caption: "Emotional support combo meal goes feral",
                    tag: "Combo Theory",
                    bodyLines: [
                        "Food science majors publishing dissertations on his seasoning ratios.",
                        "Campus security confiscated three propane grills after the soft launch.",
                        "Rumor says trading a chemistry notebook unlocks extra dipping sauce."
                    ],
                    ticker: "Combo theory burger lab announces late-night tasting flight"
                }
            ]
        }
    ];

    const BADGES = [
        "Sponsored",
        "Limited Drop",
        "Dorm Exclusive",
        "Paid Placement",
        "Boosted",
        "Affiliate Link"
    ];

    const AD_LIBRARY = [
        {
            id: "capybara-lounge",
            handle: "@CapyHydrate",
            label: "Dorm Commerce",
            avatar: null,
            badge: "Sponsored",
            headline: "Capybara Hydration Concierge",
            subhead: "Dorm package includes coconut vapor and ambient lo-fi drip.",
            bullets: [
                "Resident reviews average 4.9 hydration emojis after one session.",
                "Includes unlimited cucumber water refills during cram week.",
                "Bundle unlocks priority seating on all courtyard hammocks."
            ],
            cta: "Tap to Hydrate",
            urgency: "Offer ends before finals-week meltdown.",
            disclaimer: "Disclaimer: Capybara not responsible for spilled Baja Blast.",
            url: "https://example.com/capyhydrate"
        },
        {
            id: "frog-commute",
            handle: "@FrogTireClub",
            label: "Campus Transit",
            avatar: null,
            badge: "Promoted",
            headline: "Frog-Tire Commute Pass",
            subhead: "Skip the shuttle – bounce to class in neon style.",
            bullets: [
                "Includes weekly tire shine and motivational ribbits on demand.",
                "Earn loyalty points every time you stick the landing outside Alden.",
                "First lap free for anyone carrying iced coffee and a dream."
            ],
            cta: "Join the Bounce",
            urgency: "Limited to first 64 sign-ups this weekend.",
            disclaimer: "Helmet, kazoo, and playlist sold separately.",
            url: "https://example.com/frogtire"
        },
        {
            id: "banana-masterclass",
            handle: "@BananaMicPro",
            label: "Campus Creators",
            avatar: null,
            badge: "Sponsored",
            headline: "Banana Mic Masterclass",
            subhead: "Unlock potassium-powered riffs for every group presentation.",
            bullets: [
                "Syllabus includes rhyme schemes, hype strategies, and peel care.",
                "Comes with downloadable soundboard for instant crowd gasps.",
                "Graduates report 120% boost in participation grades."
            ],
            cta: "Reserve Your Mic",
            urgency: "Enrollment closes when the dean notices.",
            disclaimer: "Banana may double as emotional support snack.",
            url: "https://example.com/bananamic"
        },
        {
            id: "therapy-dog-cape",
            handle: "@GlowHandlerCo",
            label: "Campus Wellness",
            avatar: null,
            badge: "Paid Placement",
            headline: "Therapy Dog Cape Upgrade",
            subhead: "Wrap finals stress in glow-in-the-dark reassurance.",
            bullets: [
                "Cape hums low-fi hype whenever exam panic spikes.",
                "Includes emergency stash of affirmations under the collar.",
                "Unlocks priority cuddle queue during midnight study sessions."
            ],
            cta: "Add Warm Fuzzies",
            urgency: "Restock alert: next batch arrives after syllabus week.",
            disclaimer: "Results improve when accompanied by snacks.",
            url: "https://example.com/therapycape"
        }
    ];

    const SURVEY_QUESTIONS = [
        "How emotionally prepared are you to stop seeing capybaras in sponsored content?",
        "Would a frog-commute stipend improve your relationship with this brand?",
        "Which roommate should we retarget after you close this ad?",
        "How likely are you to dream about this CTA between 2 and 4 AM?",
        "Be honest: would a glow-in-the-dark dog cape solve midterms for you?",
        "What flavor of influencer coupon best matches your current vibe?",
        "If this ad vanished, how would you discover your next potassium guru?",
        "On a scale of 1-10, how clickable was this headline after three scrolls?"
    ];

    const BASE_TICKER_LINES = [
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

    const CHAOS_LEVELS = [
        { level: 38, label: "Click-through spike detected near Alden study pods" },
        { level: 52, label: "Dorm 7 focus group demanding capybara wellness upsells" },
        { level: 64, label: "Quad saturated with limited-offer QR codes; conversions pending" },
        { level: 71, label: "Influencer squirrels launching pre-roll over College Green" },
        { level: 83, label: "Funnel leakage: midnight ramen ad served 400 percent more impressions" },
        { level: 47, label: "Alert: elevator screens autoplaying donut drops on every floor" },
        { level: 92, label: "Crisis: bathroom wizard subscription booth sold out instantly" },
        { level: 58, label: "Optimization team replacing lecture slides with swipe-up promos" },
        { level: 76, label: "A/B test reportedly broke the campus wifi analytics dashboard" },
        { level: 67, label: "Gigachad geese negotiating brand deal for hallway naming rights" },
        { level: 81, label: "Study goblin franchise unveiling roommate referral loyalty tiers" },
        { level: 69, label: "Urgent memo: RA requests ceasefire on midnight flash-sale sirens" },
        { level: 95, label: "Dean inbox overwhelmed by autoplay nugget ad complaints" },
        { level: 73, label: "Laundry room influencers promise viral results with scented banners" },
        { level: 62, label: "Coffee lab retargeting campaign causing campus-wide caffeine FOMO" },
        { level: 88, label: "Dorm hallway telethon raising banana coin staking fund" },
        { level: 72, label: "Skibidi street team rolling out branded scooters with referral codes" },
        { level: 84, label: "Emergency banner: emotional support brick launching IPO tonight" }
    ];

    const DORM_LORE_HOTLINE = [
        "Room 314 focus group demanded the capybara lounge include tiered pricing.",
        "Laundry room 2A now locked behind subscription-based suds tokens.",
        "Hallway whiteboard rebranded as the dorm conversion dashboard.",
        "East wing charges a QR scan toll before you access the communal kitchen.",
        "Resident cat signed a talent deal to promote overnight study playlists.",
        "RA replaced quiet hours with 'sponsored slots' between midnight and 2 AM.",
        "Vending machine confession booth upsells premium secrets for extra coins.",
        "Elevator now loops frog-tire shuttle ads on every stop until finals end.",
        "Dorm Wi-Fi portal requests an email before loading homework pages.",
        "Knock three times for access to the banana mic masterclass webinar.",
        "Basement lounge runs nonstop demos of the possum productivity course.",
        "Roommate treaty includes mandatory sponsored snack placement on desks.",
        "Fourth floor hallway charging placement fees for new flyer campaigns.",
        "Fridge stocked only with 'emotional support' samples from brand partners.",
        "Fire exit signage replaced by affiliate codes for therapy dog merch.",
        "Thermostat reports temperature in conversion rates after midnight.",
        "Hall Slack debating pre-roll policy for the communal playlist queue.",
        "Inflatable couch now branded; requires official hashtag to sit down.",
        "Group chat awards XP for posting daily clickbait headlines.",
        "Mailroom bundles packages with banana coin loyalty brochures.",
        "Hydration station swapped to capybara coconut kiosk with tip jar QR.",
        "Common room projector autoplaying product pitches between Mario Kart rounds.",
        "Study lounge beanbags rented in fifteen-minute sponsored increments.",
        "Basement freezer filled with 'limited edition' dorm meal prep kits.",
        "Elevator mirror flashes upsell prompts before revealing your outfit.",
        "Air freshener rotates through scents named after brand partnerships.",
        "Tuesday PA read thirty seconds of frog-tire treadmill ad copy.",
        "Dorm ghost allegedly haunts anyone who skips the affiliate link.",
        "Lobby scoreboard tracks which resident drives the most sign-ups.",
        "Pillow fort now paywalled behind exclusive sticker pack purchase.",
        "Laundry tokens replaced with rizz reward points redeemable for ad-free time.",
        "Study cubicle bookings require uploading a testimonial selfie.",
        "Commons microwave door features rotating banner ads for ramen drops.",
        "Resident cryptid hands out stamped punch cards for midnight webinars."
    ];

    const BRIEFING_LINES = [
        "Growth team reports click-through surge on capybara wellness ads",
        "Housing warns of QR code scalpers operating in the stairwell",
        "Counseling center pilots mindfulness sponsored by frog-tire cardio",
        "RA memo: no guerilla projection mapping without pre-roll disclaimers",
        "Campus police investigating unauthorized vending machine loyalty program",
        "Dining launches banana coin cashback for midnight combo purchases",
        "Registrar exploring micro-credentials for meme marketing interns",
        "Library after-hours funded by emotional support brick investors",
        "Student senate debates hallway pop-up influencer booth limits",
        "Career center hosts workshop on monetizing dorm gossip newsletters",
        "Facilities testing AR billboards outside lecture halls",
        "Chemistry department denies involvement in glow-in-the-dark ad ink",
        "Campus tour script updated with paid shoutout for koi pond optics",
        "Dining hall clarifies 'surge pricing' equals triple dessert sponsorship",
        "Museum unveils exhibit of failed campus marketing campaigns",
        "IT warns phishing emails disguised as finals-week promo codes",
        "Bookstore adds impulse wall of branded study goblin plushies",
        "Wellness center bundles nap pods with branded lo-fi playlist trials",
        "Campus radio sold midnight block to nugget preacher infomercial"
    ];

    const ATMOSPHERIC_FORECASTS = [
        { heading: "Sunrise", description: "Expect a drizzle of sponsored push notifications over Court Street." },
        { heading: "Midday", description: "Targeted pop-ups forming near Alden with upsell gusts." },
        { heading: "Afternoon", description: "Localized clickbait thunderstorms along group project labs." },
        { heading: "Dusk", description: "Retargeting haze settling across dorm wifi zones." },
        { heading: "Night", description: "High chance of autoplay ads echoing through laundry wings." },
        { heading: "Graveyard Shift", description: "Infomercial fog rolling in from 2 AM ramen deliveries." },
        { heading: "Between Classes", description: "Expect coupon flurries with mild hallway congestion." },
        { heading: "Club Hours", description: "Street teams distributing glow-in-the-dark QR codes." },
        { heading: "Dining Rush", description: "Limited-time combo sirens may trigger FOMO squalls." },
        { heading: "Study Break", description: "Calm breeze of branded lo-fi playlists across Alden stacks." },
        { heading: "Weekend Dawn", description: "Sporadic billboard drones projecting onto residence halls." },
        { heading: "Office Hours", description: "Faculty inbox showers of affiliate partnerships expected." }
    ];

    const LIVE_CHATTER_LINES = [
        { handle: "@sponsoredSleeper", message: "roommate whispering ad copy in his sleep again send help" },
        { handle: "@qr_code_goblin", message: "hallway makes you scan three QR codes just to microwave noodles" },
        { handle: "@clickbaitCapy", message: "capybara lounge offering premium hydration tier if you tap now" },
        { handle: "@AdBlockRA", message: "unplug the projector before it auto-plays nugget commercials" },
        { handle: "@funnelsForFun", message: "marketing majors cold-calling the laundry line for beta testers" },
        { handle: "@lofiLeadGen", message: "new study playlist sneaks in twenty minutes of testimonials" },
        { handle: "@DormCommerce", message: "someone bought the emotional support brick NFT for eighteen bucks" },
        { handle: "@squirrelAffiliate", message: "geese signed exclusive toll-booth sponsorship for the quad" },
        { handle: "@caffeineCRM", message: "coffee barista upsold me a finals battle pass I already bought" },
        { handle: "@flashSaleTA", message: "office hours moved to the lobby for live webinar vibes" },
        { handle: "@clickthru_ferret", message: "ferret handing out swipe-up cards at the library entrance" },
        { handle: "@bannerGremlin", message: "dorm wifi injects popups asking about my vibe goals" },
        { handle: "@sigh_up", message: "signed roommate up for three newsletters after he stole my charger" },
        { handle: "@campusCPA", message: "banana coin staking spreadsheet allegedly beats work-study" },
        { handle: "@boostedPossum", message: "possum influencer offering shoutouts for leftover meal swipes" },
        { handle: "@ugcWalrus", message: "library fish tank running a user-generated ad contest" },
        { handle: "@metricsMoth", message: "every light fixture has a referral code taped underneath" },
        { handle: "@viralRA", message: "if your ad reads start with 'hey bestie' expect a citation" },
        { handle: "@splashPageDJ", message: "basement rave projecting landing pages between tracks" },
        { handle: "@midnightCRO", message: "replaced my sleep schedule with conversion rate optimization" },
        { handle: "@retargeted", message: "mentioned ramen once and now the fridge is full of coupons" },
        { handle: "@donutUpsell", message: "campus donuts include optional motivational voicemail upsell" },
        { handle: "@bannerWizard", message: "bathroom mirror flashes countdown timers while I brush" },
        { handle: "@loyaltyLynx", message: "dining hall handing out punch cards for hype lattes" },
        { handle: "@doomscrollAds", message: "feed served me the same frog-tire promo seven times tonight" },
        { handle: "@sponsored_owl", message: "night class professor opened with a brand partnership disclaimer" },
        { handle: "@couponChancellor", message: "admin email subject line just said 'LAST CHANCE BUNDLE'" },
        { handle: "@paywallPirate", message: "study guide hidden behind banana coin paywall again" },
        { handle: "@ctaOverload", message: "side panel told me to tap here, there, and also over there" }
    ];

    const MAX_CHAT_LINES = 2;

    const NEWS_OUTLETS = [
        { handle: "@CNN", label: "CNN", avatar: "assets/media/news/cnn.svg" },
        { handle: "@FoxNews", label: "Fox News", avatar: "assets/media/news/foxnews.svg" },
        { handle: "@MSNBC", label: "MSNBC", avatar: "assets/media/news/msnbc.svg" },
        { handle: "@ABCNews", label: "ABC News", avatar: "assets/media/news/abcnews.svg" },
        { handle: "@CBSNews", label: "CBS News", avatar: "assets/media/news/cbsnews.svg" },
        { handle: "@NBCNews", label: "NBC News", avatar: "assets/media/news/nbcnews.svg" },
        { handle: "@BBCNews", label: "BBC News", avatar: "assets/media/news/bbcnews.svg" },
        { handle: "@Reuters", label: "Reuters", avatar: "assets/media/news/reuters.svg" },
        { handle: "@AP", label: "Associated Press", avatar: "assets/media/news/ap.svg" },
        { handle: "@NPR", label: "NPR", avatar: "assets/media/news/npr.svg" },
        { handle: "@BloombergTV", label: "Bloomberg", avatar: "assets/media/news/bloomberg.svg" },
        { handle: "@ViceNews", label: "Vice News", avatar: "assets/media/news/vicenews.svg" },
        { handle: "@AJEnglish", label: "Al Jazeera", avatar: "assets/media/news/aljazeera.svg" },
        { handle: "@SkyNews", label: "Sky News", avatar: "assets/media/news/skynews.svg" },
        { handle: "@USATODAY", label: "USA Today", avatar: "assets/media/news/usatoday.svg" },
        { handle: "@GuardianUS", label: "Guardian US", avatar: "assets/media/news/guardianus.svg" },
        { handle: "@WSJ", label: "Wall Street Journal", avatar: "assets/media/news/wsj.svg" },
        { handle: "@FinancialTimes", label: "Financial Times", avatar: "assets/media/news/financialtimes.svg" },
        { handle: "@politico", label: "Politico", avatar: "assets/media/news/politico.svg" },
        { handle: "@Newsweek", label: "Newsweek", avatar: "assets/media/news/newsweek.svg" },
        { handle: "@nytimes", label: "The New York Times", avatar: "assets/media/news/nytimes.svg" },
        { handle: "@washingtonpost", label: "Washington Post", avatar: "assets/media/news/washingtonpost.svg" },
        { handle: "@axios", label: "Axios", avatar: "assets/media/news/axios.svg" },
        { handle: "@HuffPost", label: "HuffPost", avatar: "assets/media/news/huffpost.svg" },
        { handle: "@Forbes", label: "Forbes", avatar: "assets/media/news/forbes.svg" },
        { handle: "@TIME", label: "TIME", avatar: "assets/media/news/time.svg" },
        { handle: "@TheEconomist", label: "The Economist", avatar: "assets/media/news/economist.svg" },
        { handle: "@CNBC", label: "CNBC", avatar: "assets/media/news/cnbc.svg" },
        { handle: "@CNET", label: "CNET", avatar: "assets/media/news/cnet.svg" },
        { handle: "@TechCrunch", label: "TechCrunch", avatar: "assets/media/news/techcrunch.svg" }
    ];

    const TICKER_LINES = MEDIA_LIBRARY.reduce((lines, item) => {
        if (Array.isArray(item.variants)) {
            item.variants.forEach((variant) => {
                if (variant && variant.ticker) {
                    lines.push("Sponsored: " + variant.ticker);
                }
            });
        }
        return lines;
    }, BASE_TICKER_LINES.slice());

    class NewsOutletRotator {
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

    class ImageRotator {
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

    const newsOutletRotator = new NewsOutletRotator(NEWS_OUTLETS);
    const imageRotator = new ImageRotator(MEDIA_LIBRARY);
    class AdRotator {
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

    const adRotator = new AdRotator(AD_LIBRARY);

    const ICONS = {
        likes: "&#128165;",
        comments: "&#128172;",
        shares: "&#128257;"
    };

    class Doomscroll {
        constructor(feedElement) {
            this.feed = feedElement;
            this.translateY = 0;
            this.speed = SCROLL_SPEED;
            this.gap = 32;
            this.running = false;
            this.frameRequest = null;
            this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
            this.lastTimestamp = null;
            this.postsSinceAd = 0;
            this.adFrequency = 6;
            this.activeSurvey = null;
        }

        init() {
            if (!this.feed) {
                return;
            }

            const styles = window.getComputedStyle(this.feed);
            const gapValue = parseInt(styles.getPropertyValue("gap"), 10);
            this.gap = Number.isNaN(gapValue) ? 32 : gapValue;

            const initialCount = Math.max(MEDIA_LIBRARY.length, INITIAL_POST_COUNT);

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
            if (adRotator.hasItems()) {
                this.postsSinceAd += 1;
                if (this.postsSinceAd >= this.adFrequency) {
                    this.postsSinceAd = 0;
                    const adCampaign = adRotator.next();
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

            if (Math.random() < 0.32) {
                const badge = document.createElement("span");
                badge.className = "badge";
                badge.textContent = pickRandom(BADGES);
                article.appendChild(badge);
            }

            let mediaContext = null;

            let selection = selectionOverride;
            if (!selection && imageRotator.hasItems()) {
                selection = imageRotator.next();
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
            const outlet = override && override.outlet ? override.outlet : buildHandle();
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

            const questions = shuffleArray(SURVEY_QUESTIONS).slice(0, 3);
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

    class PulseTicker {
        constructor(element) {
            this.element = element;
            this.timer = null;
        }

        start() {
            if (!this.element) {
                return;
            }
            this.update();
            this.timer = window.setInterval(() => this.update(), TICKER_INTERVAL_MS);
        }

        update() {
            const phrase = pickRandom(TICKER_LINES);
            this.element.textContent = phrase;
        }
    }

    class SidePanels {
        constructor(elements) {
            this.chaosBar = elements.chaosBar;
            this.chaosLabel = elements.chaosLabel;
            this.loreList = elements.loreList;
            this.briefingList = elements.briefingList;
            this.forecastList = elements.forecastList;
            this.chatStream = elements.chatStream;
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

            if (this.chaosBar && this.chaosLabel) {
                this.updateChaos();
                window.setInterval(() => this.updateChaos(), Math.round(9000 * INTERVAL_SCALE));
            }

            if (this.loreList) {
                this.updateLore();
                window.setInterval(() => this.updateLore(), Math.round(16000 * INTERVAL_SCALE));
            }

            if (this.briefingList) {
                this.updateBriefings();
                window.setInterval(() => this.updateBriefings(), Math.round(20000 * INTERVAL_SCALE));
            }

            if (this.forecastList) {
                this.updateForecast();
                window.setInterval(() => this.updateForecast(), Math.round(18000 * INTERVAL_SCALE));
            }

            if (this.chatStream) {
                this.seedChat();
                const chatInterval = Math.round(5000 * INTERVAL_SCALE);
                this.chatTimer = window.setInterval(() => this.pushChat(false), chatInterval);
            }
        }

        updateChaos() {
            if (!this.chaosBar || !this.chaosLabel) {
                return;
            }
            const entry = pickRandom(CHAOS_LEVELS);
            this.chaosBar.style.width = entry.level + "%";
            this.chaosLabel.textContent = entry.label;
        }

        updateLore() {
            if (!this.loreList) {
                return;
            }
            const items = shuffleArray(DORM_LORE_HOTLINE).slice(0, 4);
            this.renderList(this.loreList, items);
        }

        updateBriefings() {
            if (!this.briefingList) {
                return;
            }
            const items = shuffleArray(BRIEFING_LINES).slice(0, 4);
            this.renderList(this.briefingList, items);
        }

        updateForecast() {
            if (!this.forecastList) {
                return;
            }
            this.forecastList.innerHTML = "";
            const items = shuffleArray(ATMOSPHERIC_FORECASTS).slice(0, 2);
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
            if (!this.chatStream) {
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
            while (this.chatStream.childElementCount > MAX_CHAT_LINES) {
                const lastChild = this.chatStream.lastElementChild;
                if (lastChild) {
                    lastChild.remove();
                } else {
                    break;
                }
            }
        }

        pickChat() {
            let choice = pickRandom(LIVE_CHATTER_LINES);
            let attempts = 0;
            while (choice.handle === this.previousChatHandle && attempts < 4) {
                choice = pickRandom(LIVE_CHATTER_LINES);
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

    function buildPostBody(context) {
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

    function buildImageMedia(item, variant) {
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

    function buildAdBody(adCampaign) {
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

    function buildAdFooter(adCampaign) {
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

    function buildFooter() {
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

    function buildHandle() {
        const outlet = newsOutletRotator.next();
        if (outlet) {
            return outlet;
        }
        return pickRandom(NEWS_OUTLETS);
    }

    function initialsFromHandle(handle) {
        const cleaned = handle.replace(/^@/, "");
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

    function relativeTimestamp() {
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

    function randomCount(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function formatCount(value) {
        if (value >= 1000000) {
            return (value / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
        }
        if (value >= 1000) {
            return (value / 1000).toFixed(1).replace(/\.0$/, "") + "K";
        }
        return String(value);
    }

    function shuffleArray(source) {
        const array = source.slice();
        for (let index = array.length - 1; index > 0; index -= 1) {
            const swapIndex = Math.floor(Math.random() * (index + 1));
            const temp = array[index];
            array[index] = array[swapIndex];
            array[swapIndex] = temp;
        }
        return array;
    }

    function pickRandom(list) {
        return list[Math.floor(Math.random() * list.length)];
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

    document.addEventListener("DOMContentLoaded", () => {
        if (LOW_POWER_MODE) {
            document.body.classList.add("low-power");
        }

        const feedElement = document.getElementById("feed");
        const doomscroll = new Doomscroll(feedElement);
        doomscroll.init();

        const tickerElement = document.getElementById("ticker");
        const ticker = new PulseTicker(tickerElement);
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
        });
        sidePanels.init();
    });
})();
