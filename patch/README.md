# Patch — moteur templatisé (charbon + turquoise, mobile-first)

Chaque fichier ci-dessous remplace **entièrement** son homologue dans
`readyscore-affiliate-engine/`, ou est un **fichier nouveau**. Rien d'autre à
toucher.

## Copie

| Fichier du patch | Destination | |
|---|---|---|
| `config-active.ts` | `config/active.ts` | réécrit |
| `config-registry.ts` | `config/registry.ts` | **nouveau** |
| `lib-validateNiche.ts` | `lib/validateNiche.ts` | **nouveau** |
| `lib-types.ts` | `lib/types.ts` | réécrit |
| `env-example` | `.env.example` | **nouveau** |
| `config-niches-readyscore-site.ts` | `config/niches/readyscore/site.ts` | |
| `config-niches-readyscore-quiz.ts` | `config/niches/readyscore/quiz.ts` | |
| `config-niches-readyscore-scoring.ts` | `config/niches/readyscore/scoring.ts` | |
| `config-niches-growready-site.ts` | `config/niches/growready/site.ts` | |
| `config-niches-growready-quiz.ts` | `config/niches/growready/quiz.ts` | |
| `config-niches-growready-scoring.ts` | `config/niches/growready/scoring.ts` | |
| `app-globals.css` | `app/globals.css` | |
| `app-layout.tsx` | `app/layout.tsx` | |
| `app-page.tsx` | `app/page.tsx` | |
| `app-result-page.tsx` | `app/result/page.tsx` | |
| `app-icon.svg` | `app/icon.svg` | |
| `tailwind.config.ts` | `tailwind.config.ts` | |
| `lib-heading.ts` | `lib/heading.ts` | |
| `components-layout-Header.tsx` | `components/layout/Header.tsx` | |
| `components-layout-Footer.tsx` | `components/layout/Footer.tsx` | |
| `components-quiz-ProgressBar.tsx` | `components/quiz/ProgressBar.tsx` | |
| `components-quiz-QuestionCard.tsx` | `components/quiz/QuestionCard.tsx` | |
| `components-result-ScoreDisplay.tsx` | `components/result/ScoreDisplay.tsx` | |
| `components-result-ScoreGauge.tsx` | `components/result/ScoreGauge.tsx` | |
| `components-result-StrengthsGaps.tsx` | `components/result/StrengthsGaps.tsx` | |
| `components-result-ReadinessRadar.tsx` | `components/result/ReadinessRadar.tsx` | **nouveau** |
| `components-result-FurtherTests.tsx` | `components/result/FurtherTests.tsx` | **nouveau** |
| `components-result-ProductCard.tsx` | `components/result/ProductCard.tsx` | |
| `root-README.md` | `README.md` | remplace l'ancien |

Après copie, supprime le dossier `patch/` du repo : il a fait son travail et
il fait double emploi avec les fichiers réels (il pollue les recherches).

## Ce que ce patch change

**1. La niche devient une variable d'environnement.** `config/registry.ts`
déclare les niches, `config/active.ts` lit `NEXT_PUBLIC_NICHE` et résout celle
qui est servie. Un déploiement Vercel par niche, même repo, même branche.

**2. Le moteur ne connaît plus le sujet.** Les textes qui étaient écrits en dur
dans les composants sont devenus des champs de configuration :

| Était en dur dans | Est devenu |
|---|---|
| `app/page.tsx` — « Field assessment / 72-hour window » | `SITE.hero.eyebrow` |
| `app/page.tsx` — « Operational sequence » | `SITE.howItWorksTitle` |
| `Header.tsx` — « Home Defense Index » | `SITE.headerTagline` |
| `Header.tsx` — « Assessment online » | `SITE.headerStatus` |
| `ProgressBar.tsx` — « Phase » | `SITE.quizStepLabel` |
| `QuestionCard.tsx` — l'id de la question | `question.dimensionLabel` |
| `ScoreDisplay.tsx` — « Classification » | `SITE.resultCopy.classificationLabel` |
| `StrengthsGaps.tsx` — « start with power and water » | `SITE.resultCopy.strengthsEmpty` / `gapsEmpty` |
| `Footer.tsx` — mention d'affiliation, liens, note légale | `SITE.legal.*` |
| `ReadinessRadar.tsx` — « 72-hour disruption » | `SITE.resultCopy.mapAllClear` / `mapWeakestTemplate` |
| le bloc passerelle de la maquette | `SITE.furtherTests` |

Une recherche de `readyscore`, `growready`, `looter`, `prepared`, `72-hour`,
`blackout`, `first aid`, `home defense` dans `app/`, `components/` et `lib/`
doit désormais ne rien renvoyer.

**3. Un garde-fou.** `lib/validateNiche.ts` échoue en développement, avec le nom
du champ fautif, si une niche est incohérente : dimension citée par une question
mais absente du scoring, profils qui ne couvrent pas 0–100, produit qui cible un
profil inexistant, lien affilié resté en placeholder. En production, il
journalise et laisse le site debout.

**4. GrowReady est prête, pas active.** Thème clair, titres serif, sujet sans
rapport — c'est le test de la refactorisation : `NEXT_PUBLIC_NICHE=growready`
doit donner un site cohérent sans qu'une ligne de `app/`, `components/` ou `lib/`
n'ait changé.

**5. Le diagramme radar** (`ReadinessRadar.tsx`) trace la carte des dimensions à
partir de `result.strengths` et `result.gaps` : une force vaut 1.0, une lacune
0.32, et les axes sous 50 % passent en orange avec les trois jauges hiérarchisées
à droite. Ses couleurs viennent des custom properties `--brand-*`, donc il suit
la palette de la niche active. Les étiquettes d'axes viennent de
`dimensions[].shortLabel` (8 caractères max, sinon ça déborde sur mobile).

## La rampe inversée — ne pas y toucher

`readyscore` est un thème sombre : sa rampe est volontairement inversée
(`brand-50` = charbon, `brand-950` = sable clair, `brand-600` = accent
turquoise `#56B3A2`). `growready` est un thème clair avec une rampe normale.
Les deux partagent exactement les mêmes classes Tailwind parce que
`bg-brand-50` veut dire « fond » et `text-brand-950` « texte fort » dans les
deux cas. `tailwind.config.ts` mappe `brand-*` sur des custom properties
injectées par `app/layout.tsx` d'après la niche active.

## Mobile

80 % du trafic. Titres en `clamp()`, CTA pleine largeur sous `sm`, options de
quiz à `min-h-[54px]`, paddings réduits sous `sm`, radar et fiche produit qui
passent en une colonne, CTA collant en bas de la page résultat. À vérifier sur
un vrai téléphone en 390 px avant de déployer.

## Vérifier

```bash
cp .env.example .env.local        # NEXT_PUBLIC_NICHE=readyscore
npm run typecheck
npm run build
npm run dev                       # landing → quiz → result

# puis la même chose sur l'autre niche, sans toucher au code :
NEXT_PUBLIC_NICHE=growready npm run dev
```

Si `npm run build` échoue sur `validateNiche`, c'est le garde-fou qui fait son
travail : le message nomme le champ à corriger. Le seul échec attendu au premier
lancement concerne `affiliateUrl` de GrowReady, encore en
`AFFILIATE_URL_PLACEHOLDER` — mets le vrai lien Digistore24 ou passe le produit
en `active: false`.
