(function () {
    "use strict";

    const CONFIG = {
        animationSpeed: 0.45,
        initialPostCount: 18,
        tickerIntervalMs: 7000
    };

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

    if (LOW_POWER_MODE) {
        CONFIG.animationSpeed = 0.62;
        CONFIG.initialPostCount = 12;
        CONFIG.tickerIntervalMs = Math.round(CONFIG.tickerIntervalMs * 1.45);
    }

    const INTERVAL_SCALE = LOW_POWER_MODE ? 1.45 : 1;

    const TEXT_SNIPPETS = {
        openers: [
            "POV:",
            "Live footage of",
            "Bro thinks he is",
            "Only in Ohio:",
            "No one:",
            "Breaking:",
            "Witness the",
            "Someone said",
            "Campus alert:",
            "Ohio weather be like"
        ],
        scenarios: [
            "Alden Library becoming a level 99 raid",
            "the printer initiating a boss fight",
            "mascot speed-running the rizz meta",
            "study group turning into a lore drop",
            "professor unlocking secret NPC dialogue",
            "frat house launching a side quest",
            "cafeteria releasing limited edition Skibidi",
            "quad transforming into a sigma training arc",
            "student hitting a plot twist mid-scroll",
            "late-night diner summoning ohio core energy"
        ],
        closers: [
            "and I fear it is canon now",
            "screenshots were taken, no respawns",
            "send help this is not a drill",
            "fr fr trust",
            "we are so back",
            "nah because this cooked",
            "cannot keep doing this",
            "campus is not ready",
            "somebody clip that",
            "Ohio NPCs stay winning"
        ],
        highlights: [
            "<strong>Only in Ohio</strong>",
            "<strong>Certified Brainrot</strong>",
            "<strong>Breaking Brainwave</strong>",
            "<strong>Sigma Intel Drop</strong>",
            "<strong>NPC Transmission</strong>",
            "<strong>Rizz Alert</strong>"
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
                }
            ]
        },
        {
            id: "ronaldo-speed",
            variantIndex: 0,
            src: "assets/media/ronaldo and pregnant ishowspeed.png",
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
        "Breaking Brainrot",
        "Trend Alert",
        "Ohio Core",
        "Rizz Advisory",
        "NPC Sighting",
        "Campus Exclusive"
    ];

    const BASE_TICKER_LINES = [
        "Sigma sightings up 300 percent near Alden Library",
        "Campus wifi allegedly became self-aware at 3:12 AM",
        "New rizz patch notes leaked from the dining hall",
        "Study group accidentally summons Skibidi event",
        "Ohio weather unlocks secret NPC dialogue options",
        "Final boss professor drops limited edition lore",
        "Library printer demands tribute in Baja Blast",
        "Dorm 403 hosts underground meme think tank",
        "Quad renamed to Gigachad Plaza for 24 hours",
        "University issues advisory for rogue doomscroll",
        "Geese union announces strike over bagel rationing",
        "Residence halls issue alert for rogue nugget preacher",
        "Coffee lab unveils ethically sourced chaos concentrate",
        "Campus shuttle reported traveling through alternate timeline",
        "Registrar loses count after students submit meme majors",
        "Library basement rave extends hours past sunrise again",
        "Dining hall debuts limited Baja Blast reduction sauce",
        "Student senate debates mandatory vibe checks before finals",
        "Alden printer declares independence, demands toner rights",
        "Administration warns of emotional support possum sightings"
    ];

    const CHAOS_LEVELS = [
        { level: 38, label: "Library printer quietly plotting the next paper jam uprising" },
        { level: 52, label: "Residence hall rumor mill vibrating at hazardous decibels" },
        { level: 64, label: "Skibidi flash mob rehearsing in the basement again" },
        { level: 71, label: "Gamma level brainrot detected near Court Street food trucks" },
        { level: 83, label: "Finals-week caffeine rituals spilling into the quad" },
        { level: 47, label: "Donkey NPC performing pop-up vibe checks outside Alden" },
        { level: 92, label: "Dorm wifi negotiating influencer deals with John Pork" },
        { level: 58, label: "Campus geese organizing another hallway takeover" },
        { level: 76, label: "Emotional support vending machine went feral at 2 AM" },
        { level: 67, label: "Sigma aura index exceeds recommended daily limit" },
        { level: 81, label: "Library basement rave reported to smell like Baja Blast" },
        { level: 69, label: "RA confiscated three Ouija boards from the study lounge" },
        { level: 95, label: "Emergency alert: nugget preacher announcing surprise sermon" },
        { level: 73, label: "Campus shuttle DJ stuck on Skibidi remix loop again" },
        { level: 62, label: "Rival dorm declared meme war using only Canva slides" },
        { level: 88, label: "Dean spotted speed-running the pizza line with zero remorse" },
        { level: 79, label: "Caution: emotional support brick rolling loose across College Green" },
        { level: 91, label: "Housing reports phantom RA doing midnight vibe inspections" },
        { level: 54, label: "Hydration station overrun by iced coffee zealots chanting slogans" },
        { level: 86, label: "Skibidi siren detected echoing through Alden vents" },
        { level: 63, label: "Clubs competing to trademark the word 'sigma' cause paperwork storm" },
        { level: 74, label: "Quad squirrels forming council to regulate picnic table usage" },
        { level: 82, label: "Unexpected kazoo parade rerouted three lecture halls" },
        { level: 57, label: "Campus cops chasing rumors of teleporting vending machines" },
        { level: 68, label: "Art building glowing neon due to experimental meme installation" }
    ];

    const TRENDING_RITUALS = [
        "3 AM hydration circle chanting about iced coffee loyalty",
        "Professor summoning circle scheduled in Alden stairwell C",
        "Rizzy roomies host nightly powerpoint roast in lounge B",
        "Study break flash mob practicing the Ohio wobble remix",
        "Quad chalkboard now dedicated to citing obscure meme law",
        "Silent disco in the laundry room until the dryers revolt",
        "Emergency group chat deploying emotional support possum",
        "Dorm karaoke swaps lyrics for Canvas announcements",
        "Library rooftop believed to house secret nugget conclave",
        "Dining hall table six petitioning for permanent lore hour",
        "Torchlight pilgrimage to the only functioning microwave on West Green",
        "Midnight potluck where everyone brings their favorite campus conspiracy",
        "Lecture hall B hosts silent scream therapy before every exam",
        "Residence hall tarot night decides who restocks the snack drawer",
        "Group chat assigns spirit animals based on coffee order aesthetics",
        "Wellness club now doing aura cleansing with Doritos dust",
        "Gamma lounge installs disco ball for impromptu syllabus rave",
        "Engineering majors speedrun building blanket forts in the atrium",
        "Skate crew drafts treaty with geese to share the sidewalks"
    ];

    const BRIEFING_LINES = [
        "Dean confirms campus geese now accept Venmo bribes",
        "Housing warns of spectral roommate requesting late fees",
        "Counseling center launches meme coping worksheets this week",
        "RA memo: no more summoning circles without facilities sign-off",
        "Campus police investigating missing statue of Emotional Support Brick",
        "Dining just dropped limited edition Baja Blast reduction sauce",
        "Registrar admits syllabus week is a pyramid scheme but vibes",
        "Library extended hours sponsored by the Rat Accountant Society",
        "Student senate debates if naps count as experiential learning",
        "Career center hosts workshop on monetizing your villain arc",
        "Facilities testing holographic geese deterrents in the quad",
        "Chemistry department denies responsibility for glowing vending machines",
        "Campus tour guide union demands hazard pay for Skibidi sightings",
        "Dining hall clarifies ice cream machine outage is performance art",
        "Museum pop-up exhibits the lost and found of emotional support items",
        "IT issues warning about AI study buddies gaining sentience",
        "Bookstore launches loyalty program for last-minute blue book runs",
        "Wellness center introduces meme-based mindfulness breathing",
        "Campus radio apologizes for accidentally broadcasting nugget sermons"
    ];

    const ATMOSPHERIC_FORECASTS = [
        { heading: "Sunrise", description: "Expect a mist of Monster fumes drifting over Court Street." },
        { heading: "Midday", description: "Scattered syllabus confetti with a high chance of rizz alerts." },
        { heading: "Afternoon", description: "Localized cringe storms around the group project lab." },
        { heading: "Dusk", description: "Emotional support fog rolling in from the dorm laundry wing." },
        { heading: "Night", description: "Likely brainrot auroras above Alden atrium after 11 PM." },
        { heading: "Graveyard Shift", description: "48 percent chance of rogue skibidi sirens near West Green." },
        { heading: "Between Classes", description: "Expect gusts of frantic walking speed with latte drizzle." },
        { heading: "Club Hours", description: "Spotty bursts of glitter and chaotic flyers across the quad." },
        { heading: "Dining Hall Rush", description: "High probability of emotional support carbs falling from the sky." },
        { heading: "Study Break", description: "Warm front brings lo-fi beats and feral snack energy to Alden." },
        { heading: "Weekend Dawn", description: "Morning haze infused with faint bass from last night's basement rave." },
        { heading: "Office Hours", description: "Faculty attempting calm breezes while chaos index rises steadily." }
    ];

    const LIVE_CHATTER_LINES = [
        { handle: "@sleepdeprived_ferret", message: "somebody bring back the vending machine lore packets" },
        { handle: "@npc_alert_409", message: "donkey just stared at me until I confessed my group project sins" },
        { handle: "@goblinenergy", message: "selling limited edition iced coffee IV drips at the library" },
        { handle: "@finalbossRA", message: "if your microwave summons smoke again please at least livestream" },
        { handle: "@doomscrollingmajor", message: "I heard the nugget preacher is doing a midnight rerun" },
        { handle: "@wifi_oracle", message: "campus wifi asked me to stop downloading lore PDFs" },
        { handle: "@skibidi_spotted", message: "saw 094324 in the mirror again we are not back" },
        { handle: "@permacringe", message: "lecture hall B turned into an ARG and nobody told me" },
        { handle: "@quad_prophet", message: "forecast says meme hail with a side of villain arcs" },
        { handle: "@latefee_lawyer", message: "rat accountant offering plea deals for dirty dishes" },
        { handle: "@sigma_weather", message: "brainrot index hitting orange please hydrate" },
        { handle: "@campuscryptid", message: "elevator 3 playing lo-fi nugget sermons on loop" },
        { handle: "@laundrybard", message: "someone just performed slam poetry to the spin cycle" },
        { handle: "@icedcoffeeOverlord", message: "barista gave me a loyalty sash for excessive espresso" },
        { handle: "@geeseWatchHQ", message: "flock just annexed the fountain and set up toll booths" },
        { handle: "@finalsGremlin", message: "trading highlighters for emotional support playlists" },
        { handle: "@midnightTA", message: "office hours moved to the arcade because vibes" },
        { handle: "@brickfan420", message: "emotional support brick now has its own newsletter" },
        { handle: "@quadDJ", message: "accidentally remixed the professor's lecture with Skibidi" },
        { handle: "@campusoracle", message: "tarot pulled three cups and one Baja Blast" },
        { handle: "@lateNightScoops", message: "ice cream machine is working?? repeat, working" },
        { handle: "@studybreakhero", message: "set up a pillow fort in Alden if anyone needs it" },
        { handle: "@npc_on_duty", message: "saw gigachad cat holding a press conference again" }
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
                    lines.push(variant.ticker);
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
                if (this.queue.length > 1 && this.queue[0].id === this.previousId) {
                    const first = this.queue.shift();
                    this.queue.push(first);
                }
            }

            const item = this.queue.shift();
            if (!item.variants || item.variants.length === 0) {
                this.previousId = item.id;
                return { item, variant: null };
            }

            if (typeof item.variantIndex !== "number") {
                item.variantIndex = 0;
            }

            const variant = item.variants[item.variantIndex % item.variants.length];
            item.variantIndex = (item.variantIndex + 1) % item.variants.length;
            this.previousId = item.id;
            return { item, variant };
        }
    }

    const newsOutletRotator = new NewsOutletRotator(NEWS_OUTLETS);
    const imageRotator = new ImageRotator(MEDIA_LIBRARY);

    const ICONS = {
        likes: "&#128165;",
        comments: "&#128172;",
        shares: "&#128257;"
    };

    class Doomscroll {
        constructor(feedElement) {
            this.feed = feedElement;
            this.translateY = 0;
            this.speed = CONFIG.animationSpeed * 60;
            this.gap = 32;
            this.running = false;
            this.frameRequest = null;
            this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
            this.lastTimestamp = null;
        }

        init() {
            if (!this.feed) {
                return;
            }

            const styles = window.getComputedStyle(this.feed);
            const gapValue = parseInt(styles.getPropertyValue("gap"), 10);
            this.gap = Number.isNaN(gapValue) ? 32 : gapValue;

            for (let index = 0; index < CONFIG.initialPostCount; index += 1) {
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

            const deltaSeconds = (timestamp - this.lastTimestamp) / 1000;
            this.lastTimestamp = timestamp;

            const distance = this.speed * deltaSeconds;
            this.translateY -= distance;
            this.feed.style.transform = "translateY(" + this.translateY + "px)";

            const firstPost = this.feed.firstElementChild;
            if (firstPost) {
                const firstHeight = firstPost.getBoundingClientRect().height;
                const threshold = firstHeight + this.gap;
                if (Math.abs(this.translateY) >= threshold) {
                    this.translateY += threshold;
                    this.feed.style.transform = "translateY(" + this.translateY + "px)";
                    firstPost.remove();
                    this.feed.appendChild(this.createPost());
                }
            }

            this.frameRequest = window.requestAnimationFrame((nextTimestamp) => this.tick(nextTimestamp));
        }

        createPost() {
            const article = document.createElement("article");
            article.className = "post";

            const header = this.buildHeader();
            article.appendChild(header);

            if (Math.random() < 0.32) {
                const badge = document.createElement("span");
                badge.className = "badge";
                badge.textContent = pickRandom(BADGES);
                article.appendChild(badge);
            }

            let mediaContext = null;

            if (imageRotator.hasItems()) {
                const selection = imageRotator.next();
                if (selection && selection.variant) {
                    const payload = buildImageMedia(selection.item, selection.variant);
                    article.appendChild(payload.element);
                    mediaContext = selection.variant;
                }
            }

            const body = document.createElement("p");
            body.className = "post-body";
            body.innerHTML = buildPostBody(mediaContext);
            article.appendChild(body);

            const footer = buildFooter();
            article.appendChild(footer);

            return article;
        }

        buildHeader() {
            const header = document.createElement("header");
            header.className = "post-header";

            const avatar = document.createElement("div");
            avatar.className = "avatar";
            const outlet = buildHandle();
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
            this.timer = window.setInterval(() => this.update(), CONFIG.tickerIntervalMs);
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
            this.ritualList = elements.ritualList;
            this.briefingList = elements.briefingList;
            this.forecastList = elements.forecastList;
            this.chatStream = elements.chatStream;
            this.chatTimer = null;
            this.previousChatHandle = null;
        }

        init() {
            const hasAny = Boolean(
                this.chaosBar ||
                this.ritualList ||
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

            if (this.ritualList) {
                this.updateRituals();
                window.setInterval(() => this.updateRituals(), Math.round(16000 * INTERVAL_SCALE));
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

        updateRituals() {
            if (!this.ritualList) {
                return;
            }
            const items = shuffleArray(TRENDING_RITUALS).slice(0, 4);
            this.renderList(this.ritualList, items);
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
        const buildFallback = () => {
            const highlight = pickRandom(TEXT_SNIPPETS.highlights);
            const opener = pickRandom(TEXT_SNIPPETS.openers);
            const scenario = pickRandom(TEXT_SNIPPETS.scenarios);
            const closer = pickRandom(TEXT_SNIPPETS.closers);
            return highlight + " " + opener + " " + scenario + " " + closer + " \u2014 stay tuned.";
        };

        if (context) {
            const highlight = context.tag ? "<strong>" + context.tag + "</strong>" : pickRandom(TEXT_SNIPPETS.highlights);
            if (Array.isArray(context.bodyLines) && context.bodyLines.length > 0) {
                const line = pickRandom(context.bodyLines);
                return highlight + " " + line;
            }
            return buildFallback();
        }

        return buildFallback();
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

        return { element: figure };
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
            const hours = now.getHours().toString().padStart(2, "0");
            const minutes = now.getMinutes().toString().padStart(2, "0");
            clockElement.textContent = hours + ":" + minutes;
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
            ritualList: document.getElementById("ritual-list"),
            briefingList: document.getElementById("briefing-list"),
            forecastList: document.getElementById("forecast-list"),
            chatStream: document.getElementById("chat-stream")
        });
        sidePanels.init();
    });
})();
