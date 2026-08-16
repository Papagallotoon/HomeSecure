// Registre éditorial Home-Secure.
//
// Source de vérité unique : la home, les hubs de catégorie et les pages
// d'article lisent tous ce fichier. content/editorial.ts n'y ajoute que la
// mise en scène de la home.
//
// Le corps d'un article est une liste de blocs typés, pas du HTML. C'est ce qui
// permet de passer à content/articles/*.mdx sans toucher aux composants : le
// frontmatter deviendra ArticleMeta et le corps MDX produira les mêmes blocs
// via un jeu de composants MDX (<Bars>, <Scatter>, <Pick>…).

export type Category = {
  slug: string;
  label: string;
  /** Nuance turquoise propre à la catégorie, sur fond clair. */
  color: string;
  blurb: string;
};

export const CATEGORIES: Record<string, Category> = {
  perimeter: {
    slug: "perimeter",
    label: "Perimeter",
    color: "#1F7E8C",
    blurb: "Doors, frames, windows, garage, fencing. The layer that decides whether entry needs tools.",
  },
  detection: {
    slug: "detection",
    label: "Detection",
    color: "#0E7C6E",
    blurb: "Cameras, contact sensors, motion, monitoring. What tells you it is happening, and proves it later.",
  },
  response: {
    slug: "response",
    label: "Response",
    color: "#147F60",
    blurb: "Who acts, how fast, and what you do in the first ninety seconds.",
  },
  resilience: {
    slug: "resilience",
    label: "Resilience",
    color: "#2C6C8B",
    blurb: "What keeps working when power, internet or water stop.",
  },
};

export const CATEGORY_ORDER = ["perimeter", "detection", "response", "resilience"] as const;

export type CategoryKey = keyof typeof CATEGORIES;

/** Codes couleur communs aux tableaux et aux graphiques. */
export type Tone = "good" | "ok" | "weak" | "bad";

export const TONE: Record<Tone, string> = {
  good: "#0E7C6E",
  ok: "#1F7E8C",
  weak: "#8A8F93",
  bad: "#B25B4A",
};

export type Block =
  | { k: "p"; text: string }
  | { k: "h2"; text: string }
  | { k: "bars"; title: string; note?: string; items: BarItem[]; max?: number }
  | { k: "scatter"; title: string; note?: string; points: Point[]; xTicks: string[]; xMin: number; xMax: number; yMin: number; yMax: number; yTicks: number[]; trend?: [number, number, number, number] }
  | { k: "split"; title: string; note?: string; left: SplitSide; right: SplitSide }
  | { k: "table"; title?: string; columns: string[]; rows: Row[] }
  | { k: "pick"; rank: string; name: string; price: string; badge: string; tone: Tone; verdict: string; pros: string[]; cons: string[]; href: string; image?: string; imageAlt?: string; imageDark?: boolean }
  | { k: "callout"; title: string; text: string }
  | { k: "steps"; title?: string; items: { title: string; text: string }[] }
  | { k: "quiz"; title: string; text: string }
  | { k: "method"; items: string[] };

export type BarItem = { label: string; value: number; display: string; tone: Tone };
export type Point = { label: string; x: number; y: number; tone: Tone };
export type Row = { cells: string[]; tone?: Tone };
export type SplitSide = { label: string; value: number; display: string; caption: string; tone: Tone };

export type ArticleMeta = {
  slug: string;
  category: CategoryKey;
  /** Gabarit : gouverne l'entête et les mentions d'affiliation. */
  kind: "comparison" | "guide" | "duel" | "checklist";
  kicker: string;
  title: string;
  excerpt: string;
  /** Chapeau de l'article, en gros corps sérif. */
  standfirst: string;
  meta: string;
  date: string;
  /** Numéro d'ordre dans la collection, affiché dans les listes. */
  number: number;
  readingTime: string;
  updated: string;
  image?: string;
  imageAlt?: string;
  /** true pour les prises très sombres, qui demandent un filtre plus fort. */
  imageDark?: boolean;
  /** Chiffres clés en tête d'article. */
  facts: { value: string; label: string }[];
  blocks: Block[];
};

const AFFILIATE = "#";

export const ARTICLES: ArticleMeta[] = [
  {
    slug: "outdoor-cameras-that-record-offline",
    category: "detection",
    kind: "comparison",
    kicker: "Tested",
    title: "The 7 outdoor cameras that still recorded when the Wi-Fi dropped",
    excerpt:
      "We cut power and internet to eighteen cameras. Eleven went blind. Here is what the survivors have in common — and the two that cost under $90.",
    standfirst:
      "Eighteen cameras, one wall, and an unannounced cut to both power and internet. Eleven stopped producing anything a police officer could use. These seven did not, and the gap between them is not price.",
    meta: "Comparison · 18 tested",
    date: "Aug 12",
    number: 313,
    readingTime: "11 min read",
    updated: "Updated 12 August 2026",
    image: "/images/01-lead-camera.png",
    imageAlt: "Bullet camera mounted on a house corner at dusk",
    facts: [
      { value: "18", label: "cameras on the bench" },
      { value: "6 wk", label: "continuous test window" },
      { value: "11", label: "went blind at the cut" },
    ],
    blocks: [
      {
        k: "p",
        text: "Every camera here was mounted on the same north-facing wall, at the same height, pointed at the same walk-up. All of them were left running for six weeks. Then, without warning, we pulled the breaker and unplugged the router at the same time — the exact sequence a prepared intruder creates on purpose and a storm creates by accident.",
      },
      {
        k: "p",
        text: "The question was not whether the camera kept a light on. It was whether, afterwards, we could hand somebody footage in which a face was identifiable at fifteen metres in darkness. That is the bar the first chart measures.",
      },
      {
        k: "bars",
        title: "Hours of usable footage after the cut",
        note: "n = 18 units · 6-week window · footage judged usable when a face is identifiable at 15 m in darkness",
        max: 72,
        items: [
          { label: "Sentinel 4K Pro", value: 72, display: "72h", tone: "good" },
          { label: "Redoubt SD", value: 68, display: "68h", tone: "good" },
          { label: "Vantage Mini 2", value: 41, display: "41h", tone: "ok" },
          { label: "Warden 360", value: 31, display: "31h", tone: "ok" },
          { label: "Beacon Duo", value: 18, display: "18h", tone: "weak" },
          { label: "Northgate Flex", value: 6, display: "6h", tone: "weak" },
          { label: "Halo Wired 2K", value: 0, display: "0h", tone: "bad" },
        ],
      },
      {
        k: "p",
        text: "Two things separate the top of that chart from the bottom, and neither appears on a box. The first is a memory card the camera writes to by default rather than as a fallback. The second is a battery that carries the radio, not just the sensor: several cameras kept recording locally but could not tell anyone, which in practice means you learn about the break-in when you get home.",
      },
      {
        k: "callout",
        title: "The failure nobody advertises",
        text: "Cloud-only cameras are not weakened by an outage — they are switched off by it. Four units in this test wrote nothing at all once the uplink died, including one that costs more than every camera we recommend.",
      },
      {
        k: "p",
        text: "The second chart is the one to read if you are on a budget. Price buys resolution, app polish and a nicer mount. It does not reliably buy survival. Two cameras sit well above the trend line; one sits so far below it that we cannot recommend it at any discount.",
      },
      {
        k: "scatter",
        title: "Price against overall score",
        note: "Overall score weights offline survival 40%, night identification 30%, alert reliability 20%, app 10%",
        xMin: 50,
        xMax: 220,
        yMin: 70,
        yMax: 100,
        xTicks: ["$50", "$135", "$220"],
        yTicks: [70, 80, 90, 100],
        trend: [60, 78, 210, 94],
        points: [
          { label: "Sentinel", x: 189, y: 94, tone: "good" },
          { label: "Redoubt", x: 142, y: 91, tone: "good" },
          { label: "Warden", x: 118, y: 88, tone: "ok" },
          { label: "Vantage", x: 86, y: 86, tone: "ok" },
          { label: "Beacon", x: 132, y: 82, tone: "weak" },
          { label: "Halo", x: 62, y: 79, tone: "weak" },
          { label: "Northgate", x: 158, y: 74, tone: "bad" },
        ],
      },
      { k: "h2", text: "The full table" },
      {
        k: "table",
        columns: ["Camera", "Offline", "Night ID", "Local rec.", "Price", "Score"],
        rows: [
          { cells: ["Sentinel 4K Pro", "72h", "Excellent", "Card + cell", "$189", "94"], tone: "good" },
          { cells: ["Redoubt SD", "68h", "Excellent", "Card", "$142", "91"], tone: "good" },
          { cells: ["Warden 360", "31h", "Good", "Card", "$118", "88"], tone: "ok" },
          { cells: ["Vantage Mini 2", "41h", "Fair", "Card", "$86", "86"], tone: "ok" },
          { cells: ["Beacon Duo", "18h", "Fair", "Card, 2h buffer", "$132", "82"], tone: "weak" },
          { cells: ["Halo Wired 2K", "0h", "Good", "None", "$62", "79"], tone: "weak" },
          { cells: ["Northgate Flex", "6h", "Poor", "None", "$158", "74"], tone: "bad" },
        ],
      },
      { k: "h2", text: "What we would buy" },
      {
        k: "pick",
        rank: "01",
        name: "Redoubt SD",
        price: "$142",
        badge: "Best overall",
        tone: "good",
        verdict:
          "It is not the sharpest camera on the bench and it does not need to be. Sixty-eight hours of local recording, a night image good enough to identify a face at fifteen metres, and alerts that still left the house on cellular. For most homes this is the whole answer.",
        pros: ["68h offline, card-first by default", "Face identifiable at 15 m in darkness", "No subscription for local footage"],
        cons: ["App notifications are plain", "Mount needs a drill, not adhesive"],
        href: AFFILIATE,
        image: "/images/06-product-1.png",
        imageAlt: "Redoubt SD camera on a neutral background",
      },
      {
        k: "pick",
        rank: "02",
        name: "Vantage Mini 2",
        price: "$86",
        badge: "Best under $90",
        tone: "ok",
        verdict:
          "Forty-one hours offline for eighty-six dollars is the best value in the test. The night image is a step down — clothing and gait yes, a face at distance no — so put it on a side approach and keep the better camera on the main door.",
        pros: ["41h offline at the lowest price that survives", "Physically small, easy to place high"],
        cons: ["Night identification is fair, not good", "No cellular fallback for alerts"],
        href: AFFILIATE,
        image: "/images/07-product-2.png",
        imageAlt: "Vantage Mini 2 compact camera",
      },
      {
        k: "pick",
        rank: "03",
        name: "Sentinel 4K Pro",
        price: "$189",
        badge: "If budget is not the constraint",
        tone: "good",
        verdict:
          "The only unit that finished the cut still doing everything: recording, alerting over cellular, and holding a 4K image clean enough to read a plate across the street. Worth it on a driveway, overkill on a side gate.",
        pros: ["72h with alerts still leaving the property", "Plate readable across a two-lane street"],
        cons: ["Cellular fallback needs a $6/mo SIM", "Largest housing in the test"],
        href: AFFILIATE,
      },
      {
        k: "quiz",
        title: "Not sure detection is your weakest layer?",
        text: "Seven questions score your perimeter, detection, response and resilience against 41,200 assessed homes, and tell you which one to spend on first.",
      },
      { k: "h2", text: "How we tested" },
      {
        k: "method",
        items: [
          "Every unit mounted at 2.6 m on the same north-facing wall, same field of view, for six weeks.",
          "Night identification judged blind by three reviewers at 5, 10 and 15 m, no camera labels visible.",
          "Power and internet cut simultaneously, unannounced, twice per unit.",
          "Footage counted as usable only if a reviewer could describe a face well enough to pick it from a six-person line-up.",
          "Bought at retail. No manufacturer supplied a unit, and none saw the results before publication.",
        ],
      },
    ],
  },

  {
    slug: "reinforce-a-sliding-patio-door",
    category: "perimeter",
    kind: "guide",
    kicker: "Guide",
    title: "How to reinforce a sliding patio door in 20 minutes",
    excerpt:
      "The slider is the softest opening on most houses. Three cheap parts and a screwdriver took ours from 12 seconds to defeat to over four minutes.",
    standfirst:
      "A patio slider is a pane of glass in an aluminium frame, held shut by a catch the size of a paperclip. It is the opening we defeat fastest in testing, and the one that takes the least money to fix.",
    meta: "Guide · 6 min read",
    date: "Aug 09",
    number: 311,
    readingTime: "6 min read",
    updated: "Updated 9 August 2026",
    image: "/images/10-patio-door.png",
    imageAlt: "Sliding patio door seen from inside at night",
    imageDark: true,
    facts: [
      { value: "12 s", label: "to defeat, as delivered" },
      { value: "4:10", label: "after three parts" },
      { value: "$71", label: "total cost" },
    ],
    blocks: [
      {
        k: "p",
        text: "We tested the same slider three times: as the builder left it, with a floor bar added, and with the full three-part treatment. The clock ran from first contact to the point where a person of average build could step through the opening.",
      },
      {
        k: "split",
        title: "Time to defeat the slider",
        note: "Same door, same tester, same tool set. Median of five attempts each.",
        left: { label: "As delivered", value: 12, display: "12 s", caption: "Factory catch only. Lifted out of the track on the second attempt every time.", tone: "bad" },
        right: { label: "After three parts", value: 250, display: "4 min 10 s", caption: "Anti-lift pins engaged, bar in the track, film holding the pane together after breakage.", tone: "good" },
      },
      {
        k: "p",
        text: "Four minutes matters more than it sounds. In the police reports we went through, opportunist entries that took longer than three minutes were abandoned about two thirds of the time — usually because noise and time exposure are the only two costs an intruder actually pays.",
      },
      {
        k: "steps",
        title: "The twenty minutes, in order",
        items: [
          {
            title: "Fit two anti-lift pins first",
            text: "Drill two holes through the upper track above the moving panel and drop in stainless pins so the panel cannot be lifted out. This is the single change that stopped every lift attempt in our test, and it takes about six minutes.",
          },
          {
            title: "Add a bar in the track, not a broomstick",
            text: "A cut-to-length steel bar sits in the track and takes the load flat against the frame. Wooden dowels split under a shoulder strike; the bar did not move in five attempts.",
          },
          {
            title: "Film the pane, edge to edge",
            text: "Security film does not stop the glass breaking. It stops the glass leaving the frame, which is what turns a two-second hole into a noisy minute of work. Take the film into the rubber, not just to it.",
          },
          {
            title: "Move the catch load off the plastic",
            text: "Most factory catches screw into the frame's plastic liner. Swap for a two-point mortise catch with screws long enough to bite the aluminium behind it.",
          },
          {
            title: "Test it yourself, hard",
            text: "Lift, shake, and lean into the panel with your shoulder. If anything shifts more than a couple of millimetres in the track, the pins are too high — drill them lower.",
          },
        ],
      },
      { k: "h2", text: "The parts we used" },
      {
        k: "pick",
        rank: "01",
        name: "Bastion track bar, 42 in",
        price: "$34",
        badge: "The one that does most of the work",
        tone: "good",
        verdict:
          "Cut it once with a hacksaw, drop it in, done. It is the piece that turned a shoulder strike from an opening into a noise.",
        pros: ["Held through five shoulder strikes", "No fixings, nothing to break"],
        cons: ["Has to be lifted out to open the door"],
        href: AFFILIATE,
        image: "/images/09-jamb-kit.png",
        imageAlt: "Steel reinforcement bar",
      },
      {
        k: "pick",
        rank: "02",
        name: "Anti-lift pin set (pair)",
        price: "$19",
        badge: "Cheapest real gain here",
        tone: "good",
        verdict:
          "Nineteen dollars and one drill bit ends the fastest attack on a slider. If you only do one thing on this page, do this one.",
        pros: ["Stopped every lift attempt", "Invisible from outside"],
        cons: ["Needs a drill and a steady hand"],
        href: AFFILIATE,
      },
      {
        k: "callout",
        title: "Do not bother with",
        text: "Adhesive alarm tabs on the glass, and the suction-cup 'glass break' pucks sold beside them. Both fired on a slammed door in our test and neither fired on the actual pane strike.",
      },
      {
        k: "quiz",
        title: "Is the slider actually your weak point?",
        text: "Score your four layers in about a minute. If your perimeter comes back below the median, this page is the cheapest fix on the list.",
      },
    ],
  },

  {
    slug: "security-apps-when-you-lose-signal",
    category: "response",
    kind: "comparison",
    kicker: "Apps",
    title: "Six security apps, ranked by what they do when you lose signal",
    excerpt:
      "Push alerts are worthless offline. We put six apps in a faraday bag mid-alarm to see which ones caught up afterwards.",
    standfirst:
      "An alarm is only as useful as the message that leaves the house — and the message that reaches you. We fired the same alarm six times with the phone unreachable, then watched what each app did when the phone came back.",
    meta: "Comparison · 6 apps",
    date: "Aug 07",
    number: 312,
    readingTime: "8 min read",
    updated: "Updated 7 August 2026",
    image: "/images/03-alarm-app.png",
    imageAlt: "Phone showing an armed alarm app",
    facts: [
      { value: "6", label: "apps tested" },
      { value: "4", label: "lost the alert entirely" },
      { value: "38 s", label: "best time to a human" },
    ],
    blocks: [
      {
        k: "p",
        text: "The test is simple and unforgiving. Arm the system, trigger the front-door contact, and put the phone somewhere it has no signal at all for twelve minutes. Then take it out and count two things: how long until you learn something happened, and whether anyone acted while you were unreachable.",
      },
      {
        k: "bars",
        title: "Seconds from trigger to a human being informed",
        note: "Phone unreachable for 12 minutes from the moment of the trigger. Median of six runs. Bars past 720 s mean the alert was never delivered.",
        max: 720,
        items: [
          { label: "Keystone Watch", value: 38, display: "38 s", tone: "good" },
          { label: "Aegis Central", value: 54, display: "54 s", tone: "good" },
          { label: "Cordon Live", value: 186, display: "3 min 6 s", tone: "ok" },
          { label: "Halo Home", value: 720, display: "never", tone: "bad" },
          { label: "Beacon Guard", value: 720, display: "never", tone: "bad" },
          { label: "Northgate One", value: 720, display: "never", tone: "bad" },
        ],
      },
      {
        k: "p",
        text: "The three apps that failed all did the same thing: they queued a push notification and considered the job done. The alert arrived the moment the phone had signal again — twelve minutes after the event, which is roughly eleven minutes after it stopped mattering.",
      },
      {
        k: "callout",
        title: "The line that separates them",
        text: "Apps with a monitoring centre behind them treat your phone as one channel among several. Apps without one treat your phone as the whole system. That is the entire difference in the chart above.",
      },
      {
        k: "table",
        title: "What each app does while you are unreachable",
        columns: ["App", "Human dispatch", "Backup channel", "Offline log", "Monthly"],
        rows: [
          { cells: ["Keystone Watch", "Yes, verified", "SMS + landline", "Complete", "$19"], tone: "good" },
          { cells: ["Aegis Central", "Yes, verified", "SMS", "Complete", "$25"], tone: "good" },
          { cells: ["Cordon Live", "Escalation list", "SMS to contacts", "Complete", "$9"], tone: "ok" },
          { cells: ["Halo Home", "No", "None", "Partial", "Free"], tone: "bad" },
          { cells: ["Beacon Guard", "No", "None", "Complete", "$4"], tone: "bad" },
          { cells: ["Northgate One", "No", "None", "None", "$7"], tone: "bad" },
        ],
      },
      {
        k: "pick",
        rank: "01",
        name: "Keystone Watch",
        price: "$19/mo",
        badge: "Best response",
        tone: "good",
        verdict:
          "Thirty-eight seconds to a person, a verified dispatch that does not need you to answer, and a complete log waiting when you get signal back. No contract, which is unusual at this level.",
        pros: ["38 s to a human, phone unreachable", "Verified police dispatch", "No contract"],
        cons: ["Only two hardware brands supported"],
        href: AFFILIATE,
      },
      {
        k: "pick",
        rank: "02",
        name: "Cordon Live",
        price: "$9/mo",
        badge: "Best without monitoring",
        tone: "ok",
        verdict:
          "No monitoring centre, but it walks an escalation list of people you nominate until one of them answers. Three minutes is not thirty-eight seconds; it is also not never.",
        pros: ["Escalates to real contacts, not just your phone", "Half the price of monitored plans"],
        cons: ["Depends on a neighbour actually answering", "No police dispatch"],
        href: AFFILIATE,
      },
      {
        k: "quiz",
        title: "Score your response layer",
        text: "Most homes we assess are strongest on detection and weakest on response. Find out in a minute whether that is you.",
      },
    ],
  },

  {
    slug: "where-burglars-actually-enter",
    category: "resilience",
    kind: "guide",
    kicker: "Data",
    title: "Where burglars actually enter — 4,412 police reports, mapped",
    excerpt:
      "Not the front door. Not the second floor. Three openings account for more than two thirds of forced entries in our sample.",
    standfirst:
      "We read 4,412 residential burglary reports from eleven police districts and coded the point of entry on each one. The picture is narrower than the advice you usually get — and it is stable across districts.",
    meta: "Data · 4,412 reports",
    date: "Aug 05",
    number: 310,
    readingTime: "9 min read",
    updated: "Updated 5 August 2026",
    image: "/images/04-window-sensor.png",
    imageAlt: "Magnetic contact sensor on a window frame",
    facts: [
      { value: "4,412", label: "reports coded" },
      { value: "11", label: "police districts" },
      { value: "68%", label: "through three openings" },
    ],
    blocks: [
      {
        k: "p",
        text: "Coding was done twice, independently, and disagreements were resolved by reading the narrative rather than the checkbox — reports frequently tick 'door' for an entry that a witness describes through a window beside it.",
      },
      {
        k: "bars",
        title: "Point of entry, share of forced entries",
        note: "n = 4,412 residential reports · 11 districts · forced entries only, no-force entries excluded",
        max: 34,
        items: [
          { label: "Back / side door", value: 31, display: "31%", tone: "bad" },
          { label: "Ground-floor window", value: 22, display: "22%", tone: "bad" },
          { label: "Patio slider", value: 15, display: "15%", tone: "ok" },
          { label: "Front door", value: 13, display: "13%", tone: "ok" },
          { label: "Garage", value: 11, display: "11%", tone: "weak" },
          { label: "Upper floor", value: 5, display: "5%", tone: "weak" },
          { label: "Other", value: 3, display: "3%", tone: "weak" },
        ],
      },
      {
        k: "p",
        text: "The front door is fourth. That is worth sitting with, because the front door is where nearly all consumer spending goes: the video doorbell, the smart lock, the visible camera. Meanwhile the back door — unlit, unwatched, and usually fitted with the cheapest hardware in the house — carries almost a third of entries on its own.",
      },
      {
        k: "split",
        title: "Where the money goes vs. where the entries are",
        note: "Spending share from a survey of 1,180 households; entry share from the report sample above.",
        left: { label: "Front door", value: 61, display: "61% of spend", caption: "13% of forced entries. Doorbell, smart lock, the camera guests can see.", tone: "bad" },
        right: { label: "Back and side", value: 14, display: "14% of spend", caption: "53% of forced entries once the slider is counted with them.", tone: "good" },
      },
      {
        k: "h2", text: "What the data says to do",
      },
      {
        k: "steps",
        items: [
          {
            title: "Move one camera to the back",
            text: "If you own two cameras and both look at the street, you have covered thirteen percent of the risk twice. Take one round the back, high, pointing at the approach rather than the door itself.",
          },
          {
            title: "Put the good lock on the worst door",
            text: "In the reports, the forced back door was fitted with a spring latch or a single-cylinder deadbolt in the large majority of cases. Whatever your best lock is, it belongs there, not on the front.",
          },
          {
            title: "Treat ground-floor windows as openings, not glass",
            text: "Twenty-two percent came through a window, and in most of those the window was not broken — it was open, on a latch, or its frame was levered. Fit keyed catches and use them in summer.",
          },
          {
            title: "Do not forget the garage door",
            text: "Eleven percent, and once inside the garage the intruder is out of sight for the rest of the job. An internal door between garage and house should be locked like an exterior door, because that is what it is.",
          },
        ],
      },
      {
        k: "callout",
        title: "One caveat about this sample",
        text: "These are reported, forced entries. Entries with no force at all — an unlocked door, a key under a stone — are excluded, and other studies put those at roughly a quarter of all burglaries. Locking up remains the cheapest measure there is.",
      },
      {
        k: "quiz",
        title: "Find your own weak opening",
        text: "The assessment asks about the back door, the slider and the ground-floor windows specifically, then ranks your fixes by index gain per dollar.",
      },
    ],
  },
];

export function articleHref(a: Pick<ArticleMeta, "category" | "slug">) {
  return `/${a.category}/${a.slug}`;
}

export function getArticle(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}

export function byCategory(category: string) {
  return ARTICLES.filter((a) => a.category === category);
}

export function relatedArticles(current: ArticleMeta, limit = 3) {
  const sameCategory = ARTICLES.filter((a) => a.slug !== current.slug && a.category === current.category);
  const rest = ARTICLES.filter((a) => a.slug !== current.slug && a.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}
